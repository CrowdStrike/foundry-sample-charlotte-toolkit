// src/utils/__tests__/badgeUtils.test.ts

import {
  getThreatLevelColor,
  getConfidenceLevelColor,
  getMalwareClassificationColor,
} from '../badgeUtils';
import type { ThreatLevel, ConfidenceLevel } from '../../types/security';

describe('badgeUtils', () => {
  describe('getThreatLevelColor', () => {
    it('should return correct colors for valid threat levels', () => {
      expect(getThreatLevelColor('Critical')).toBe('danger');
      expect(getThreatLevelColor('High')).toBe('warning');
      expect(getThreatLevelColor('Medium')).toBe('neutral');
      expect(getThreatLevelColor('Low')).toBe('success');
    });

    it('should handle case insensitive inputs', () => {
      expect(getThreatLevelColor('CRITICAL' as ThreatLevel)).toBe('danger');
      expect(getThreatLevelColor('high' as ThreatLevel)).toBe('warning');
      expect(getThreatLevelColor('medium' as ThreatLevel)).toBe('neutral');
      expect(getThreatLevelColor('low' as ThreatLevel)).toBe('success');
    });

    it('should handle mixed case inputs', () => {
      expect(getThreatLevelColor('CrItIcAl' as ThreatLevel)).toBe('danger');
      expect(getThreatLevelColor('HiGh' as ThreatLevel)).toBe('warning');
      expect(getThreatLevelColor('MeDiUm' as ThreatLevel)).toBe('neutral');
      expect(getThreatLevelColor('LoW' as ThreatLevel)).toBe('success');
    });

    it('should return neutral for invalid inputs', () => {
      expect(getThreatLevelColor('' as ThreatLevel)).toBe('neutral');
      expect(getThreatLevelColor('invalid' as ThreatLevel)).toBe('neutral');
      expect(getThreatLevelColor('unknown' as ThreatLevel)).toBe('neutral');
      expect(getThreatLevelColor('severe' as ThreatLevel)).toBe('neutral');
    });

    it('should handle edge cases', () => {
      expect(getThreatLevelColor(' Critical ' as ThreatLevel)).toBe('neutral'); // whitespace
      expect(getThreatLevelColor('Critical123' as ThreatLevel)).toBe('neutral'); // with numbers
      expect(getThreatLevelColor('Crit ical' as ThreatLevel)).toBe('neutral'); // with space
    });
  });

  describe('getConfidenceLevelColor', () => {
    it('should return correct colors for valid confidence levels', () => {
      expect(getConfidenceLevelColor('High')).toBe('success');
      expect(getConfidenceLevelColor('Medium')).toBe('warning');
      expect(getConfidenceLevelColor('Low')).toBe('neutral');
    });

    it('should handle case insensitive inputs', () => {
      expect(getConfidenceLevelColor('HIGH' as ConfidenceLevel)).toBe('success');
      expect(getConfidenceLevelColor('medium' as ConfidenceLevel)).toBe('warning');
      expect(getConfidenceLevelColor('low' as ConfidenceLevel)).toBe('neutral');
    });

    it('should handle mixed case inputs', () => {
      expect(getConfidenceLevelColor('HiGh' as ConfidenceLevel)).toBe('success');
      expect(getConfidenceLevelColor('MeDiUm' as ConfidenceLevel)).toBe('warning');
      expect(getConfidenceLevelColor('LoW' as ConfidenceLevel)).toBe('neutral');
    });

    it('should return neutral for invalid inputs', () => {
      expect(getConfidenceLevelColor('' as ConfidenceLevel)).toBe('neutral');
      expect(getConfidenceLevelColor('invalid' as ConfidenceLevel)).toBe('neutral');
      expect(getConfidenceLevelColor('unknown' as ConfidenceLevel)).toBe('neutral');
      expect(getConfidenceLevelColor('critical' as ConfidenceLevel)).toBe('neutral');
    });

    it('should handle edge cases', () => {
      expect(getConfidenceLevelColor(' High ' as ConfidenceLevel)).toBe('neutral'); // whitespace
      expect(getConfidenceLevelColor('High123' as ConfidenceLevel)).toBe('neutral'); // with numbers
      expect(getConfidenceLevelColor('Hi gh' as ConfidenceLevel)).toBe('neutral'); // with space
    });
  });

  describe('getMalwareClassificationColor', () => {
    it('should return correct colors for known classifications', () => {
      expect(getMalwareClassificationColor('malicious')).toBe('danger');
      expect(getMalwareClassificationColor('suspicious')).toBe('warning');
    });

    it('should handle case insensitive inputs', () => {
      expect(getMalwareClassificationColor('MALICIOUS')).toBe('danger');
      expect(getMalwareClassificationColor('Malicious')).toBe('danger');
      expect(getMalwareClassificationColor('SUSPICIOUS')).toBe('warning');
      expect(getMalwareClassificationColor('Suspicious')).toBe('warning');
    });

    it('should handle mixed case inputs', () => {
      expect(getMalwareClassificationColor('MaLiCiOuS')).toBe('danger');
      expect(getMalwareClassificationColor('SuSpIcIoUs')).toBe('warning');
    });

    it('should return neutral for unknown classifications', () => {
      expect(getMalwareClassificationColor('clean')).toBe('neutral');
      expect(getMalwareClassificationColor('benign')).toBe('neutral');
      expect(getMalwareClassificationColor('safe')).toBe('neutral');
      expect(getMalwareClassificationColor('unknown')).toBe('neutral');
      expect(getMalwareClassificationColor('')).toBe('neutral');
    });

    it('should handle edge cases', () => {
      expect(getMalwareClassificationColor(' malicious ')).toBe('neutral'); // whitespace
      expect(getMalwareClassificationColor('malicious123')).toBe('neutral'); // with numbers
      expect(getMalwareClassificationColor('mal icious')).toBe('neutral'); // with space
      expect(getMalwareClassificationColor('potentially malicious')).toBe('neutral'); // partial match
    });

    it('should handle various input types', () => {
      expect(getMalwareClassificationColor('harmless')).toBe('neutral');
      expect(getMalwareClassificationColor('timeout')).toBe('neutral');
      expect(getMalwareClassificationColor('error')).toBe('neutral');
      expect(getMalwareClassificationColor('not_found')).toBe('neutral');
    });
  });

  describe('integration scenarios', () => {
    it('should handle all functions with empty strings', () => {
      expect(getThreatLevelColor('' as ThreatLevel)).toBe('neutral');
      expect(getConfidenceLevelColor('' as ConfidenceLevel)).toBe('neutral');
      expect(getMalwareClassificationColor('')).toBe('neutral');
    });

    it('should handle all functions with invalid inputs consistently', () => {
      const invalidInput = 'invalid_input';
      expect(getThreatLevelColor(invalidInput as ThreatLevel)).toBe('neutral');
      expect(getConfidenceLevelColor(invalidInput as ConfidenceLevel)).toBe('neutral');
      expect(getMalwareClassificationColor(invalidInput)).toBe('neutral');
    });

    it('should return expected color types', () => {
      const threatColors = ['danger', 'warning', 'neutral', 'success'];
      const confidenceColors = ['success', 'warning', 'neutral'];
      const malwareColors = ['danger', 'warning', 'neutral'];

      expect(threatColors).toContain(getThreatLevelColor('Critical'));
      expect(confidenceColors).toContain(getConfidenceLevelColor('High'));
      expect(malwareColors).toContain(getMalwareClassificationColor('malicious'));
    });
  });
});
