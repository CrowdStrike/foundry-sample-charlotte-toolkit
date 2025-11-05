import { describe, expect, it } from 'vitest';
import type { ConfidenceLevel, ThreatLevel } from '../../types/security';
import { getConfidenceLevelColor, getThreatLevelColor } from '../badgeUtils';

describe('badgeUtils', () => {
  describe('getThreatLevelColor', () => {
    it('should return danger for critical', () => {
      expect(getThreatLevelColor('Critical' as ThreatLevel)).toBe('danger');
    });

    it('should return danger for critical (lowercase)', () => {
      expect(getThreatLevelColor('critical' as ThreatLevel)).toBe('danger');
    });

    it('should return danger for critical (mixed case)', () => {
      expect(getThreatLevelColor('CRITICAL' as ThreatLevel)).toBe('danger');
    });

    it('should return warning for high', () => {
      expect(getThreatLevelColor('High' as ThreatLevel)).toBe('warning');
    });

    it('should return warning for high (lowercase)', () => {
      expect(getThreatLevelColor('high' as ThreatLevel)).toBe('warning');
    });

    it('should return warning for high (mixed case)', () => {
      expect(getThreatLevelColor('HIGH' as ThreatLevel)).toBe('warning');
    });

    it('should return neutral for medium', () => {
      expect(getThreatLevelColor('Medium' as ThreatLevel)).toBe('neutral');
    });

    it('should return neutral for medium (lowercase)', () => {
      expect(getThreatLevelColor('medium' as ThreatLevel)).toBe('neutral');
    });

    it('should return neutral for medium (mixed case)', () => {
      expect(getThreatLevelColor('MEDIUM' as ThreatLevel)).toBe('neutral');
    });

    it('should return success for low', () => {
      expect(getThreatLevelColor('Low' as ThreatLevel)).toBe('success');
    });

    it('should return success for low (lowercase)', () => {
      expect(getThreatLevelColor('low' as ThreatLevel)).toBe('success');
    });

    it('should return success for low (mixed case)', () => {
      expect(getThreatLevelColor('LOW' as ThreatLevel)).toBe('success');
    });

    it('should return neutral for unknown value', () => {
      expect(getThreatLevelColor('unknown' as ThreatLevel)).toBe('neutral');
    });

    it('should return neutral for empty string', () => {
      expect(getThreatLevelColor('' as ThreatLevel)).toBe('neutral');
    });

    it('should return neutral for invalid value', () => {
      expect(getThreatLevelColor('invalid' as ThreatLevel)).toBe('neutral');
    });
  });

  describe('getConfidenceLevelColor', () => {
    it('should return success for high', () => {
      expect(getConfidenceLevelColor('High' as ConfidenceLevel)).toBe('success');
    });

    it('should return success for high (lowercase)', () => {
      expect(getConfidenceLevelColor('high' as ConfidenceLevel)).toBe('success');
    });

    it('should return success for high (mixed case)', () => {
      expect(getConfidenceLevelColor('HIGH' as ConfidenceLevel)).toBe('success');
    });

    it('should return warning for medium', () => {
      expect(getConfidenceLevelColor('Medium' as ConfidenceLevel)).toBe('warning');
    });

    it('should return warning for medium (lowercase)', () => {
      expect(getConfidenceLevelColor('medium' as ConfidenceLevel)).toBe('warning');
    });

    it('should return warning for medium (mixed case)', () => {
      expect(getConfidenceLevelColor('MEDIUM' as ConfidenceLevel)).toBe('warning');
    });

    it('should return neutral for low', () => {
      expect(getConfidenceLevelColor('Low' as ConfidenceLevel)).toBe('neutral');
    });

    it('should return neutral for low (lowercase)', () => {
      expect(getConfidenceLevelColor('low' as ConfidenceLevel)).toBe('neutral');
    });

    it('should return neutral for low (mixed case)', () => {
      expect(getConfidenceLevelColor('LOW' as ConfidenceLevel)).toBe('neutral');
    });

    it('should return neutral for unknown value', () => {
      expect(getConfidenceLevelColor('unknown' as ConfidenceLevel)).toBe('neutral');
    });

    it('should return neutral for empty string', () => {
      expect(getConfidenceLevelColor('' as ConfidenceLevel)).toBe('neutral');
    });

    it('should return neutral for invalid value', () => {
      expect(getConfidenceLevelColor('invalid' as ConfidenceLevel)).toBe('neutral');
    });
  });
});
