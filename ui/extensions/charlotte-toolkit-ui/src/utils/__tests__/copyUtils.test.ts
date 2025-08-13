// src/utils/__tests__/copyUtils.test.ts

import {
  stripMarkdown,
  convertJsonToMarkdown,
  convertJsonToPlainText,
  formatForCopy,
  copyToClipboard,
  getCopySuccessMessage,
  COPY_OPTIONS,
  type CopyFormat,
} from '../copyUtils';

// Mock navigator.clipboard
const mockClipboard = {
  writeText: jest.fn(),
};

Object.assign(navigator, {
  clipboard: mockClipboard,
});

describe('copyUtils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('COPY_OPTIONS constant', () => {
    it('should contain all expected copy format options', () => {
      expect(COPY_OPTIONS).toHaveLength(3);
      
      const formats = COPY_OPTIONS.map(option => option.format);
      expect(formats).toContain('json');
      expect(formats).toContain('markdown');
      expect(formats).toContain('plaintext');
    });

    it('should have proper structure for each option', () => {
      COPY_OPTIONS.forEach(option => {
        expect(option).toHaveProperty('format');
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('icon');
        expect(option).toHaveProperty('description');
        expect(typeof option.format).toBe('string');
        expect(typeof option.label).toBe('string');
        expect(typeof option.icon).toBe('string');
        expect(typeof option.description).toBe('string');
      });
    });

    it('should have unique formats', () => {
      const formats = COPY_OPTIONS.map(option => option.format);
      const uniqueFormats = [...new Set(formats)];
      expect(formats).toHaveLength(uniqueFormats.length);
    });
  });

  describe('stripMarkdown', () => {
    it('should handle empty input', () => {
      expect(stripMarkdown('')).toBe('');
      expect(stripMarkdown(null as any)).toBe('');
      expect(stripMarkdown(undefined as any)).toBe('');
    });

    it('should remove headers', () => {
      expect(stripMarkdown('# Header 1')).toBe('Header 1');
      expect(stripMarkdown('## Header 2')).toBe('Header 2');
      expect(stripMarkdown('### Header 3')).toBe('Header 3');
      expect(stripMarkdown('#### Header 4')).toBe('Header 4');
      expect(stripMarkdown('##### Header 5')).toBe('Header 5');
      expect(stripMarkdown('###### Header 6')).toBe('Header 6');
    });

    it('should remove code blocks', () => {
      const input = '```javascript\nconst x = 1;\n```';
      expect(stripMarkdown(input)).toBe('');
    });

    it('should remove inline code', () => {
      expect(stripMarkdown('This is `inline code` here')).toBe('This is inline code here');
    });

    it('should remove bold formatting', () => {
      expect(stripMarkdown('This is **bold** text')).toBe('This is bold text');
      expect(stripMarkdown('This is __bold__ text')).toBe('This is bold text');
    });

    it('should remove italic formatting', () => {
      expect(stripMarkdown('This is *italic* text')).toBe('This is italic text');
      expect(stripMarkdown('This is _italic_ text')).toBe('This is italic text');
    });

    it('should remove links', () => {
      expect(stripMarkdown('[Link text](https://example.com)')).toBe('Link text');
    });

    it('should remove list markers', () => {
      expect(stripMarkdown('- Item 1')).toBe('Item 1');
      expect(stripMarkdown('* Item 2')).toBe('Item 2');
      expect(stripMarkdown('+ Item 3')).toBe('Item 3');
      expect(stripMarkdown('1. Numbered item')).toBe('Numbered item');
    });

    it('should remove blockquotes', () => {
      expect(stripMarkdown('> This is a quote')).toBe('This is a quote');
    });

    it('should remove horizontal rules', () => {
      expect(stripMarkdown('---')).toBe('');
      expect(stripMarkdown('***')).toBe('');
      expect(stripMarkdown('___')).toBe('');
    });

    it('should clean up extra whitespace', () => {
      const input = '   Text with\n\n\n\nextra whitespace   ';
      const result = stripMarkdown(input);
      expect(result).toBe('Text with\n\nextra whitespace');
    });

    it('should handle complex markdown combinations', () => {
      const input = `
# Title
## Subtitle

This is **bold** and *italic* text with \`inline code\`.

- List item 1
- List item 2

> Quote text

\`\`\`javascript
const code = "block";
\`\`\`

[Link](https://example.com)
      `;
      
      const result = stripMarkdown(input);
      expect(result).toContain('Title');
      expect(result).toContain('Subtitle');
      expect(result).toContain('bold and italic text with inline code');
      expect(result).toContain('List item 1');
      expect(result).toContain('Quote text');
      expect(result).toContain('Link');
      expect(result).not.toContain('```');
      expect(result).not.toContain('**');
      expect(result).not.toContain('*');
      expect(result).not.toContain('#');
    });
  });

  describe('convertJsonToMarkdown', () => {
    it('should handle empty input', () => {
      expect(convertJsonToMarkdown(null)).toBe('');
      expect(convertJsonToMarkdown(undefined)).toBe('');
      expect(convertJsonToMarkdown({})).toBe('');
    });

    it('should convert executive summary', () => {
      const jsonData = {
        executive_summary: 'This is a test summary'
      };
      
      const result = convertJsonToMarkdown(jsonData);
      expect(result).toContain('# Executive Summary');
      expect(result).toContain('This is a test summary');
    });

    it('should convert threat and confidence levels', () => {
      const jsonData = {
        threat_level: 'High',
        confidence_level: 'Medium'
      };
      
      const result = convertJsonToMarkdown(jsonData);
      expect(result).toContain('## Assessment');
      expect(result).toContain('**Threat Level:** High');
      expect(result).toContain('**Confidence Level:** Medium');
    });

    it('should convert malware analysis', () => {
      const jsonData = {
        malware_analysis: {
          malware_family: 'TestFamily',
          variant_identification: 'TestVariant',
          threat_classification: 'Malicious',
          risk_level: 'High'
        }
      };
      
      const result = convertJsonToMarkdown(jsonData);
      expect(result).toContain('## Malware Analysis');
      expect(result).toContain('**Family:** TestFamily');
      expect(result).toContain('**Variant:** TestVariant');
      expect(result).toContain('**Classification:** Malicious');
      expect(result).toContain('**Risk Level:** High');
    });

    it('should convert attack intelligence', () => {
      const jsonData = {
        attack_intelligence: {
          primary_functions: ['Function 1', 'Function 2'],
          persistence_mechanisms: ['Mechanism 1'],
          behavior_patterns: ['Pattern 1', 'Pattern 2']
        }
      };
      
      const result = convertJsonToMarkdown(jsonData);
      expect(result).toContain('## Attack Intelligence');
      expect(result).toContain('### Primary Functions');
      expect(result).toContain('- Function 1');
      expect(result).toContain('- Function 2');
      expect(result).toContain('### Persistence Mechanisms');
      expect(result).toContain('- Mechanism 1');
      expect(result).toContain('### Behavior Patterns');
      expect(result).toContain('- Pattern 1');
    });

    it('should convert IOCs', () => {
      const jsonData = {
        iocs: {
          hashes: ['hash1', 'hash2'],
          ips: ['1.2.3.4', '5.6.7.8'],
          domains: ['example.com', 'test.com'],
          urls: ['http://example.com'],
          file_paths: ['/path/to/file']
        }
      };
      
      const result = convertJsonToMarkdown(jsonData);
      expect(result).toContain('## Indicators of Compromise (IOCs)');
      expect(result).toContain('### File Hashes');
      expect(result).toContain('- `hash1`');
      expect(result).toContain('### IP Addresses');
      expect(result).toContain('- `1.2.3.4`');
      expect(result).toContain('### Domains');
      expect(result).toContain('- `example.com`');
      expect(result).toContain('### URLs');
      expect(result).toContain('- `http://example.com`');
      expect(result).toContain('### File Paths');
      expect(result).toContain('- `/path/to/file`');
    });

    it('should convert MITRE techniques', () => {
      const jsonData = {
        mitre_techniques: [
          {
            technique_id: 'T1027',
            technique_name: 'Obfuscated Files or Information',
            tactic: 'Defense Evasion',
            description: 'Test description'
          }
        ]
      };
      
      const result = convertJsonToMarkdown(jsonData);
      expect(result).toContain('## MITRE ATT&CK Techniques');
      expect(result).toContain('### T1027: Obfuscated Files or Information');
      expect(result).toContain('**Tactic:** Defense Evasion');
      expect(result).toContain('Test description');
    });

    it('should convert immediate actions', () => {
      const jsonData = {
        immediate_actions: ['Action 1', 'Action 2', 'Action 3']
      };
      
      const result = convertJsonToMarkdown(jsonData);
      expect(result).toContain('## Immediate Actions');
      expect(result).toContain('1. Action 1');
      expect(result).toContain('2. Action 2');
      expect(result).toContain('3. Action 3');
    });

    it('should handle complex nested structures', () => {
      const jsonData = {
        executive_summary: 'Test summary',
        threat_level: 'High',
        iocs: {
          hashes: ['test-hash']
        },
        mitre_techniques: [
          {
            technique_id: 'T1234',
            technique_name: 'Test Technique'
          }
        ]
      };
      
      const result = convertJsonToMarkdown(jsonData);
      expect(result).toContain('# Executive Summary');
      expect(result).toContain('## Assessment');
      expect(result).toContain('## Indicators of Compromise');
      expect(result).toContain('## MITRE ATT&CK Techniques');
    });
  });

  describe('convertJsonToPlainText', () => {
    it('should handle empty input', () => {
      expect(convertJsonToPlainText(null)).toBe('');
      expect(convertJsonToPlainText(undefined)).toBe('');
      expect(convertJsonToPlainText({})).toBe('');
    });

    it('should convert executive summary to plain text', () => {
      const jsonData = {
        executive_summary: 'This is a test summary'
      };
      
      const result = convertJsonToPlainText(jsonData);
      expect(result).toContain('EXECUTIVE SUMMARY');
      expect(result).toContain('This is a test summary');
      expect(result).not.toContain('#');
    });

    it('should convert threat levels to plain text', () => {
      const jsonData = {
        threat_level: 'High',
        confidence_level: 'Medium'
      };
      
      const result = convertJsonToPlainText(jsonData);
      expect(result).toContain('ASSESSMENT');
      expect(result).toContain('Threat Level: High');
      expect(result).toContain('Confidence Level: Medium');
      expect(result).not.toContain('**');
    });

    it('should convert IOCs to plain text format', () => {
      const jsonData = {
        iocs: {
          hashes: ['hash1'],
          ips: ['1.2.3.4'],
          domains: ['example.com']
        }
      };
      
      const result = convertJsonToPlainText(jsonData);
      expect(result).toContain('INDICATORS OF COMPROMISE (IOCs)');
      expect(result).toContain('File Hashes:');
      expect(result).toContain('- hash1');
      expect(result).toContain('IP Addresses:');
      expect(result).toContain('- 1.2.3.4');
      expect(result).toContain('Domains:');
      expect(result).toContain('- example.com');
      expect(result).not.toContain('`');
    });

    it('should convert MITRE techniques to plain text', () => {
      const jsonData = {
        mitre_techniques: [
          {
            technique_id: 'T1027',
            technique_name: 'Test Technique',
            description: 'Test description'
          }
        ]
      };
      
      const result = convertJsonToPlainText(jsonData);
      expect(result).toContain('MITRE ATT&CK TECHNIQUES');
      expect(result).toContain('T1027: Test Technique');
      expect(result).toContain('Test description');
      expect(result).not.toContain('#');
    });
  });

  describe('formatForCopy', () => {
    const responseText = 'Test response text';
    const jsonData = { test: 'data' };
    const parsedJsonResponse = {
      executive_summary: 'Test summary',
      threat_level: 'High'
    };

    it('should format as JSON when format is json', () => {
      const result = formatForCopy('json', responseText, jsonData, parsedJsonResponse);
      const parsed = JSON.parse(result);
      expect(parsed.executive_summary).toBe('Test summary');
      expect(parsed.threat_level).toBe('High');
    });

    it('should fall back to jsonData when no parsedJsonResponse for JSON format', () => {
      const result = formatForCopy('json', responseText, jsonData);
      const parsed = JSON.parse(result);
      expect(parsed.test).toBe('data');
    });

    it('should create basic JSON structure when no data available', () => {
      const result = formatForCopy('json', responseText);
      const parsed = JSON.parse(result);
      expect(parsed.response).toBe(responseText);
      expect(parsed.timestamp).toBeDefined();
    });

    it('should format as markdown when format is markdown', () => {
      const result = formatForCopy('markdown', responseText, jsonData, parsedJsonResponse);
      expect(result).toContain('# Executive Summary');
      expect(result).toContain('Test summary');
    });

    it('should use response text when no parsedJsonResponse for markdown', () => {
      const result = formatForCopy('markdown', responseText, jsonData);
      expect(result).toBe(responseText);
    });

    it('should format as plain text when format is plaintext', () => {
      const result = formatForCopy('plaintext', responseText, jsonData, parsedJsonResponse);
      expect(result).toContain('EXECUTIVE SUMMARY');
      expect(result).toContain('Test summary');
      expect(result).not.toContain('#');
    });

    it('should strip markdown when no parsedJsonResponse for plaintext', () => {
      const markdownText = '# Header\nThis is **bold** text';
      const result = formatForCopy('plaintext', markdownText, jsonData);
      expect(result).toContain('Header');
      expect(result).toContain('This is bold text');
      expect(result).not.toContain('#');
      expect(result).not.toContain('**');
    });

    it('should return response text for unknown format', () => {
      const result = formatForCopy('unknown' as CopyFormat, responseText, jsonData, parsedJsonResponse);
      expect(result).toBe(responseText);
    });

    it('should handle empty inputs gracefully', () => {
      expect(formatForCopy('json', '')).toBeDefined();
      expect(formatForCopy('markdown', '')).toBe('');
      expect(formatForCopy('plaintext', '')).toBe('');
    });
  });

  describe('copyToClipboard', () => {
    it('should successfully copy text to clipboard', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      
      const result = await copyToClipboard('test text', 'plaintext');
      
      expect(result).toBe(true);
      expect(mockClipboard.writeText).toHaveBeenCalledWith('test text');
    });

    it('should handle clipboard API failure gracefully', async () => {
      mockClipboard.writeText.mockRejectedValue(new Error('Clipboard not available'));
      
      const result = await copyToClipboard('test text', 'plaintext');
      
      expect(result).toBe(false);
      expect(mockClipboard.writeText).toHaveBeenCalledWith('test text');
    });

    it('should work with different text content', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      
      const texts = ['simple text', 'text with\nnewlines', '{"json": "data"}', ''];
      
      for (const text of texts) {
        const result = await copyToClipboard(text, 'json');
        expect(result).toBe(true);
        expect(mockClipboard.writeText).toHaveBeenCalledWith(text);
      }
    });

    it('should handle different formats parameter', async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);
      
      const formats: CopyFormat[] = ['json', 'markdown', 'plaintext'];
      
      for (const format of formats) {
        const result = await copyToClipboard('test', format);
        expect(result).toBe(true);
      }
    });
  });

  describe('getCopySuccessMessage', () => {
    it('should return correct message for json format', () => {
      expect(getCopySuccessMessage('json')).toBe('JSON copied to clipboard!');
    });

    it('should return correct message for markdown format', () => {
      expect(getCopySuccessMessage('markdown')).toBe('Markdown copied to clipboard!');
    });

    it('should return correct message for plaintext format', () => {
      expect(getCopySuccessMessage('plaintext')).toBe('Plain text copied to clipboard!');
    });

    it('should return default message for unknown format', () => {
      expect(getCopySuccessMessage('unknown' as CopyFormat)).toBe('Copied to clipboard!');
    });

    it('should return string for all valid formats', () => {
      const formats: CopyFormat[] = ['json', 'markdown', 'plaintext'];
      
      formats.forEach(format => {
        const message = getCopySuccessMessage(format);
        expect(typeof message).toBe('string');
        expect(message.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Integration Tests', () => {
    it('should work end-to-end for complete workflow', async () => {
      const jsonData = {
        executive_summary: 'Test malware detected',
        threat_level: 'High',
        iocs: {
          hashes: ['abc123']
        }
      };

      // Test markdown format
      const markdownText = formatForCopy('markdown', 'fallback', {}, jsonData);
      expect(markdownText).toContain('# Executive Summary');
      
      // Test plain text format
      const plaintextText = formatForCopy('plaintext', 'fallback', {}, jsonData);
      expect(plaintextText).toContain('EXECUTIVE SUMMARY');
      expect(plaintextText).not.toContain('#');
      
      // Test JSON format
      const jsonText = formatForCopy('json', 'fallback', {}, jsonData);
      const parsed = JSON.parse(jsonText);
      expect(parsed.executive_summary).toBe('Test malware detected');
      
      // Test clipboard functionality
      mockClipboard.writeText.mockResolvedValue(undefined);
      const copyResult = await copyToClipboard(markdownText, 'markdown');
      expect(copyResult).toBe(true);
      
      // Test success message
      const message = getCopySuccessMessage('markdown');
      expect(message).toBe('Markdown copied to clipboard!');
    });

    it('should handle edge cases gracefully', () => {
      // Empty data
      expect(formatForCopy('json', '')).toBeDefined();
      expect(formatForCopy('markdown', '', {})).toBe('');
      expect(formatForCopy('plaintext', '', {})).toBe('');
      
      // Null/undefined data
      expect(convertJsonToMarkdown(null)).toBe('');
      expect(convertJsonToPlainText(undefined)).toBe('');
      expect(stripMarkdown('')).toBe('');
    });

    it('should maintain data integrity through transformations', () => {
      const originalData = {
        executive_summary: 'Critical malware analysis',
        threat_level: 'Critical',
        confidence_level: 'High',
        iocs: {
          hashes: ['hash1', 'hash2'],
          domains: ['malicious.com']
        }
      };

      // JSON format should preserve all data
      const jsonResult = formatForCopy('json', '', {}, originalData);
      const parsedBack = JSON.parse(jsonResult);
      expect(parsedBack).toEqual(originalData);
      
      // Markdown format should contain key information
      const markdownResult = formatForCopy('markdown', '', {}, originalData);
      expect(markdownResult).toContain('Critical malware analysis');
      expect(markdownResult).toContain('Critical');
      expect(markdownResult).toContain('hash1');
      expect(markdownResult).toContain('malicious.com');
      
      // Plain text should contain key information without formatting
      const plainResult = formatForCopy('plaintext', '', {}, originalData);
      expect(plainResult).toContain('Critical malware analysis');
      expect(plainResult).toContain('Critical');
      expect(plainResult).toContain('hash1');
      expect(plainResult).not.toContain('**');
      expect(plainResult).not.toContain('#');
    });
  });
});
