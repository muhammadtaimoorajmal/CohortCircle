import { describe, it, expect } from 'vitest';
import {
  mean,
  median,
  stdDev,
  percentile,
  calculateIQR,
  parseRFC4180CSV,
  validateHeaders,
  validateDatasets,
  calculateCompletionRates,
  calculateTimeOnTask,
  calculateErrorSummary,
  calculateSEQStats,
  calculatePerTaskSummary,
  calculateSUSScore,
  calculateSUSSummary,
  calculateContextStratification,
  calculateQualitativeSummary,
  determineCompletionState,
  runAnalysis,
} from '../../scripts/analyze-module09.mjs';

describe('Module 09 Analysis Engine & Statistical Algorithms', () => {
  // ==========================================================================
  // 1. STATISTICAL HELPERS & PERCENTILES
  // ==========================================================================
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

    it('calculates percentiles and IQR accurately', () => {
      const data = [10, 20, 30, 40, 50, 60, 70, 80];
      expect(percentile(data, 25)).toBe(27.5);
      expect(percentile(data, 75)).toBe(62.5);
      expect(calculateIQR(data)).toBe(35);
      expect(calculateIQR([50])).toBe(0);
    });
  });

  // ==========================================================================
  // 2. RFC 4180 COMPLIANT CSV PARSING
  // ==========================================================================
  describe('parseRFC4180CSV', () => {
    it('parses standard unquoted CSV text', () => {
      const csv = 'id,name,role\nM09-P01,Alice,Learner\nM09-P02,Bob,Host';
      const { headers, rows } = parseRFC4180CSV(csv);
      expect(headers).toEqual(['id', 'name', 'role']);
      expect(rows.length).toBe(2);
      expect(rows[0].id).toBe('M09-P01');
      expect(rows[1].name).toBe('Bob');
    });

    it('parses quoted fields with commas inside quotes', () => {
      const csv = 'participant_id,note\nM09-P01,"Hello, this is a note, with commas"';
      const { rows } = parseRFC4180CSV(csv);
      expect(rows.length).toBe(1);
      expect(rows[0].note).toBe('Hello, this is a note, with commas');
    });

    it('parses escaped double quotes ("")', () => {
      const csv = 'id,quote\nM09-P01,"He said ""Look at this"" to me"';
      const { rows } = parseRFC4180CSV(csv);
      expect(rows[0].quote).toBe('He said "Look at this" to me');
    });

    it('handles CRLF (\\r\\n) and LF (\\n) line endings', () => {
      const crlfCsv = 'id,val\r\nM09-P01,10\r\nM09-P02,20\r\n';
      const lfCsv = 'id,val\nM09-P01,10\nM09-P02,20\n';
      expect(parseRFC4180CSV(crlfCsv).rows.length).toBe(2);
      expect(parseRFC4180CSV(lfCsv).rows.length).toBe(2);
    });

    it('handles embedded line breaks inside quoted fields', () => {
      const csv = 'id,feedback\nM09-P01,"First line of feedback\nSecond line of feedback"';
      const { rows } = parseRFC4180CSV(csv);
      expect(rows.length).toBe(1);
      expect(rows[0].feedback).toBe('First line of feedback\nSecond line of feedback');
    });

    it('throws on malformed CSV with unclosed quotes', () => {
      const malformed = 'id,note\nM09-P01,"Unclosed quote here';
      expect(() => parseRFC4180CSV(malformed)).toThrow(/Unclosed quote/);
    });

    it('throws on malformed row with column count mismatch', () => {
      const malformed = 'id,name,role\nM09-P01,Alice\nM09-P02,Bob,Host';
      expect(() => parseRFC4180CSV(malformed)).toThrow(/Row 2 has 2 columns, expected 3/);
    });

    it('throws on unexpected quote inside unquoted field', () => {
      const malformed = 'id,name\nM09-P01,Ali"ce';
      expect(() => parseRFC4180CSV(malformed)).toThrow(/Unexpected quote/);
    });
  });

  // ==========================================================================
  // 3. SCHEMA & DATASET VALIDATION
  // ==========================================================================
  describe('Dataset Validation & Foreign Keys', () => {
    it('validates required headers for all tables', () => {
      expect(() => validateHeaders('sessions', ['participant_id', 'status'])).toThrow(/missing required header/);
      expect(() => validateHeaders('unknown_table', [])).toThrow(/Unknown dataset/);
    });

    it('detects missing required fields and invalid enums', () => {
      // Synthetic test fixtures for validation testing only
      const mockSessions = [
        {
          participant_id: 'M09-P99', // Invalid format
          experience_group: 'Group X', // Invalid enum
          weekly_study_hours: -5, // Invalid negative
          device_context: 'Tablet', // Invalid device
          viewport_width: 200, // Invalid <320
          viewport_height: 300, // Invalid <480
          environment: 'Underwater', // Invalid env
          task_sequence: 'Seq Z', // Invalid seq
          consent_verified: 'false', // Must be true
          session_date: '2026-11-12',
          session_duration: 40,
          status: 'UnknownStatus',
        },
      ];
      const errors = validateDatasets({ sessions: mockSessions });
      expect(errors.length).toBeGreaterThan(5);
      expect(errors.some((e) => e.includes('Invalid participant_id'))).toBe(true);
      expect(errors.some((e) => e.includes('Invalid experience_group'))).toBe(true);
      expect(errors.some((e) => e.includes('Invalid device_context'))).toBe(true);
      expect(errors.some((e) => e.includes('consent_verified must be "true"'))).toBe(true);
    });

    it('detects duplicate participant IDs in sessions.csv and sus.csv', () => {
      const mockSessions = [
        {
          participant_id: 'M09-P01',
          experience_group: 'Group A',
          weekly_study_hours: 5,
          device_context: 'Laptop',
          viewport_width: 1280,
          viewport_height: 800,
          environment: 'Quiet',
          task_sequence: 'Seq A',
          consent_verified: 'true',
          session_date: '2026-11-12',
          session_duration: 45,
          status: 'Completed',
        },
        {
          participant_id: 'M09-P01', // Duplicate
          experience_group: 'Group A',
          weekly_study_hours: 5,
          device_context: 'Laptop',
          viewport_width: 1280,
          viewport_height: 800,
          environment: 'Quiet',
          task_sequence: 'Seq A',
          consent_verified: 'true',
          session_date: '2026-11-12',
          session_duration: 45,
          status: 'Completed',
        },
      ];
      const errors = validateDatasets({ sessions: mockSessions });
      expect(errors.some((e) => e.includes('Duplicate participant_id "M09-P01"'))).toBe(true);
    });

    it('detects foreign-key mismatches when tasks refer to non-existent participants', () => {
      const mockSessions = [
        {
          participant_id: 'M09-P01',
          experience_group: 'Group A',
          weekly_study_hours: 4,
          device_context: 'Laptop',
          viewport_width: 1280,
          viewport_height: 800,
          environment: 'Quiet',
          task_sequence: 'Seq A',
          consent_verified: 'true',
          session_date: '2026-11-12',
          session_duration: 40,
          status: 'Completed',
        },
      ];
      const mockTasks = [
        {
          participant_id: 'M09-P02', // Not in sessions
          task_id: 'T01',
          sequence_position: 1,
          start_time: '10:00:00',
          end_time: '10:01:30',
          duration_seconds: 90,
          outcome: 'Unassisted',
          assist_count: 0,
          err_crit: 0,
          err_non: 0,
          err_click: 0,
          err_nav: 0,
          err_model: 0,
          seq_score: 6,
        },
      ];
      const errors = validateDatasets({ sessions: mockSessions, tasks: mockTasks });
      expect(errors.some((e) => e.includes('Foreign-key error'))).toBe(true);
    });

    it('detects duplicate task attempts for the same participant and task', () => {
      const mockSessions = [{ participant_id: 'M09-P01', experience_group: 'Group A', weekly_study_hours: 4, device_context: 'Laptop', viewport_width: 1280, viewport_height: 800, environment: 'Quiet', task_sequence: 'Seq A', consent_verified: 'true', session_date: '2026-11-12', session_duration: 40, status: 'Completed' }];
      const mockTasks = [
        { participant_id: 'M09-P01', task_id: 'T01', sequence_position: 1, start_time: '10:00:00', end_time: '10:01:00', duration_seconds: 60, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
        { participant_id: 'M09-P01', task_id: 'T01', sequence_position: 2, start_time: '10:02:00', end_time: '10:03:00', duration_seconds: 60, outcome: 'Assisted', assist_count: 1, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 5 },
      ];
      const errors = validateDatasets({ sessions: mockSessions, tasks: mockTasks });
      expect(errors.some((e) => e.includes('Duplicate task entry'))).toBe(true);
    });

    it('rejects invalid task duration (e.g. non-numeric or > 300)', () => {
      const mockSessions = [{ participant_id: 'M09-P01', experience_group: 'Group A', weekly_study_hours: 4, device_context: 'Laptop', viewport_width: 1280, viewport_height: 800, environment: 'Quiet', task_sequence: 'Seq A', consent_verified: 'true', session_date: '2026-11-12', session_duration: 40, status: 'Completed' }];
      const mockTasks = [
        { participant_id: 'M09-P01', task_id: 'T01', sequence_position: 1, start_time: '10:00:00', end_time: '10:06:00', duration_seconds: 400, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
      ];
      const errors = validateDatasets({ sessions: mockSessions, tasks: mockTasks });
      expect(errors.some((e) => e.includes('duration_seconds must be a positive integer <= 300'))).toBe(true);
    });
  });

  // ==========================================================================
  // 4. SUS SCORING & NEUTRAL IMPUTATION
  // ==========================================================================
  describe('SUS Scoring Algorithm (Brooke 1996 with Imputation)', () => {
    it('calculates genuine SUS score of 100 for perfect responses (odd 5s, even 1s)', () => {
      const perfect = [5, 1, 5, 1, 5, 1, 5, 1, 5, 1];
      const res = calculateSUSScore(perfect);
      expect(res.score).toBe(100.0);
      expect(res.imputedCount).toBe(0);
    });

    it('preserves a genuine valid SUS score of 0 (odd 1s, even 5s)', () => {
      const worst = [1, 5, 1, 5, 1, 5, 1, 5, 1, 5];
      const res = calculateSUSScore(worst);
      expect(res.score).toBe(0.0);
      expect(res.imputedCount).toBe(0);
    });

    it('imputes accidentally blank items with neutral value 3 (contribution = 2)', () => {
      // 8 items provided (odd 4s, even 2s -> contributions: 3, 3); 2 items blank
      // Odd 4 gives (4 - 1) = 3
      // Even 2 gives (5 - 2) = 3
      // Blank gives 3 -> odd (3 - 1) = 2, even (5 - 3) = 2
      const partiallyBlank = [4, 2, '', 2, 4, '', 4, 2, 4, 2];
      const res = calculateSUSScore(partiallyBlank);
      expect(res.imputedCount).toBe(2);
      // Items 1, 5, 7, 9 (odd): 3 * 4 = 12
      // Item 3 (odd, blank): 3 - 1 = 2
      // Items 2, 4, 8, 10 (even): 3 * 4 = 12
      // Item 6 (even, blank): 5 - 3 = 2
      // Sum = 12 + 2 + 12 + 2 = 28 -> 28 * 2.5 = 70.0
      expect(res.score).toBe(70.0);
    });

    it('throws on invalid SUS rating outside 1–5', () => {
      const invalid = [4, 2, 6, 2, 4, 2, 4, 2, 4, 2]; // 6 is invalid
      expect(() => calculateSUSScore(invalid)).toThrow(/Invalid SUS rating/);
    });

    it('computes composite SUS summary and tracks total imputed items', () => {
      const mockRecords = [
        { sus_score: '85.0' },
        { q1: 4, q2: 2, q3: '', q4: 2, q5: 4, q6: '', q7: 4, q8: 2, q9: 4, q10: 2 }, // calculates 70.0 with 2 imputed
      ];
      const summary = calculateSUSSummary(mockRecords);
      expect(summary.count).toBe(2);
      expect(summary.mean).toBe(77.5);
      expect(summary.totalImputedItems).toBe(2);
      expect(summary.grade).toBe('B');
    });

    it('rejects invalid stored sus_score > 100', () => {
      const badRecords = [{ sus_score: '120.0' }];
      expect(() => calculateSUSSummary(badRecords)).toThrow(/between 0.0 and 100.0/);
    });

    it('calculates score when sus_score is blank but q1–q10 are complete', () => {
      const record = [{ q1: 5, q2: 1, q3: 5, q4: 1, q5: 5, q6: 1, q7: 5, q8: 1, q9: 5, q10: 1, sus_score: '' }];
      const summary = calculateSUSSummary(record);
      expect(summary.mean).toBe(100.0);
    });
  });

  // ==========================================================================
  // 5. EFFECTIVENESS, EFFICIENCY, ERRORS, & SEQ
  // ==========================================================================
  describe('Usability Metrics Calculations', () => {
    it('calculates completion rates strictly without treating unrecognized outcomes as failed', () => {
      const tasks = [
        { outcome: 'Unassisted' },
        { outcome: 'Assisted' },
        { outcome: 'Failed' },
      ];
      const res = calculateCompletionRates(tasks);
      expect(res.unassistedCount).toBe(1);
      expect(res.assistedCount).toBe(1);
      expect(res.failedCount).toBe(1);
      expect(res.overallCompletionRate).toBe(66.7);

      expect(() => calculateCompletionRates([{ outcome: 'InvalidOutcome' }])).toThrow(/Invalid outcome/);
    });

    it('calculates time on task omitting missing durations (never counts missing as zero)', () => {
      const tasks = [
        { duration_seconds: 60 },
        { duration_seconds: '' }, // missing duration
        { duration_seconds: 120 },
      ];
      const res = calculateTimeOnTask(tasks);
      expect(res.count).toBe(2); // Only 2 counted
      expect(res.mean).toBe(90);
      expect(res.min).toBe(60);
      expect(res.max).toBe(120);
    });

    it('summarizes errors across all 5 standard categories', () => {
      const tasks = [
        { err_crit: 1, err_non: 2, err_click: 3, err_nav: 1, err_model: 1 },
      ];
      const res = calculateErrorSummary(tasks);
      expect(res.critCount).toBe(1);
      expect(res.nonCount).toBe(2);
      expect(res.clickCount).toBe(3);
      expect(res.navCount).toBe(1);
      expect(res.modelCount).toBe(1);
      expect(res.totalErrors).toBe(8);
      expect(res.errorRatePerTask).toBe(8.0);
    });

    it('calculates SEQ stats and distribution', () => {
      const tasks = [
        { seq_score: 5 },
        { seq_score: 6 },
        { seq_score: 6 },
      ];
      const res = calculateSEQStats(tasks);
      expect(res.mean).toBe(5.67);
      expect(res.distribution[6]).toBe(2);
      expect(res.distribution[5]).toBe(1);
    });

    it('calculates per-task summary for T01 through T05', () => {
      const tasks = [
        { task_id: 'T01', outcome: 'Unassisted', duration_seconds: 50, seq_score: 6 },
        { task_id: 'T02', outcome: 'Assisted', duration_seconds: 70, seq_score: 5 },
      ];
      const summary = calculatePerTaskSummary(tasks);
      expect(summary.T01.completion.unassistedCount).toBe(1);
      expect(summary.T02.completion.assistedCount).toBe(1);
      expect(summary.T03.completion.attempted).toBe(0);
    });
  });

  // ==========================================================================
  // 6. CONTEXT STRATIFICATION & QUALITATIVE AGGREGATION
  // ==========================================================================
  describe('Context-Stratified Analysis & Qualitative Summary', () => {
    it('stratifies metrics by experience group, device, and environment', () => {
      const sessions = [
        { participant_id: 'M09-P01', experience_group: 'Group A', device_context: 'Laptop', environment: 'Quiet', status: 'Completed' },
        { participant_id: 'M09-P02', experience_group: 'Group B', device_context: 'Mobile', environment: 'Distracting', status: 'Completed' },
      ];
      const tasks = [
        { participant_id: 'M09-P01', task_id: 'T01', outcome: 'Unassisted', duration_seconds: 50, seq_score: 6 },
        { participant_id: 'M09-P02', task_id: 'T01', outcome: 'Assisted', duration_seconds: 80, seq_score: 5 },
      ];
      const sus = [
        { participant_id: 'M09-P01', sus_score: '85.0' },
        { participant_id: 'M09-P02', sus_score: '75.0' },
      ];

      const res = calculateContextStratification(sessions, tasks, sus);
      expect(res.byExperience['Group A (Frequent)'].participantCount).toBe(1);
      expect(res.byExperience['Group A (Frequent)'].sus.mean).toBe(85.0);
      expect(res.byDevice.Laptop.participantCount).toBe(1);
      expect(res.byDevice.Mobile.participantCount).toBe(1);
      expect(res.byEnvironment.Quiet.participantCount).toBe(1);
      expect(res.byEnvironment.Distracting.participantCount).toBe(1);
    });

    it('aggregates qualitative categories without exposing PII', () => {
      const feedback = [
        { theme_category: 'Discovery', sentiment: 'Positive', severity: 'Minor' },
        { theme_category: 'Discovery', sentiment: 'Critical', severity: 'Major' },
        { theme_category: 'Layout', sentiment: 'Neutral', severity: 'Cosmetic' },
      ];
      const res = calculateQualitativeSummary(feedback);
      expect(res.total).toBe(3);
      expect(res.byCategory.Discovery).toBe(2);
      expect(res.byCategory.Layout).toBe(1);
      expect(res.bySentiment.Positive).toBe(1);
      expect(res.bySeverity.Major).toBe(1);
    });
  });

  // ==========================================================================
  // 7. COMPLETION STATE CLASSIFICATION
  // ==========================================================================
  describe('Completion State Classification', () => {
    it('classifies empty dataset as PENDING_FIELDWORK', () => {
      expect(determineCompletionState([], [], [])).toBe('PENDING_FIELDWORK');
    });

    it('classifies partial dataset (<18 participants or <90 tasks) as PARTIAL_FIELDWORK', () => {
      const partialSessions = [{ participant_id: 'M09-P01', status: 'Completed' }];
      const partialTasks = [{ participant_id: 'M09-P01', task_id: 'T01', outcome: 'Unassisted' }];
      expect(determineCompletionState(partialSessions, partialTasks, [])).toBe('PARTIAL_FIELDWORK');
    });

    it('classifies full complete dataset as ANALYSIS_READY', () => {
      const fullSessions = Array.from({ length: 18 }, (_, i) => ({
        participant_id: `M09-P${String(i + 1).padStart(2, '0')}`,
        status: 'Completed',
      }));
      const fullTasks = Array.from({ length: 90 }, (_, i) => ({
        participant_id: `M09-P${String(Math.floor(i / 5) + 1).padStart(2, '0')}`,
        task_id: `T0${(i % 5) + 1}`,
        outcome: 'Unassisted',
      }));
      const fullSus = Array.from({ length: 18 }, (_, i) => ({
        participant_id: `M09-P${String(i + 1).padStart(2, '0')}`,
        sus_score: '85.0',
      }));
      expect(determineCompletionState(fullSessions, fullTasks, fullSus)).toBe('ANALYSIS_READY');
    });

    it('runAnalysis returns PENDING_FIELDWORK when research directory is empty', () => {
      const res = runAnalysis('private-research-data/module09/nonexistent_dir');
      expect(res.status).toBe('PENDING_FIELDWORK');
      expect(res.data).toBeNull();
    });
  });
});
