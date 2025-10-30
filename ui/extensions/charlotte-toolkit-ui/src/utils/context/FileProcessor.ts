// File and hash processing utilities

import type { ContextOption } from '../../types';
import { createQueryTemplate } from '../queryTemplates';

import { truncateHash } from './EntityHelpers';

/**
 * Process files and hashes with proper parent-child grouping
 * Filename as parent, hashes as children. MD5 only shown if no SHA256 available.
 */
export const processFiles = (entityValues: unknown, entities: unknown): ContextOption[] => {
  if (!entityValues || !entities) {
    return [];
  }

  const options: ContextOption[] = [];

  // Create a comprehensive file-to-hash mapping
  const fileHashMap = new Map<string, { sha256Hashes: Set<string>; md5Hashes: Set<string> }>();

  // Collect all SHA256 hashes from various sources
  const entityValuesRecord = entityValues as Record<string, unknown> | null | undefined;
  const entitiesRecord = entities as Record<string, unknown> | null | undefined;

  const sha256Array = Array.isArray(entityValuesRecord?.sha256s) ? entityValuesRecord.sha256s : [];
  const md5Array = Array.isArray(entityValuesRecord?.md5s) ? entityValuesRecord.md5s : [];
  const fileNameArray = Array.isArray(entitiesRecord?.file_name) ? entitiesRecord.file_name : [];

  // Method 1: Positional association (if arrays align)
  const canGroupFiles =
    fileNameArray.length > 0 &&
    sha256Array.length > 0 &&
    fileNameArray.length === sha256Array.length;

  if (canGroupFiles) {
    for (const [i, filename] of fileNameArray.entries()) {
      const sha256Hash = sha256Array[i];

      if (
        filename &&
        typeof filename === 'string' &&
        sha256Hash &&
        typeof sha256Hash === 'string'
      ) {
        if (!fileHashMap.has(filename)) {
          fileHashMap.set(filename, { sha256Hashes: new Set(), md5Hashes: new Set() });
        }

        fileHashMap.get(filename)?.sha256Hashes.add(sha256Hash);
      }
    }

    // Also collect MD5 hashes if available and arrays align
    if (md5Array.length === fileNameArray.length) {
      for (const [i, filename] of fileNameArray.entries()) {
        const md5Hash = md5Array[i];

        if (filename && typeof filename === 'string' && md5Hash && typeof md5Hash === 'string') {
          if (!fileHashMap.has(filename)) {
            fileHashMap.set(filename, { sha256Hashes: new Set(), md5Hashes: new Set() });
          }

          fileHashMap.get(filename)?.md5Hashes.add(md5Hash);
        }
      }
    }
  } else {
    // Method 2: Collect all hashes separately (no positional association)
    // If we have filenames but no positional association, create entries for standalone hashes
    if (fileNameArray.length > 0) {
      fileNameArray.forEach((filename: string) => {
        if (filename && typeof filename === 'string' && !fileHashMap.has(filename)) {
          fileHashMap.set(filename, { sha256Hashes: new Set(), md5Hashes: new Set() });
        }
      });
    }
  }

  // Create parent-child structure from file-hash mapping
  fileHashMap.forEach((hashData, filename) => {
    const { sha256Hashes, md5Hashes } = hashData;

    // Always create the filename as parent
    options.push({
      value: `file:${filename}`,
      displayName: filename.toLowerCase(),
      type: 'file',
      subType: 'filename',
      queryTemplate: createQueryTemplate('file', filename),
      entityData: {
        filename,
        sha256Count: sha256Hashes.size,
        md5Count: md5Hashes.size,
      },
    });

    // Add SHA256 hashes as children (always preferred)
    sha256Hashes.forEach((sha256Hash) => {
      const truncatedHash = truncateHash(sha256Hash);
      options.push({
        value: `sha256:${sha256Hash}`,
        displayName: `SHA256: ${truncatedHash.toLowerCase()}`,
        type: 'file',
        subType: 'sha256',
        parentFile: filename,
        queryTemplate: createQueryTemplate('file', sha256Hash, { hashType: 'SHA256' }),
        entityData: {
          hash: sha256Hash,
          hashType: 'SHA256',
          filename,
          isGrouped: true,
        },
      });
    });

    // Add MD5 hashes as children ONLY if no SHA256 hashes exist for this file
    if (sha256Hashes.size === 0 && md5Hashes.size > 0) {
      md5Hashes.forEach((md5Hash) => {
        const truncatedHash = truncateHash(md5Hash);
        options.push({
          value: `md5:${md5Hash}`,
          displayName: `MD5: ${truncatedHash.toLowerCase()}`,
          type: 'file',
          subType: 'md5',
          parentFile: filename,
          queryTemplate: createQueryTemplate('file', md5Hash, { hashType: 'MD5' }),
          entityData: {
            hash: md5Hash,
            hashType: 'MD5',
            filename,
            isGrouped: true,
          },
        });
      });
    }
  });

  // Note: Removed standalone hash processing - only show hashes with associated files

  return options;
};

/**
 * Process legacy structured file data from entities_full
 * Creates proper parent-child structure: filename as parent, hashes as children
 */
export const processLegacyFiles = (
  entitiesFull: unknown[],
  existingOptions: ContextOption[],
): ContextOption[] => {
  const options: ContextOption[] = [];

  if (entitiesFull && Array.isArray(entitiesFull)) {
    const fileMap = new Map<string, { sha256Hashes: Set<string>; md5Hashes: Set<string> }>();

    // Process entities_full to collect unique filenames and their hashes
    entitiesFull.forEach((entity: unknown) => {
      const entityRecord = entity as Record<string, unknown> | null | undefined;
      if (entityRecord?.FileName && typeof entityRecord.FileName === 'string') {
        const filename = entityRecord.FileName;

        if (!fileMap.has(filename)) {
          fileMap.set(filename, { sha256Hashes: new Set(), md5Hashes: new Set() });
        }

        const fileData = fileMap.get(filename);
        if (fileData) {
          // Add SHA256 hashes (automatically deduplicates)
          if (entityRecord.SHA256HashData && typeof entityRecord.SHA256HashData === 'string') {
            fileData.sha256Hashes.add(entityRecord.SHA256HashData);
          }

          // Add MD5 hashes (automatically deduplicates)
          if (entityRecord.MD5HashData && typeof entityRecord.MD5HashData === 'string') {
            fileData.md5Hashes.add(entityRecord.MD5HashData);
          }
        }
      }
    });

    // Create parent-child structure from the deduplicated map
    fileMap.forEach((fileData, filename) => {
      const { sha256Hashes, md5Hashes } = fileData;

      // Only create entries if not already handled by main processFiles function
      const filenameExists = existingOptions.some(
        (opt) => opt.value === `file:${filename}` && opt.subType === 'filename',
      );

      if (!filenameExists && (sha256Hashes.size > 0 || md5Hashes.size > 0)) {
        // Create filename as parent
        options.push({
          value: `file:${filename}`,
          displayName: filename.toLowerCase(),
          type: 'file',
          subType: 'filename',
          queryTemplate: createQueryTemplate('file', filename),
          entityData: {
            filename,
            sha256Count: sha256Hashes.size,
            md5Count: md5Hashes.size,
            isLegacy: true,
          },
        });

        // Add SHA256 hashes as children (always preferred)
        sha256Hashes.forEach((sha256Hash) => {
          const optionValue = `sha256:${sha256Hash}`;
          const alreadyExists = existingOptions.some((opt) => opt.value === optionValue);

          if (!alreadyExists) {
            const truncatedHash = truncateHash(sha256Hash);

            options.push({
              value: optionValue,
              displayName: `SHA256: ${truncatedHash.toLowerCase()}`,
              type: 'file',
              subType: 'sha256',
              parentFile: filename,
              queryTemplate: createQueryTemplate('file', sha256Hash, { hashType: 'SHA256' }),
              entityData: {
                hash: sha256Hash,
                hashType: 'SHA256',
                filename,
                isLegacy: true,
                isGrouped: true,
              },
            });
          }
        });

        // Add MD5 hashes as children ONLY if no SHA256 hashes exist for this file
        if (sha256Hashes.size === 0 && md5Hashes.size > 0) {
          md5Hashes.forEach((md5Hash) => {
            const optionValue = `md5:${md5Hash}`;
            const alreadyExists = existingOptions.some((opt) => opt.value === optionValue);

            if (!alreadyExists) {
              const truncatedHash = truncateHash(md5Hash);

              options.push({
                value: optionValue,
                displayName: `MD5: ${truncatedHash.toLowerCase()}`,
                type: 'file',
                subType: 'md5',
                parentFile: filename,
                queryTemplate: createQueryTemplate('file', md5Hash, { hashType: 'MD5' }),
                entityData: {
                  hash: md5Hash,
                  hashType: 'MD5',
                  filename,
                  isLegacy: true,
                  isGrouped: true,
                },
              });
            }
          });
        }
      }
    });
  }

  return options;
};

/**
 * Extract file entities from detection data with hash association
 */
export const extractFilesFromDetection = (detection: unknown, options: ContextOption[]): void => {
  if (!detection) return;

  const detectionRecord = detection as Record<string, unknown>;

  // Extract file information from main detection
  if (typeof detectionRecord.filename === 'string') {
    const filename = detectionRecord.filename.toLowerCase();

    // Create file entry
    options.push({
      value: `file:${filename}`,
      displayName: filename,
      type: 'file',
      subType: 'filename',
      queryTemplate: createQueryTemplate('file', filename),
      entityData: { filename },
    });

    // Add hashes associated with this file
    if (typeof detectionRecord.sha256 === 'string') {
      const sha256Hash = detectionRecord.sha256.toLowerCase();
      const truncatedHash = truncateHash(sha256Hash);

      options.push({
        value: `sha256:${sha256Hash}`,
        displayName: `SHA256: ${truncatedHash}`,
        type: 'file',
        subType: 'sha256',
        parentFile: filename,
        queryTemplate: createQueryTemplate('file', sha256Hash, { hashType: 'SHA256' }),
        entityData: {
          hash: sha256Hash,
          hashType: 'SHA256',
          filename,
          isGrouped: true,
        },
      });
    }

    if (typeof detectionRecord.md5 === 'string') {
      const md5Hash = detectionRecord.md5.toLowerCase();
      const truncatedHash = truncateHash(md5Hash);

      // Only add MD5 if no SHA256 exists
      const hasSha256 = options.some(
        (opt) => opt.subType === 'sha256' && opt.parentFile === filename,
      );
      if (!hasSha256) {
        options.push({
          value: `md5:${md5Hash}`,
          displayName: `MD5: ${truncatedHash}`,
          type: 'file',
          subType: 'md5',
          parentFile: filename,
          queryTemplate: createQueryTemplate('file', md5Hash, { hashType: 'MD5' }),
          entityData: {
            hash: md5Hash,
            hashType: 'MD5',
            filename,
            isGrouped: true,
          },
        });
      }
    }

    if (typeof detectionRecord.sha1 === 'string') {
      const sha1Hash = detectionRecord.sha1.toLowerCase();
      const truncatedHash = truncateHash(sha1Hash);

      // Only add SHA1 if no SHA256 exists
      const hasSha256 = options.some(
        (opt) => opt.subType === 'sha256' && opt.parentFile === filename,
      );
      if (!hasSha256) {
        options.push({
          value: `sha1:${sha1Hash}`,
          displayName: `SHA1: ${truncatedHash}`,
          type: 'file',
          subType: 'sha1',
          parentFile: filename,
          queryTemplate: createQueryTemplate('file', sha1Hash, { hashType: 'SHA1' }),
          entityData: {
            hash: sha1Hash,
            hashType: 'SHA1',
            filename,
            isGrouped: true,
          },
        });
      }
    }
  }

  // Extract parent process information
  if (detectionRecord.parent_details && typeof detectionRecord.parent_details === 'object') {
    const parent = detectionRecord.parent_details as Record<string, unknown>;

    if (typeof parent.filename === 'string') {
      const filename = parent.filename.toLowerCase();

      // Avoid duplicates
      const fileExists = options.some((opt) => opt.value === `file:${filename}`);
      if (!fileExists) {
        options.push({
          value: `file:${filename}`,
          displayName: filename,
          type: 'file',
          subType: 'filename',
          queryTemplate: createQueryTemplate('file', filename),
          entityData: { filename, source: 'parent_process' },
        });

        // Add parent hashes
        if (typeof parent.sha256 === 'string') {
          const sha256Hash = parent.sha256.toLowerCase();
          const truncatedHash = truncateHash(sha256Hash);

          options.push({
            value: `sha256:${sha256Hash}`,
            displayName: `SHA256: ${truncatedHash}`,
            type: 'file',
            subType: 'sha256',
            parentFile: filename,
            queryTemplate: createQueryTemplate('file', sha256Hash, { hashType: 'SHA256' }),
            entityData: {
              hash: sha256Hash,
              hashType: 'SHA256',
              filename,
              source: 'parent_process',
              isGrouped: true,
            },
          });
        }

        if (typeof parent.md5 === 'string') {
          const md5Hash = parent.md5.toLowerCase();
          const truncatedHash = truncateHash(md5Hash);

          // Only add MD5 if no SHA256 exists for this file
          const hasSha256 = options.some(
            (opt) => opt.subType === 'sha256' && opt.parentFile === filename,
          );
          if (!hasSha256) {
            options.push({
              value: `md5:${md5Hash}`,
              displayName: `MD5: ${truncatedHash}`,
              type: 'file',
              subType: 'md5',
              parentFile: filename,
              queryTemplate: createQueryTemplate('file', md5Hash, { hashType: 'MD5' }),
              entityData: {
                hash: md5Hash,
                hashType: 'MD5',
                filename,
                source: 'parent_process',
                isGrouped: true,
              },
            });
          }
        }
      }
    }
  }

  // Extract grandparent process information
  if (
    detectionRecord.grandparent_details &&
    typeof detectionRecord.grandparent_details === 'object'
  ) {
    const grandparent = detectionRecord.grandparent_details as Record<string, unknown>;

    if (typeof grandparent.filename === 'string') {
      const filename = grandparent.filename.toLowerCase();

      // Avoid duplicates
      const fileExists = options.some((opt) => opt.value === `file:${filename}`);
      if (!fileExists) {
        options.push({
          value: `file:${filename}`,
          displayName: filename,
          type: 'file',
          subType: 'filename',
          queryTemplate: createQueryTemplate('file', filename),
          entityData: { filename, source: 'grandparent_process' },
        });

        // Add grandparent hashes
        if (typeof grandparent.sha256 === 'string') {
          const sha256Hash = grandparent.sha256.toLowerCase();
          const truncatedHash = truncateHash(sha256Hash);

          options.push({
            value: `sha256:${sha256Hash}`,
            displayName: `SHA256: ${truncatedHash}`,
            type: 'file',
            subType: 'sha256',
            parentFile: filename,
            queryTemplate: createQueryTemplate('file', sha256Hash, { hashType: 'SHA256' }),
            entityData: {
              hash: sha256Hash,
              hashType: 'SHA256',
              filename,
              source: 'grandparent_process',
              isGrouped: true,
            },
          });
        }

        if (typeof grandparent.md5 === 'string') {
          const md5Hash = grandparent.md5.toLowerCase();
          const truncatedHash = truncateHash(md5Hash);

          // Only add MD5 if no SHA256 exists for this file
          const hasSha256 = options.some(
            (opt) => opt.subType === 'sha256' && opt.parentFile === filename,
          );
          if (!hasSha256) {
            options.push({
              value: `md5:${md5Hash}`,
              displayName: `MD5: ${truncatedHash}`,
              type: 'file',
              subType: 'md5',
              parentFile: filename,
              queryTemplate: createQueryTemplate('file', md5Hash, { hashType: 'MD5' }),
              entityData: {
                hash: md5Hash,
                hashType: 'MD5',
                filename,
                source: 'grandparent_process',
                isGrouped: true,
              },
            });
          }
        }
      }
    }
  }
};
