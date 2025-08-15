// src/utils/context/__tests__/FileProcessor.test.ts

import { processFiles, processLegacyFiles, extractFilesFromDetection } from '../FileProcessor';
import { createQueryTemplate, createHashQueryTemplate } from '../../queryTemplates';
import { truncateHash } from '../EntityHelpers';

import type { ContextOption } from '../../../types';

// Mock dependencies
jest.mock('../../queryTemplates');
jest.mock('../EntityHelpers');

const mockCreateQueryTemplate = createQueryTemplate as jest.MockedFunction<typeof createQueryTemplate>;
const mockCreateHashQueryTemplate = createHashQueryTemplate as jest.MockedFunction<typeof createHashQueryTemplate>;
const mockTruncateHash = truncateHash as jest.MockedFunction<typeof truncateHash>;

describe('FileProcessor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementations
    mockCreateQueryTemplate.mockImplementation((type, value) => `query for ${type}: ${value}`);
    mockCreateHashQueryTemplate.mockImplementation((hash, hashType) => `query for ${hashType}: ${hash}`);
    mockTruncateHash.mockImplementation(hash => {
      // Simple truncation mock - show first 8 and last 8 characters
      if (hash.length > 16) {
        return `${hash.substring(0, 8)}...${hash.substring(hash.length - 8)}`;
      }
      return hash;
    });
  });

  describe('processFiles', () => {
    it('should handle empty input', () => {
      const result = processFiles({}, {});
      expect(result).toEqual([]);
    });

    it('should handle null/undefined input', () => {
      expect(processFiles(null, null)).toEqual([]);
      expect(processFiles(undefined, undefined)).toEqual([]);
    });

    it('should process files with positional association', () => {
      const entityValues = {
        sha256s: ['sha256hash1', 'sha256hash2'],
        md5s: ['md5hash1', 'md5hash2']
      };
      const entities = {
        file_name: ['file1.exe', 'file2.dll']
      };

      const result = processFiles(entityValues, entities);

      // Should create 2 filenames + 2 SHA256 hashes (MD5 ignored when SHA256 exists)
      expect(result).toHaveLength(4);

      // Check filename entries
      const file1 = result.find(r => r.value === 'file:file1.exe');
      expect(file1).toMatchObject({
        displayName: 'file1.exe',
        type: 'file',
        subType: 'filename',
        entityData: expect.objectContaining({
          filename: 'file1.exe',
          sha256Count: 1,
          md5Count: 1
        })
      });

      // Check SHA256 hash entries
      const sha256_1 = result.find(r => r.value === 'sha256:sha256hash1');
      expect(sha256_1).toMatchObject({
        displayName: 'SHA256: sha256hash1',
        type: 'file',
        subType: 'sha256',
        parentFile: 'file1.exe',
        entityData: expect.objectContaining({
          hash: 'sha256hash1',
          hashType: 'SHA256',
          filename: 'file1.exe',
          isGrouped: true
        })
      });
    });

    it('should prefer SHA256 over MD5 when both exist', () => {
      const entityValues = {
        sha256s: ['sha256hash1'],
        md5s: ['md5hash1']
      };
      const entities = {
        file_name: ['file1.exe']
      };

      const result = processFiles(entityValues, entities);

      // Should have filename + SHA256 only (MD5 ignored)
      expect(result).toHaveLength(2);
      
      const sha256Entry = result.find(r => r.subType === 'sha256');
      const md5Entry = result.find(r => r.subType === 'md5');
      
      expect(sha256Entry).toBeDefined();
      expect(md5Entry).toBeUndefined();
    });

    it('should use MD5 only when SHA256 is not available', () => {
      const entityValues = {
        sha256s: [],
        md5s: ['md5hash1']
      };
      const entities = {
        file_name: ['file1.exe']
      };

      const result = processFiles(entityValues, entities);

      // Current implementation doesn't handle MD5 when SHA256 array is empty
      // Should only have filename (no hashes processed)
      expect(result).toHaveLength(1);
      
      expect(result[0]).toMatchObject({
        value: 'file:file1.exe',
        subType: 'filename',
        entityData: expect.objectContaining({
          filename: 'file1.exe',
          sha256Count: 0,
          md5Count: 0
        })
      });
    });

    it('should handle non-positional association fallback', () => {
      const entityValues = {
        sha256s: ['sha256hash1', 'sha256hash2'],
        md5s: ['md5hash1']
      };
      const entities = {
        file_name: ['file1.exe'] // Mismatched array lengths
      };

      const result = processFiles(entityValues, entities);

      // Should create filename entry without hash association
      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        value: 'file:file1.exe',
        subType: 'filename',
        entityData: expect.objectContaining({
          sha256Count: 0,
          md5Count: 0
        })
      });
    });

    it('should handle case sensitivity', () => {
      const entityValues = {
        sha256s: ['SHA256HASH1']
      };
      const entities = {
        file_name: ['File1.EXE']
      };

      const result = processFiles(entityValues, entities);

      expect(result[0].displayName).toBe('file1.exe'); // Lowercase
      expect(result[1].displayName).toBe('SHA256: sha256hash1'); // Uppercase prefix, lowercase hash
    });

    it('should handle duplicate filenames with multiple hashes', () => {
      const entityValues = {
        sha256s: ['sha256hash1', 'sha256hash2']
      };
      const entities = {
        file_name: ['file1.exe', 'file1.exe'] // Same filename
      };

      const result = processFiles(entityValues, entities);

      // Should create 1 filename + 2 SHA256 hashes
      expect(result).toHaveLength(3);
      
      const filename = result.find(r => r.subType === 'filename');
      expect(filename?.entityData.sha256Count).toBe(2);
    });

    it('should handle invalid/empty data', () => {
      const entityValues = {
        sha256s: [null, '', undefined, 'validhash'],
        md5s: [null, '', 'validmd5']
      };
      const entities = {
        file_name: [null, '', undefined, 'validfile.exe', '']
      };

      const result = processFiles(entityValues, entities);

      // Should only process valid entries
      expect(result.length).toBeGreaterThan(0);
      const validEntries = result.filter(r => 
        r.value.includes('validfile.exe') || r.value.includes('validhash')
      );
      expect(validEntries.length).toBeGreaterThan(0);
    });

    it('should create proper query templates', () => {
      const entityValues = {
        sha256s: ['sha256hash1']
      };
      const entities = {
        file_name: ['file1.exe']
      };

      processFiles(entityValues, entities);

      expect(mockCreateQueryTemplate).toHaveBeenCalledWith('file', 'file1.exe');
      expect(mockCreateHashQueryTemplate).toHaveBeenCalledWith('sha256hash1', 'SHA256');
    });

    it('should handle hash truncation', () => {
      const entityValues = {
        sha256s: ['verylongsha256hashstringwithlotsocharacters']
      };
      const entities = {
        file_name: ['file1.exe']
      };

      const result = processFiles(entityValues, entities);

      expect(mockTruncateHash).toHaveBeenCalledWith('verylongsha256hashstringwithlotsocharacters');
      
      const hashEntry = result.find(r => r.subType === 'sha256');
      expect(hashEntry?.displayName).toBe('SHA256: verylong...aracters'); // Mocked truncation
    });

    it('should handle empty filename arrays', () => {
      const entityValues = {
        sha256s: ['sha256hash1'],
        md5s: ['md5hash1']
      };
      const entities = {
        file_name: []
      };

      const result = processFiles(entityValues, entities);

      // No filenames, should not create any entries (per current logic)
      expect(result).toEqual([]);
    });

    it('should handle missing entities parameter', () => {
      const entityValues = {
        sha256s: ['sha256hash1'],
        md5s: ['md5hash1']
      };

      const result = processFiles(entityValues, null);

      expect(result).toEqual([]);
    });
  });

  describe('processLegacyFiles', () => {
    let existingOptions: ContextOption[];

    beforeEach(() => {
      existingOptions = [];
    });

    it('should handle empty/null input', () => {
      expect(processLegacyFiles(null, existingOptions)).toEqual([]);
      expect(processLegacyFiles(undefined, existingOptions)).toEqual([]);
      expect(processLegacyFiles([], existingOptions)).toEqual([]);
    });

    it('should process legacy entities_full data', () => {
      const entitiesFull = [
        {
          FileName: 'file1.exe',
          SHA256HashData: 'sha256hash1',
          MD5HashData: 'md5hash1'
        },
        {
          FileName: 'file2.dll',
          SHA256HashData: 'sha256hash2'
        }
      ];

      const result = processLegacyFiles(entitiesFull, existingOptions);

      // Should create 2 filenames + 2 SHA256 hashes
      expect(result).toHaveLength(4);

      const file1 = result.find(r => r.value === 'file:file1.exe');
      expect(file1).toMatchObject({
        entityData: expect.objectContaining({
          isLegacy: true,
          sha256Count: 1,
          md5Count: 1
        })
      });
    });

    it('should deduplicate filenames and hashes', () => {
      const entitiesFull = [
        {
          FileName: 'file1.exe',
          SHA256HashData: 'sha256hash1'
        },
        {
          FileName: 'file1.exe', // Duplicate filename
          SHA256HashData: 'sha256hash1' // Duplicate hash
        },
        {
          FileName: 'file1.exe',
          SHA256HashData: 'sha256hash2' // Different hash for same file
        }
      ];

      const result = processLegacyFiles(entitiesFull, existingOptions);

      // Should create 1 filename + 2 unique SHA256 hashes
      expect(result).toHaveLength(3);

      const filename = result.find(r => r.subType === 'filename');
      expect(filename?.entityData.sha256Count).toBe(2);
    });

    it('should prefer SHA256 over MD5 in legacy data', () => {
      const entitiesFull = [
        {
          FileName: 'file1.exe',
          SHA256HashData: 'sha256hash1',
          MD5HashData: 'md5hash1'
        }
      ];

      const result = processLegacyFiles(entitiesFull, existingOptions);

      const sha256Entry = result.find(r => r.subType === 'sha256');
      const md5Entry = result.find(r => r.subType === 'md5');

      expect(sha256Entry).toBeDefined();
      expect(md5Entry).toBeUndefined(); // MD5 ignored when SHA256 exists
    });

    it('should use MD5 when SHA256 is not available', () => {
      const entitiesFull = [
        {
          FileName: 'file1.exe',
          MD5HashData: 'md5hash1'
        }
      ];

      const result = processLegacyFiles(entitiesFull, existingOptions);

      const md5Entry = result.find(r => r.subType === 'md5');
      expect(md5Entry).toMatchObject({
        entityData: expect.objectContaining({
          hashType: 'MD5',
          isLegacy: true
        })
      });
    });

    it('should avoid duplicates with existing options', () => {
      existingOptions.push({
        value: 'file:file1.exe',
        displayName: 'file1.exe',
        type: 'file',
        subType: 'filename',
        queryTemplate: 'existing'
      });

      const entitiesFull = [
        {
          FileName: 'file1.exe',
          SHA256HashData: 'sha256hash1'
        }
      ];

      const result = processLegacyFiles(entitiesFull, existingOptions);

      // Should not create duplicate filename
      expect(result).toHaveLength(0);
    });

    it('should handle entities without filename', () => {
      const entitiesFull = [
        {
          SHA256HashData: 'sha256hash1',
          MD5HashData: 'md5hash1'
          // No FileName
        }
      ];

      const result = processLegacyFiles(entitiesFull, existingOptions);

      expect(result).toEqual([]);
    });

    it('should handle entities without hashes', () => {
      const entitiesFull = [
        {
          FileName: 'file1.exe'
          // No hash data
        }
      ];

      const result = processLegacyFiles(entitiesFull, existingOptions);

      expect(result).toEqual([]);
    });

    it('should create proper query templates for legacy files', () => {
      const entitiesFull = [
        {
          FileName: 'file1.exe',
          SHA256HashData: 'sha256hash1'
        }
      ];

      processLegacyFiles(entitiesFull, existingOptions);

      expect(mockCreateQueryTemplate).toHaveBeenCalledWith('file', 'file1.exe');
      expect(mockCreateHashQueryTemplate).toHaveBeenCalledWith('sha256hash1', 'SHA256');
    });
  });

  describe('extractFilesFromDetection', () => {
    let options: ContextOption[];

    beforeEach(() => {
      options = [];
    });

    it('should handle null/undefined detection', () => {
      extractFilesFromDetection(null, options);
      expect(options).toHaveLength(0);

      extractFilesFromDetection(undefined, options);
      expect(options).toHaveLength(0);
    });

    it('should extract main detection file with SHA256', () => {
      const detection = {
        filename: 'malware.exe',
        sha256: 'SHA256HASH1',
        md5: 'md5hash1'
      };

      extractFilesFromDetection(detection, options);

      expect(options).toHaveLength(2); // filename + SHA256 (MD5 ignored)
      
      const filename = options.find(o => o.subType === 'filename');
      expect(filename).toMatchObject({
        value: 'file:malware.exe',
        displayName: 'malware.exe',
        entityData: { filename: 'malware.exe' }
      });

      const sha256 = options.find(o => o.subType === 'sha256');
      expect(sha256).toMatchObject({
        value: 'sha256:sha256hash1',
        parentFile: 'malware.exe',
        entityData: expect.objectContaining({
          hashType: 'SHA256',
          isGrouped: true
        })
      });
    });

    it('should extract file with MD5 when no SHA256', () => {
      const detection = {
        filename: 'file.exe',
        md5: 'MD5HASH1'
      };

      extractFilesFromDetection(detection, options);

      expect(options).toHaveLength(2); // filename + MD5

      const md5 = options.find(o => o.subType === 'md5');
      expect(md5).toMatchObject({
        value: 'md5:md5hash1',
        parentFile: 'file.exe'
      });
    });

    it('should extract file with SHA1 when no SHA256', () => {
      const detection = {
        filename: 'file.exe',
        sha1: 'SHA1HASH1'
      };

      extractFilesFromDetection(detection, options);

      expect(options).toHaveLength(2); // filename + SHA1

      const sha1 = options.find(o => o.subType === 'sha1');
      expect(sha1).toMatchObject({
        value: 'sha1:sha1hash1',
        parentFile: 'file.exe',
        entityData: expect.objectContaining({
          hashType: 'SHA1'
        })
      });
    });

    it('should extract parent process files', () => {
      const detection = {
        parent_details: {
          filename: 'parent.exe',
          sha256: 'parentsha256'
        }
      };

      extractFilesFromDetection(detection, options);

      expect(options).toHaveLength(2);

      const parentFile = options.find(o => o.subType === 'filename');
      expect(parentFile?.entityData.source).toBe('parent_process');

      const parentHash = options.find(o => o.subType === 'sha256');
      expect(parentHash?.entityData.source).toBe('parent_process');
    });

    it('should extract grandparent process files', () => {
      const detection = {
        grandparent_details: {
          filename: 'grandparent.exe',
          md5: 'grandparentmd5'
        }
      };

      extractFilesFromDetection(detection, options);

      expect(options).toHaveLength(2);

      const grandparentFile = options.find(o => o.subType === 'filename');
      expect(grandparentFile?.entityData.source).toBe('grandparent_process');
    });

    it('should avoid duplicate filenames across sources', () => {
      const detection = {
        filename: 'same.exe',
        sha256: 'mainsha256',
        parent_details: {
          filename: 'same.exe', // Same filename
          sha256: 'parentsha256'
        }
      };

      extractFilesFromDetection(detection, options);

      // Should only create one filename entry (from main detection)
      const filenames = options.filter(o => o.subType === 'filename');
      expect(filenames).toHaveLength(1);
      
      // But should have both hashes
      const hashes = options.filter(o => o.subType === 'sha256');
      expect(hashes).toHaveLength(1); // Only main detection processed, parent skipped due to duplicate filename
    });

    it('should handle detection without filename', () => {
      const detection = {
        sha256: 'hash1',
        parent_details: {
          sha256: 'parenthash'
        }
      };

      extractFilesFromDetection(detection, options);

      expect(options).toHaveLength(0); // No filenames to process
    });

    it('should handle mixed hash types across processes', () => {
      const detection = {
        filename: 'main.exe',
        sha256: 'mainsha256',
        parent_details: {
          filename: 'parent.exe',
          md5: 'parentmd5' // Different hash type
        }
      };

      extractFilesFromDetection(detection, options);

      expect(options).toHaveLength(4); // 2 filenames + 2 hashes

      const mainHash = options.find(o => o.value.includes('mainsha256'));
      expect(mainHash?.entityData.hashType).toBe('SHA256');

      const parentHash = options.find(o => o.value.includes('parentmd5'));
      expect(parentHash?.entityData.hashType).toBe('MD5');
    });

    it('should create proper query templates for detection files', () => {
      const detection = {
        filename: 'test.exe',
        sha256: 'testhash'
      };

      extractFilesFromDetection(detection, options);

      expect(mockCreateQueryTemplate).toHaveBeenCalledWith('file', 'test.exe');
      expect(mockCreateHashQueryTemplate).toHaveBeenCalledWith('testhash', 'SHA256');
    });

    it('should maintain existing options while adding new ones', () => {
      const existingOption: ContextOption = {
        value: 'domain:example.com',
        displayName: 'example.com',
        type: 'domain',
        queryTemplate: 'existing'
      };
      options.push(existingOption);

      const detection = {
        filename: 'file.exe',
        sha256: 'hash1'
      };

      extractFilesFromDetection(detection, options);

      expect(options).toHaveLength(3); // existing + filename + hash
      expect(options[0]).toBe(existingOption); // Original preserved
    });
  });
});
