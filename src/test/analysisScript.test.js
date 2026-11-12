import { describe, it, expect } from 'vitest';
import {
  mean,
  median,
  stdDev,
  calculateCompletionRates,
  calculateTimeOnTask,
  calculateErrorSummary,
  calculateSEQStats,
  calculateSUSScore,
  getSUSGrade,
  calculateSUSSummary,
  parseCSV,
} from '../../scripts/analyze-module09.mjs';

describe('Module 09 Analysis Engine (Unit Tests on Mathematical Formulas)', () => {
  describe('Statistical Helpers', () => {
    it('calculates mean correctly', () => {
      expect(mean([10, 20, 30])).toBe(20);
      expect(mean([])).toBe(0);
      expect(mean([5.5, 6.5])).toBe(6.0);
    });

    it('calculates median correctly for odd and even counts', () => {
      expect(median([10, 20, 30])).toBe(20);
      expect(median([10, 20, 30, 40])).toBe(25);
      expect(median([])).toBe(0);
    });

    it('calculates sample standard deviation', () => {
      expect(stdDev([10, 10, 10])).toBe(0);
      expect(stdDev([10, 20])).toBe(7.07);
      expect(stdDev([5])).toBe(0);
    });
  });

  describe('calculateCompletionRates', () => {
    it('calculates unassisted, assisted, and overall completion percentages', () => {
      // Temporary synthetic fixture for unit test verification only
      const mockTasks = [
        { outcome: 'Unassisted' },
        { outcome: 'Unassisted' },
        { outcome: 'Assisted' },
        { outcome: 'Failed' },
      ];
      const result = calculateCompletionRates(mockTasks);
      expect(result.attempted).toBe(4);
      expect(result.unassistedCount).toBe(2);
      expect(result.assistedCount).toBe(1);
      expect(result.failedCount).toBe(1);
      expect(result.unassistedRate).toBe(50.0);
      expect(result.assistedRate).toBe(25.0);
      expect(result.failedRate).toBe(25.0);
      expect(result.overallCompletionRate).toBe(75.0);
    });

    it('handles empty task list gracefully', () => {
      const result = calculateCompletionRates([]);
      expect(result.attempted).toBe(0);
      expect(result.overallCompletionRate).toBe(0);
    });
  });

  describe('calculateTimeOnTask', () => {
    it('computes time metrics accurately', () => {
      // Temporary synthetic duration data
      const mockTasks = [
        { duration_seconds: 40 },
        { duration_seconds: 60 },
        { duration_seconds: 80 },
      ];
      const result = calculateTimeOnTask(mockTasks);
      expect(result.count).toBe(3);
      expect(result.mean).toBe(60);
      expect(result.median).toBe(60);
      expect(result.min).toBe(40);
      expect(result.max).toBe(80);
    });

    it('handles empty tasks for time', () => {
      const result = calculateTimeOnTask([]);
      expect(result.count).toBe(0);
      expect(result.mean).toBe(0);
    });
  });

  describe('calculateErrorSummary', () => {
    it('sums error categories and calculates error rate per task', () => {
      const mockTasks = [
        { err_crit: 1, err_non: 2, err_click: 1, err_nav: 0, err_model: 0 },
        { err_crit: 0, err_non: 1, err_click: 0, err_nav: 1, err_model: 1 },
      ];
      const result = calculateErrorSummary(mockTasks);
      expect(result.critCount).toBe(1);
      expect(result.nonCount).toBe(3);
      expect(result.clickCount).toBe(1);
      expect(result.navCount).toBe(1);
      expect(result.modelCount).toBe(1);
      expect(result.totalErrors).toBe(7);
      expect(result.errorRatePerTask).toBe(3.5);
    });
  });

  describe('calculateSEQStats', () => {
    it('computes SEQ mean, median, and rating distribution', () => {
      const mockTasks = [
        { seq_score: 6 },
        { seq_score: 7 },
        { seq_score: 5 },
      ];
      const result = calculateSEQStats(mockTasks);
      expect(result.count).toBe(3);
      expect(result.mean).toBe(6.0);
      expect(result.median).toBe(6.0);
      expect(result.distribution[6]).toBe(1);
      expect(result.distribution[7]).toBe(1);
      expect(result.distribution[5]).toBe(1);
    });
  });

  describe('calculateSUSScore (Standard Brooke 1996 Algorithm)', () => {
    it('calculates 100 for perfect usability ratings (odd 5s, even 1s)', () => {
      // 5 on odd items (positive), 1 on even items (negative)
      const perfectAnswers = [5, 1, 5, 1, 5, 1, 5, 1, 5, 1];
      expect(calculateSUSScore(perfectAnswers)).toBe(100.0);
    });

    it('calculates 0 for worst usability ratings (odd 1s, even 5s)', () => {
      // 1 on odd items, 5 on even items
      const worstAnswers = [1, 5, 1, 5, 1, 5, 1, 5, 1, 5];
      expect(calculateSUSScore(worstAnswers)).toBe(0.0);
    });

    it('calculates 50 for neutral responses (all 3s)', () => {
      const neutralAnswers = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
      expect(calculateSUSScore(neutralAnswers)).toBe(50.0);
    });

    it('calculates realistic high-usability score accurately', () => {
      // Odd: 4, 5, 5, 4, 5 -> contributions: 3, 4, 4, 3, 4 = 18
      // Even: 2, 1, 2, 2, 1 -> contributions: 3, 4, 3, 3, 4 = 17
      // Sum = 35 -> 35 * 2.5 = 87.5
      const answers = [4, 2, 5, 1, 5, 2, 4, 2, 5, 1];
      expect(calculateSUSScore(answers)).toBe(87.5);
    });
  });

  describe('getSUSGrade (Sauro-Lewis Curve)', () => {
    it('maps scores to correct grade letters', () => {
      expect(getSUSGrade(92.5)).toBe('A+');
      expect(getSUSGrade(85.0)).toBe('A');
      expect(getSUSGrade(76.0)).toBe('B');
      expect(getSUSGrade(70.0)).toBe('C');
      expect(getSUSGrade(55.0)).toBe('D');
      expect(getSUSGrade(40.0)).toBe('F');
    });
  });

  describe('calculateSUSSummary', () => {
    it('summarizes multiple SUS records correctly', () => {
      const mockRecords = [
        { sus_score: 80.0 },
        { sus_score: 90.0 },
      ];
      const summary = calculateSUSSummary(mockRecords);
      expect(summary.count).toBe(2);
      expect(summary.mean).toBe(85.0);
      expect(summary.grade).toBe('A');
    });
  });

  describe('parseCSV', () => {
    it('parses valid CSV string into array of objects', () => {
      const csv = 'id,name,role\n1,Alice,Learner\n2,Bob,Host';
      const rows = parseCSV(csv);
      expect(rows.length).toBe(2);
      expect(rows[0].id).toBe('1');
      expect(rows[0].name).toBe('Alice');
      expect(rows[1].role).toBe('Host');
    });

    it('returns empty array for empty or header-only string', () => {
      expect(parseCSV('')).toEqual([]);
      expect(parseCSV('id,name')).toEqual([]);
    });
  });
});
