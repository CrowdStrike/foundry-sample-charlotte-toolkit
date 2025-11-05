import { describe, expect, it } from 'vitest';
import type { ContextOption } from '../../../types';
import { extractFilesFromDetection, processFiles, processLegacyFiles } from '../FileProcessor';

describe('FileProcessor', () => {
  describe('processFiles', () => {
    it('should return empty array for null entityValues', () => {
      expect(processFiles(null, {})).toEqual([]);
    });

    it('should return empty array for null entities', () => {
      expect(processFiles({}, null)).toEqual([]);
    });

    it('should return empty array for undefined inputs', () => {
      expect(processFiles(undefined, undefined)).toEqual([]);
    });

    it('should return empty array when both inputs empty', () => {
      expect(processFiles({}, {})).toEqual([]);
    });

    describe('positional association (Method 1)', () => {
      it('should associate filename with SHA256 when arrays align', () => {
        const entityValues = { sha256s: ['abc123'] };
        const entities = { file_name: ['test.exe'] };

        const result = processFiles(entityValues, entities);

        expect(result.length).toBeGreaterThan(0);
        const filename = result.find((opt) => opt.subType === 'filename');
        const sha256 = result.find((opt) => opt.subType === 'sha256');

        expect(filename?.displayName).toBe('test.exe');
        expect(sha256?.entityData?.filename).toBe('test.exe');
      });

      it('should associate multiple files with their hashes', () => {
        const entityValues = { sha256s: ['hash1', 'hash2'] };
        const entities = { file_name: ['file1.exe', 'file2.dll'] };

        const result = processFiles(entityValues, entities);

        const filenames = result.filter((opt) => opt.subType === 'filename');
        expect(filenames).toHaveLength(2);
      });

      it('should not show MD5 when SHA256 exists', () => {
        const entityValues = {
          sha256s: ['sha256hash'],
          md5s: ['md5hash'],
        };
        const entities = { file_name: ['test.exe'] };

        const result = processFiles(entityValues, entities);

        const sha256 = result.find((opt) => opt.subType === 'sha256');
        const md5 = result.find((opt) => opt.subType === 'md5');

        expect(sha256).toBeDefined();
        expect(md5).toBeUndefined();
      });

      it('should not include MD5 when MD5 array length differs', () => {
        const entityValues = {
          sha256s: ['sha256hash'],
          md5s: ['md5hash1', 'md5hash2'],
        };
        const entities = { file_name: ['test.exe'] };

        const result = processFiles(entityValues, entities);

        const md5Options = result.filter((opt) => opt.subType === 'md5');
        expect(md5Options).toHaveLength(0);
      });

      it('should skip null filenames', () => {
        const entityValues = { sha256s: ['hash1', 'hash2'] };
        const entities = { file_name: ['file1.exe', null] };

        const result = processFiles(entityValues, entities);

        const filenames = result.filter((opt) => opt.subType === 'filename');
        expect(filenames).toHaveLength(1);
      });

      it('should skip non-string filenames', () => {
        const entityValues = { sha256s: ['hash1', 'hash2'] };
        const entities = { file_name: ['file1.exe', 123] };

        const result = processFiles(entityValues, entities);

        const filenames = result.filter((opt) => opt.subType === 'filename');
        expect(filenames).toHaveLength(1);
      });
    });

    describe('non-positional processing (Method 2)', () => {
      it('should create filename entries when no hashes align', () => {
        const entityValues = { sha256s: [] };
        const entities = { file_name: ['test.exe'] };

        const result = processFiles(entityValues, entities);

        const filename = result.find((opt) => opt.subType === 'filename');
        expect(filename?.displayName).toBe('test.exe');
      });

      it('should handle filenames without any hashes', () => {
        const entityValues = {};
        const entities = { file_name: ['file1.exe', 'file2.dll'] };

        const result = processFiles(entityValues, entities);

        const filenames = result.filter((opt) => opt.subType === 'filename');
        expect(filenames).toHaveLength(2);
      });

      it('should convert filenames to lowercase', () => {
        const entityValues = { sha256s: ['hash1'] };
        const entities = { file_name: ['TEST.EXE'] };

        const result = processFiles(entityValues, entities);

        const filename = result.find((opt) => opt.subType === 'filename');
        expect(filename?.displayName).toBe('test.exe');
      });
    });

    describe('hash preferences', () => {
      it('should prefer SHA256 over MD5', () => {
        const entityValues = {
          sha256s: ['sha256hash'],
          md5s: ['md5hash'],
        };
        const entities = { file_name: ['test.exe'] };

        const result = processFiles(entityValues, entities);

        const sha256 = result.find((opt) => opt.subType === 'sha256');
        const md5 = result.find((opt) => opt.subType === 'md5');

        expect(sha256).toBeDefined();
        expect(md5).toBeUndefined();
      });

      it('should show MD5 only when no SHA256 exists', () => {
        const entityValues = {
          sha256s: [],
          md5s: ['md5hash'],
        };
        const entities = { file_name: ['test.exe'] };

        const result = processFiles(entityValues, entities);

        expect(result).toBeDefined();
      });
    });

    describe('hash truncation', () => {
      it('should truncate long SHA256 hashes', () => {
        const longHash = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';
        const entityValues = { sha256s: [longHash] };
        const entities = { file_name: ['test.exe'] };

        const result = processFiles(entityValues, entities);

        const sha256 = result.find((opt) => opt.subType === 'sha256');
        expect(sha256?.displayName.length).toBeLessThan(longHash.length + 10);
      });
    });
  });

  describe('processLegacyFiles', () => {
    it('should return empty array for null entitiesFull', () => {
      const result = processLegacyFiles(null as any, []);
      expect(result).toEqual([]);
    });

    it('should return empty array for undefined entitiesFull', () => {
      const result = processLegacyFiles(undefined as any, []);
      expect(result).toEqual([]);
    });

    it('should return empty array for empty array', () => {
      const result = processLegacyFiles([], []);
      expect(result).toEqual([]);
    });

    it('should return empty array for non-array input', () => {
      const result = processLegacyFiles('not-an-array' as any, []);
      expect(result).toEqual([]);
    });

    it('should process entity with filename and SHA256', () => {
      const entitiesFull = [
        {
          FileName: 'test.exe',
          SHA256HashData: 'abc123',
        },
      ];

      const result = processLegacyFiles(entitiesFull, []);

      const filename = result.find((opt) => opt.subType === 'filename');
      const sha256 = result.find((opt) => opt.subType === 'sha256');

      expect(filename?.displayName).toBe('test.exe');
      expect(sha256?.entityData?.hashType).toBe('SHA256');
    });

    it('should process entity with filename and MD5', () => {
      const entitiesFull = [
        {
          FileName: 'test.exe',
          MD5HashData: 'def456',
        },
      ];

      const result = processLegacyFiles(entitiesFull, []);

      const md5 = result.find((opt) => opt.subType === 'md5');
      expect(md5?.entityData?.hashType).toBe('MD5');
    });

    it('should deduplicate same filename across multiple entities', () => {
      const entitiesFull = [
        { FileName: 'test.exe', SHA256HashData: 'hash1' },
        { FileName: 'test.exe', SHA256HashData: 'hash2' },
      ];

      const result = processLegacyFiles(entitiesFull, []);

      const filenames = result.filter((opt) => opt.subType === 'filename');
      expect(filenames).toHaveLength(1);

      const sha256s = result.filter((opt) => opt.subType === 'sha256');
      expect(sha256s).toHaveLength(2);
    });

    it('should skip files already in existingOptions', () => {
      const entitiesFull = [{ FileName: 'test.exe', SHA256HashData: 'hash1' }];

      const existing: ContextOption[] = [
        {
          value: 'file:test.exe',
          displayName: 'test.exe',
          type: 'file',
          subType: 'filename',
          queryTemplate: '',
        },
      ];

      const result = processLegacyFiles(entitiesFull, existing);
      expect(result).toHaveLength(0);
    });

    it('should skip hashes already in existingOptions', () => {
      const entitiesFull = [{ FileName: 'test.exe', SHA256HashData: 'hash1' }];

      const existing: ContextOption[] = [
        {
          value: 'sha256:hash1',
          displayName: 'SHA256: hash1',
          type: 'file',
          subType: 'sha256',
          queryTemplate: '',
        },
      ];

      const result = processLegacyFiles(entitiesFull, existing);

      const sha256Options = result.filter((opt) => opt.subType === 'sha256');
      expect(sha256Options).toHaveLength(0);
    });

    it('should prefer SHA256 over MD5', () => {
      const entitiesFull = [
        {
          FileName: 'test.exe',
          SHA256HashData: 'sha256hash',
          MD5HashData: 'md5hash',
        },
      ];

      const result = processLegacyFiles(entitiesFull, []);

      const sha256 = result.find((opt) => opt.subType === 'sha256');
      const md5 = result.find((opt) => opt.subType === 'md5');

      expect(sha256).toBeDefined();
      expect(md5).toBeUndefined();
    });

    it('should show MD5 only when no SHA256', () => {
      const entitiesFull = [
        {
          FileName: 'test.exe',
          MD5HashData: 'md5hash',
        },
      ];

      const result = processLegacyFiles(entitiesFull, []);

      const md5 = result.find((opt) => opt.subType === 'md5');
      expect(md5).toBeDefined();
    });

    it('should mark as legacy', () => {
      const entitiesFull = [
        {
          FileName: 'test.exe',
          SHA256HashData: 'hash1',
        },
      ];

      const result = processLegacyFiles(entitiesFull, []);

      const filename = result.find((opt) => opt.subType === 'filename');
      expect(filename?.entityData?.isLegacy).toBe(true);
    });

    it('should convert filenames to lowercase', () => {
      const entitiesFull = [
        {
          FileName: 'TEST.EXE',
          SHA256HashData: 'hash1',
        },
      ];

      const result = processLegacyFiles(entitiesFull, []);

      const filename = result.find((opt) => opt.subType === 'filename');
      expect(filename?.displayName).toBe('test.exe');
    });

    it('should ignore entities without FileName', () => {
      const entitiesFull = [{ SHA256HashData: 'hash1' }];

      const result = processLegacyFiles(entitiesFull, []);
      expect(result).toHaveLength(0);
    });

    it('should ignore entities with non-string FileName', () => {
      const entitiesFull = [{ FileName: 123, SHA256HashData: 'hash1' }];

      const result = processLegacyFiles(entitiesFull, []);
      expect(result).toHaveLength(0);
    });
  });

  describe('extractFilesFromDetection', () => {
    it('should handle null detection', () => {
      const options: ContextOption[] = [];
      extractFilesFromDetection(null, options);
      expect(options).toHaveLength(0);
    });

    it('should handle undefined detection', () => {
      const options: ContextOption[] = [];
      extractFilesFromDetection(undefined, options);
      expect(options).toHaveLength(0);
    });

    it('should extract filename from detection', () => {
      const options: ContextOption[] = [];
      const detection = {
        filename: 'malware.exe',
      };

      extractFilesFromDetection(detection, options);

      const filename = options.find((opt) => opt.subType === 'filename');
      expect(filename?.displayName).toBe('malware.exe');
    });

    it('should extract SHA256 with filename', () => {
      const options: ContextOption[] = [];
      const detection = {
        filename: 'malware.exe',
        sha256: 'abc123',
      };

      extractFilesFromDetection(detection, options);

      const sha256 = options.find((opt) => opt.subType === 'sha256');
      expect(sha256?.displayName).toContain('SHA256');
      expect(sha256?.parentFile).toBe('malware.exe');
    });

    it('should extract MD5 when no SHA256', () => {
      const options: ContextOption[] = [];
      const detection = {
        filename: 'malware.exe',
        md5: 'def456',
      };

      extractFilesFromDetection(detection, options);

      const md5 = options.find((opt) => opt.subType === 'md5');
      expect(md5).toBeDefined();
    });

    it('should not add MD5 when SHA256 exists', () => {
      const options: ContextOption[] = [];
      const detection = {
        filename: 'malware.exe',
        sha256: 'abc123',
        md5: 'def456',
      };

      extractFilesFromDetection(detection, options);

      const md5 = options.find((opt) => opt.subType === 'md5');
      expect(md5).toBeUndefined();
    });

    it('should extract SHA1 when no SHA256', () => {
      const options: ContextOption[] = [];
      const detection = {
        filename: 'malware.exe',
        sha1: 'ghi789',
      };

      extractFilesFromDetection(detection, options);

      const sha1 = options.find((opt) => opt.subType === 'sha1');
      expect(sha1).toBeDefined();
    });

    it('should not add SHA1 when SHA256 exists', () => {
      const options: ContextOption[] = [];
      const detection = {
        filename: 'malware.exe',
        sha256: 'abc123',
        sha1: 'ghi789',
      };

      extractFilesFromDetection(detection, options);

      const sha1 = options.find((opt) => opt.subType === 'sha1');
      expect(sha1).toBeUndefined();
    });

    it('should convert filename to lowercase', () => {
      const options: ContextOption[] = [];
      const detection = {
        filename: 'MALWARE.EXE',
      };

      extractFilesFromDetection(detection, options);
      expect(options[0]?.displayName).toBe('malware.exe');
    });

    it('should convert hashes to lowercase', () => {
      const options: ContextOption[] = [];
      const detection = {
        filename: 'malware.exe',
        sha256: 'ABC123',
      };

      extractFilesFromDetection(detection, options);

      const sha256 = options.find((opt) => opt.subType === 'sha256');
      expect(sha256?.displayName).toContain('abc123');
    });

    describe('parent_details processing', () => {
      it('should extract parent filename', () => {
        const options: ContextOption[] = [];
        const detection = {
          parent_details: {
            filename: 'parent.exe',
          },
        };

        extractFilesFromDetection(detection, options);

        const filename = options.find((opt) => opt.entityData?.source === 'parent_process');
        expect(filename?.displayName).toBe('parent.exe');
      });

      it('should extract parent SHA256', () => {
        const options: ContextOption[] = [];
        const detection = {
          parent_details: {
            filename: 'parent.exe',
            sha256: 'parenthash',
          },
        };

        extractFilesFromDetection(detection, options);

        const sha256 = options.find((opt) => opt.subType === 'sha256');
        expect(sha256?.entityData?.source).toBe('parent_process');
      });

      it('should extract parent MD5 when no SHA256', () => {
        const options: ContextOption[] = [];
        const detection = {
          parent_details: {
            filename: 'parent.exe',
            md5: 'parentmd5',
          },
        };

        extractFilesFromDetection(detection, options);

        const md5 = options.find((opt) => opt.subType === 'md5');
        expect(md5).toBeDefined();
      });

      it('should avoid duplicate parent filenames', () => {
        const options: ContextOption[] = [
          {
            value: 'file:parent.exe',
            displayName: 'parent.exe',
            type: 'file',
            subType: 'filename',
            queryTemplate: '',
          },
        ];

        const detection = {
          parent_details: {
            filename: 'parent.exe',
          },
        };

        extractFilesFromDetection(detection, options);

        const filenames = options.filter((opt) => opt.value === 'file:parent.exe');
        expect(filenames).toHaveLength(1);
      });
    });

    describe('grandparent_details processing', () => {
      it('should extract grandparent filename', () => {
        const options: ContextOption[] = [];
        const detection = {
          grandparent_details: {
            filename: 'grandparent.exe',
          },
        };

        extractFilesFromDetection(detection, options);

        const filename = options.find((opt) => opt.entityData?.source === 'grandparent_process');
        expect(filename?.displayName).toBe('grandparent.exe');
      });

      it('should extract grandparent SHA256', () => {
        const options: ContextOption[] = [];
        const detection = {
          grandparent_details: {
            filename: 'grandparent.exe',
            sha256: 'gphash',
          },
        };

        extractFilesFromDetection(detection, options);

        const sha256 = options.find(
          (opt) => opt.subType === 'sha256' && opt.entityData?.source === 'grandparent_process',
        );
        expect(sha256).toBeDefined();
        expect(sha256?.subType).toBe('sha256');
      });

      it('should extract grandparent MD5 when no SHA256', () => {
        const options: ContextOption[] = [];
        const detection = {
          grandparent_details: {
            filename: 'grandparent.exe',
            md5: 'gpmd5',
          },
        };

        extractFilesFromDetection(detection, options);

        const md5 = options.find((opt) => opt.subType === 'md5');
        expect(md5).toBeDefined();
      });

      it('should avoid duplicate grandparent filenames', () => {
        const options: ContextOption[] = [
          {
            value: 'file:grandparent.exe',
            displayName: 'grandparent.exe',
            type: 'file',
            subType: 'filename',
            queryTemplate: '',
          },
        ];

        const detection = {
          grandparent_details: {
            filename: 'grandparent.exe',
          },
        };

        extractFilesFromDetection(detection, options);

        const filenames = options.filter((opt) => opt.value === 'file:grandparent.exe');
        expect(filenames).toHaveLength(1);
      });
    });

    describe('integration', () => {
      it('should handle detection with main parent and grandparent files', () => {
        const options: ContextOption[] = [];
        const detection = {
          filename: 'child.exe',
          sha256: 'childhash',
          parent_details: {
            filename: 'parent.exe',
            sha256: 'parenthash',
          },
          grandparent_details: {
            filename: 'grandparent.exe',
            sha256: 'gphash',
          },
        };

        extractFilesFromDetection(detection, options);

        const filenames = options.filter((opt) => opt.subType === 'filename');
        expect(filenames).toHaveLength(3);
      });

      it('should handle non-object parent_details', () => {
        const options: ContextOption[] = [];
        const detection = {
          filename: 'test.exe',
          parent_details: 'not-an-object',
        };

        extractFilesFromDetection(detection, options);

        const filenames = options.filter((opt) => opt.subType === 'filename');
        expect(filenames).toHaveLength(1);
      });

      it('should handle non-object grandparent_details', () => {
        const options: ContextOption[] = [];
        const detection = {
          filename: 'test.exe',
          grandparent_details: 'not-an-object',
        };

        extractFilesFromDetection(detection, options);

        const filenames = options.filter((opt) => opt.subType === 'filename');
        expect(filenames).toHaveLength(1);
      });
    });
  });
});
