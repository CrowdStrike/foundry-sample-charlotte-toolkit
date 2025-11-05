import { describe, expect, it } from 'vitest';
import { COPY_OPTIONS, type CopyFormat, formatForCopy } from '../copyUtils';

describe('copyUtils', () => {
  describe('COPY_OPTIONS constant', () => {
    it('should have exactly 3 copy options', () => {
      expect(COPY_OPTIONS).toHaveLength(3);
    });

    it('should include json format option', () => {
      const jsonOption = COPY_OPTIONS.find((opt) => opt.format === 'json');
      expect(jsonOption).toBeDefined();
      expect(jsonOption?.label).toBe('JSON');
      expect(jsonOption?.icon).toBe('code-square');
      expect(jsonOption?.description).toContain('structured data');
    });

    it('should include markdown format option', () => {
      const mdOption = COPY_OPTIONS.find((opt) => opt.format === 'markdown');
      expect(mdOption).toBeDefined();
      expect(mdOption?.label).toBe('Markdown');
      expect(mdOption?.icon).toBe('markdown');
      expect(mdOption?.description).toContain('markdown styling');
    });

    it('should include plaintext format option', () => {
      const textOption = COPY_OPTIONS.find((opt) => opt.format === 'plaintext');
      expect(textOption).toBeDefined();
      expect(textOption?.label).toBe('Plain Text');
      expect(textOption?.icon).toBe('file-text');
      expect(textOption?.description).toContain('without formatting');
    });
  });

  describe('formatForCopy', () => {
    const basicResponse = 'This is a test response';

    describe('json format', () => {
      it('should return parsed JSON response when available', () => {
        const parsedJson = {
          executive_summary: 'Test summary',
          threat_level: 'High',
        };

        const result = formatForCopy('json', basicResponse, undefined, parsedJson);
        const parsed = JSON.parse(result);

        expect(parsed.executive_summary).toBe('Test summary');
        expect(parsed.threat_level).toBe('High');
      });

      it('should fall back to jsonData when parsedJsonResponse not available', () => {
        const jsonData = {
          response: 'Test data',
          context: 'Test context',
        };

        const result = formatForCopy('json', basicResponse, jsonData);
        const parsed = JSON.parse(result);

        expect(parsed.response).toBe('Test data');
        expect(parsed.context).toBe('Test context');
      });

      it('should create basic JSON structure when no JSON data available', () => {
        const result = formatForCopy('json', basicResponse);
        const parsed = JSON.parse(result);

        expect(parsed.response).toBe(basicResponse);
        expect(parsed.timestamp).toBeDefined();
        expect(new Date(parsed.timestamp).toISOString()).toBe(parsed.timestamp);
      });

      it('should format JSON with 2-space indentation', () => {
        const parsedJson = { test: 'value' };
        const result = formatForCopy('json', basicResponse, undefined, parsedJson);

        expect(result).toContain('  "test":');
      });
    });

    describe('markdown format', () => {
      it('should convert parsed JSON to markdown when available', () => {
        const parsedJson = {
          executive_summary: 'Critical security alert',
        };

        const result = formatForCopy('markdown', basicResponse, undefined, parsedJson);

        expect(result).toContain('# Executive Summary');
        expect(result).toContain('Critical security alert');
      });

      it('should return raw response text when no parsed JSON', () => {
        const result = formatForCopy('markdown', basicResponse);
        expect(result).toBe(basicResponse);
      });

      it('should handle threat and confidence levels', () => {
        const parsedJson = {
          threat_level: 'Critical',
          confidence_level: 'High',
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Assessment');
        expect(result).toContain('**Threat Level:** Critical');
        expect(result).toContain('**Confidence Level:** High');
      });

      it('should handle malware analysis section', () => {
        const parsedJson = {
          malware_analysis: {
            malware_family: 'Emotet',
            variant_identification: 'Variant B',
            threat_classification: 'Trojan',
            risk_level: 'Critical',
          },
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Malware Analysis');
        expect(result).toContain('**Family:** Emotet');
        expect(result).toContain('**Variant:** Variant B');
        expect(result).toContain('**Classification:** Trojan');
        expect(result).toContain('**Risk Level:** Critical');
      });

      it('should handle attack intelligence with arrays', () => {
        const parsedJson = {
          attack_intelligence: {
            primary_functions: ['Data exfiltration', 'Lateral movement'],
            persistence_mechanisms: ['Registry modification', 'Scheduled tasks'],
            behavior_patterns: ['Network scanning', 'Privilege escalation'],
          },
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Attack Intelligence');
        expect(result).toContain('### Primary Functions');
        expect(result).toContain('- Data exfiltration');
        expect(result).toContain('- Lateral movement');
        expect(result).toContain('### Persistence Mechanisms');
        expect(result).toContain('- Registry modification');
        expect(result).toContain('### Behavior Patterns');
        expect(result).toContain('- Network scanning');
      });

      it('should handle incident context with IOCs', () => {
        const parsedJson = {
          incident_context: {
            investigation_relevance: 'High priority threat',
            associated_filenames: ['malware.exe', 'payload.dll'],
            related_iocs: {
              domains: ['evil.com', 'malicious.net'],
              ips: ['192.168.1.100', '10.0.0.50'],
              registry_keys: ['HKEY_LOCAL_MACHINE\\Software\\Malware'],
              hashes: ['abc123', 'def456'],
            },
          },
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Incident Context');
        expect(result).toContain('**Investigation Relevance:** High priority threat');
        expect(result).toContain('### Associated Filenames');
        expect(result).toContain('`malware.exe`');
        expect(result).toContain('### Related IOCs for Hunting');
        expect(result).toContain('**Domains:**');
        expect(result).toContain('`evil.com`');
        expect(result).toContain('**IPs:**');
        expect(result).toContain('`192.168.1.100`');
        expect(result).toContain('**Registry Keys:**');
        expect(result).toContain('**Hashes:**');
      });

      it('should handle immediate actions', () => {
        const parsedJson = {
          immediate_actions: ['Isolate system', 'Block IOCs', 'Notify security team'],
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Immediate Actions');
        expect(result).toContain('1. Isolate system');
        expect(result).toContain('2. Block IOCs');
        expect(result).toContain('3. Notify security team');
      });

      it('should handle response actions', () => {
        const parsedJson = {
          response_actions: {
            immediate_containment: ['Disconnect network', 'Kill processes'],
            detection_rules: ['Create YARA rule', 'Update SIEM'],
            remediation_guidance: ['Remove artifacts', 'Patch systems'],
          },
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Immediate Containment');
        expect(result).toContain('1. Disconnect network');
        expect(result).toContain('## Detection Rules');
        expect(result).toContain('1. Create YARA rule');
        expect(result).toContain('## Remediation Guidance');
        expect(result).toContain('1. Remove artifacts');
      });

      it('should handle IOCs section', () => {
        const parsedJson = {
          iocs: {
            hashes: ['hash1', 'hash2'],
            ips: ['1.2.3.4'],
            domains: ['evil.com'],
            urls: ['http://evil.com/payload'],
            file_paths: ['C:\\Windows\\malware.exe'],
          },
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Indicators of Compromise (IOCs)');
        expect(result).toContain('### File Hashes');
        expect(result).toContain('`hash1`');
        expect(result).toContain('### IP Addresses');
        expect(result).toContain('`1.2.3.4`');
        expect(result).toContain('### Domains');
        expect(result).toContain('`evil.com`');
        expect(result).toContain('### URLs');
        expect(result).toContain('`http://evil.com/payload`');
        expect(result).toContain('### File Paths');
        expect(result).toContain('`C:\\Windows\\malware.exe`');
      });

      it('should handle MITRE techniques', () => {
        const parsedJson = {
          mitre_techniques: [
            {
              technique_id: 'T1566',
              technique_name: 'Phishing',
              tactic: 'Initial Access',
              description: 'Email-based attack',
            },
          ],
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## MITRE ATT&CK Techniques');
        expect(result).toContain('### T1566: Phishing');
        expect(result).toContain('**Tactic:** Initial Access');
        expect(result).toContain('Email-based attack');
      });

      it('should handle MITRE techniques from attack intelligence', () => {
        const parsedJson = {
          attack_intelligence: {
            mitre_techniques: [
              {
                technique_id: 'T1003',
                technique_name: 'Credential Dumping',
                tactic: 'Credential Access',
                description: 'Extract credentials',
              },
            ],
          },
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## MITRE ATT&CK Techniques (Attack Intelligence)');
        expect(result).toContain('### T1003: Credential Dumping');
        expect(result).toContain('**Tactic:** Credential Access');
      });

      it('should handle technical details', () => {
        const parsedJson = {
          technical_details: 'Detailed technical analysis of the malware behavior',
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Technical Details');
        expect(result).toContain('Detailed technical analysis');
      });

      it('should handle recommendations', () => {
        const parsedJson = {
          recommendations: ['Update antivirus', 'Enable EDR', 'Train users'],
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Recommendations');
        expect(result).toContain('1. Update antivirus');
        expect(result).toContain('2. Enable EDR');
        expect(result).toContain('3. Train users');
      });

      it('should handle confidence assessment', () => {
        const parsedJson = {
          confidence_assessment: {
            analysis_confidence: 'High',
            source_reliability: 'Verified',
            validation_recommendations: ['Cross-check with threat intel', 'Sandbox analysis'],
          },
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Confidence & Reasoning Assessment');
        expect(result).toContain('### Confidence Metrics');
        expect(result).toContain('**Analysis Confidence:** High');
        expect(result).toContain('**Source Reliability:** Verified');
        expect(result).toContain('**Validation Recommendations:**');
        expect(result).toContain('- Cross-check with threat intel');
      });

      it('should handle reasoning assessment', () => {
        const parsedJson = {
          reasoning_assessment: 'Analysis based on behavioral patterns and IOC correlation',
        };

        const result = formatForCopy('markdown', '', undefined, parsedJson);

        expect(result).toContain('## Confidence & Reasoning Assessment');
        expect(result).toContain("### Charlotte's Analytical Methodology");
        expect(result).toContain('Analysis based on behavioral patterns');
      });

      it('should handle empty parsedJson', () => {
        const result = formatForCopy('markdown', '', undefined, {});
        expect(result).toBe('');
      });
    });

    describe('plaintext format', () => {
      it('should convert parsed JSON to plain text when available', () => {
        const parsedJson = {
          executive_summary: 'Critical alert',
        };

        const result = formatForCopy('plaintext', basicResponse, undefined, parsedJson);

        expect(result).toContain('EXECUTIVE SUMMARY');
        expect(result).toContain('Critical alert');
        expect(result).not.toContain('#');
        expect(result).not.toContain('**');
      });

      it('should strip markdown from response text when no parsed JSON', () => {
        const markdownText = '# Header\n\n**Bold text** and *italic*\n\n```code```';
        const result = formatForCopy('plaintext', markdownText);

        expect(result).not.toContain('#');
        expect(result).not.toContain('**');
        expect(result).not.toContain('*');
        expect(result).not.toContain('```');
        expect(result).toContain('Bold text');
        expect(result).toContain('italic');
      });

      it('should handle threat and confidence levels', () => {
        const parsedJson = {
          threat_level: 'High',
          confidence_level: 'Medium',
        };

        const result = formatForCopy('plaintext', '', undefined, parsedJson);

        expect(result).toContain('ASSESSMENT');
        expect(result).toContain('Threat Level: High');
        expect(result).toContain('Confidence Level: Medium');
      });

      it('should handle malware analysis', () => {
        const parsedJson = {
          malware_analysis: {
            malware_family: 'Ransomware',
            variant_identification: 'v2.0',
            threat_classification: 'Critical',
            risk_level: 'Severe',
          },
        };

        const result = formatForCopy('plaintext', '', undefined, parsedJson);

        expect(result).toContain('MALWARE ANALYSIS');
        expect(result).toContain('Family: Ransomware');
        expect(result).toContain('Variant: v2.0');
        expect(result).toContain('Classification: Critical');
        expect(result).toContain('Risk Level: Severe');
      });

      it('should handle IOCs section in plain text', () => {
        const parsedJson = {
          iocs: {
            hashes: ['abc123'],
            ips: ['1.2.3.4'],
            domains: ['evil.com'],
            urls: ['http://evil.com'],
            file_paths: ['C:\\malware.exe'],
          },
        };

        const result = formatForCopy('plaintext', '', undefined, parsedJson);

        expect(result).toContain('INDICATORS OF COMPROMISE (IOCs)');
        expect(result).toContain('File Hashes:');
        expect(result).toContain('IP Addresses:');
        expect(result).toContain('Domains:');
        expect(result).toContain('URLs:');
        expect(result).toContain('File Paths:');
      });

      it('should handle MITRE techniques in plain text', () => {
        const parsedJson = {
          mitre_techniques: [
            {
              technique_id: 'T1055',
              technique_name: 'Process Injection',
              description: 'Inject code into running process',
            },
          ],
        };

        const result = formatForCopy('plaintext', '', undefined, parsedJson);

        expect(result).toContain('MITRE ATT&CK TECHNIQUES');
        expect(result).toContain('T1055: Process Injection');
        expect(result).toContain('Inject code into running process');
      });

      it('should handle confidence assessment in plain text', () => {
        const parsedJson = {
          confidence_assessment: {
            analysis_confidence: 'High',
            source_reliability: 'Verified',
            validation_recommendations: ['Test1', 'Test2'],
          },
          reasoning_assessment: 'Based on comprehensive analysis',
        };

        const result = formatForCopy('plaintext', '', undefined, parsedJson);

        expect(result).toContain('CONFIDENCE & REASONING ASSESSMENT');
        expect(result).toContain('Confidence Metrics:');
        expect(result).toContain('Analysis Confidence: High');
        expect(result).toContain('Source Reliability: Verified');
        expect(result).toContain('Validation Recommendations:');
        expect(result).toContain("Charlotte's Analytical Methodology:");
      });
    });

    describe('markdown stripping', () => {
      it('should remove code blocks', () => {
        const text = 'Text ```code block``` more text';
        const result = formatForCopy('plaintext', text);
        expect(result).not.toContain('```');
        expect(result).toContain('Text');
        expect(result).toContain('more text');
      });

      it('should remove inline code', () => {
        const text = 'Use `command` to execute';
        const result = formatForCopy('plaintext', text);
        expect(result).not.toContain('`');
        expect(result).toContain('command');
      });

      it('should remove headers', () => {
        const text = '# Header 1\n## Header 2\n### Header 3';
        const result = formatForCopy('plaintext', text);
        expect(result).not.toContain('#');
        expect(result).toContain('Header 1');
        expect(result).toContain('Header 2');
      });

      it('should remove bold formatting', () => {
        const text = '**bold text** and __also bold__';
        const result = formatForCopy('plaintext', text);
        expect(result).not.toContain('**');
        expect(result).not.toContain('__');
        expect(result).toContain('bold text');
        expect(result).toContain('also bold');
      });

      it('should remove italic formatting', () => {
        const text = '*italic* and _also italic_';
        const result = formatForCopy('plaintext', text);
        expect(result).not.toContain('*');
        expect(result).not.toContain('_');
        expect(result).toContain('italic');
        expect(result).toContain('also italic');
      });

      it('should remove links', () => {
        const text = '[Link text](http://example.com)';
        const result = formatForCopy('plaintext', text);
        expect(result).not.toContain('[');
        expect(result).not.toContain('](');
        expect(result).toContain('Link text');
        expect(result).not.toContain('http://example.com');
      });

      it('should remove list markers', () => {
        const text = '- Item 1\n* Item 2\n+ Item 3\n1. Numbered';
        const result = formatForCopy('plaintext', text);
        expect(result).toContain('Item 1');
        expect(result).toContain('Item 2');
        expect(result).toContain('Item 3');
        expect(result).toContain('Numbered');
      });

      it('should remove blockquotes', () => {
        const text = '> Quoted text\n> More quoted';
        const result = formatForCopy('plaintext', text);
        expect(result).not.toContain('>');
        expect(result).toContain('Quoted text');
      });

      it('should remove horizontal rules', () => {
        const text = 'Text\n---\nMore text\n***\nEven more';
        const result = formatForCopy('plaintext', text);
        expect(result).not.toContain('---');
        expect(result).not.toContain('***');
        expect(result).toContain('Text');
        expect(result).toContain('More text');
      });

      it('should clean up excessive whitespace', () => {
        const text = 'Line 1\n\n\n\nLine 2\n\n\nLine 3';
        const result = formatForCopy('plaintext', text);
        expect(result).toContain('Line 1');
        expect(result).toContain('Line 2');
        expect(result).toContain('Line 3');
      });

      it('should handle empty string', () => {
        const result = formatForCopy('plaintext', '');
        expect(result).toBe('');
      });
    });

    describe('default format handling', () => {
      it('should return response text for unknown format', () => {
        const result = formatForCopy('unknown' as CopyFormat, basicResponse);
        expect(result).toBe(basicResponse);
      });
    });

    describe('comprehensive integration tests', () => {
      it('should handle complete security analysis structure', () => {
        const fullResponse = {
          executive_summary: 'Critical malware detected',
          threat_level: 'Critical',
          confidence_level: 'High',
          malware_analysis: {
            malware_family: 'Trojan.Emotet',
            variant_identification: 'Variant 2024.1',
            threat_classification: 'Banking Trojan',
            risk_level: 'Critical',
          },
          attack_intelligence: {
            primary_functions: ['Credential theft', 'C2 communication'],
            persistence_mechanisms: ['Registry autorun'],
            behavior_patterns: ['Process injection'],
            mitre_techniques: [
              {
                technique_id: 'T1055',
                technique_name: 'Process Injection',
                tactic: 'Defense Evasion',
                description: 'Injects into legitimate processes',
              },
            ],
          },
          incident_context: {
            investigation_relevance: 'Active threat',
            associated_filenames: ['invoice.exe'],
            related_iocs: {
              domains: ['malicious.com'],
              ips: ['192.168.1.1'],
              registry_keys: ['HKLM\\Software\\Malware'],
              hashes: ['abc123'],
            },
          },
          immediate_actions: ['Isolate system'],
          response_actions: {
            immediate_containment: ['Disconnect network'],
            detection_rules: ['Create detection rule'],
            remediation_guidance: ['Remove artifacts'],
          },
          iocs: {
            hashes: ['hash1'],
            ips: ['1.2.3.4'],
            domains: ['evil.com'],
            urls: ['http://evil.com'],
            file_paths: ['C:\\malware.exe'],
          },
          mitre_techniques: [
            {
              technique_id: 'T1566',
              technique_name: 'Phishing',
              tactic: 'Initial Access',
              description: 'Phishing email',
            },
          ],
          technical_details: 'Detailed analysis here',
          recommendations: ['Update systems', 'Train users'],
          confidence_assessment: {
            analysis_confidence: 'High',
            source_reliability: 'Verified',
            validation_recommendations: ['Sandbox analysis'],
          },
          reasoning_assessment: 'Based on threat intelligence',
        };

        const jsonResult = formatForCopy('json', '', undefined, fullResponse);
        const mdResult = formatForCopy('markdown', '', undefined, fullResponse);
        const textResult = formatForCopy('plaintext', '', undefined, fullResponse);

        // Verify JSON
        const parsed = JSON.parse(jsonResult);
        expect(parsed.executive_summary).toBe('Critical malware detected');

        // Verify Markdown
        expect(mdResult).toContain('# Executive Summary');
        expect(mdResult).toContain('## Malware Analysis');
        expect(mdResult).toContain('## MITRE ATT&CK Techniques');

        // Verify Plain Text
        expect(textResult).toContain('EXECUTIVE SUMMARY');
        expect(textResult).toContain('MALWARE ANALYSIS');
        expect(textResult).toContain('MITRE ATT&CK TECHNIQUES');
      });
    });
  });
});
