import { describe, it, expect } from 'vitest';
import {
  mean,
  median,
  stdDev,
  percentile,
  calculateIQR,
  parseStrictInteger,
  parseStrictFloat,
  isValidDate,
  isValidTime,
  parseRFC4180CSV,
  validateHeaders,
  validateDatasets,
  calculateCompletionRates,
  calculateTimeOnTask,
  calculateErrorSummary,
  calculateSEQStats,
  calculatePerTaskSummary,
  calculateSUSScore,
  getSUSGrade,
  calculateSUSSummary,
  calculateContextStratification,
  calculateQualitativeSummary,
  determineCompletionState,
  runAnalysis,
  PARTICIPANT_SEQUENCE_MAP,
  EXPECTED_SEQUENCES,
} from '../../scripts/analyze-module09.mjs';

describe('Module 09 Analysis Engine & Statistical Algorithms', () => {
  // ==========================================================================
  // 1. STATISTICAL HELPERS & PRECISION
  // ==========================================================================
  describe('Statistical Helpers & Precision', () => {
    it('calculates mean correctly and handles empty/singleton sets', () => {
      expect(mean([10, 20, 30])).toBe(20);
      expect(mean([])).toBe(0);
      expect(mean([5.5, 6.5])).toBe(6.0);
    });

    it('calculates median correctly for odd and even counts', () => {
      expect(median([10, 20, 30])).toBe(20);
      expect(median([10, 20, 30, 40])).toBe(25);
      expect(median([])).toBe(0);
    });

    it('calculates standard deviation using an unrounded mean internally', () => {
      // Array where rounded mean differs slightly from unrounded mean
      // Values: [10, 10, 11] -> unrounded mean = 10.33333..., rounded = 10.33
      // Variance with unrounded: sum((x - 10.3333...)^2)/2 = (0.1111 + 0.1111 + 0.4444)/2 = 0.3333... -> stdDev = 0.58
      const arr = [10, 10, 11];
      expect(stdDev(arr)).toBe(0.58);
      expect(stdDev([10, 10, 10])).toBe(0);
      expect(stdDev([10, 20])).toBe(7.07);
      expect(stdDev([5])).toBe(0);
      expect(stdDev([])).toBe(0);
    });

    it('calculates percentiles and IQR accurately', () => {
      const data = [10, 20, 30, 40, 50, 60, 70, 80];
      expect(percentile(data, 25)).toBe(27.5);
      expect(percentile(data, 75)).toBe(62.5);
      expect(calculateIQR(data)).toBe(35);
      expect(calculateIQR([50])).toBe(0);
      expect(calculateIQR([])).toBe(0);
    });

    it('strict integer and float parsers reject empty, whitespace, and non-numeric values', () => {
      expect(parseStrictInteger(42)).toBe(42);
      expect(parseStrictInteger('42')).toBe(42);
      expect(parseStrictInteger('-7')).toBe(-7);
      expect(parseStrictInteger('')).toBeNaN();
      expect(parseStrictInteger('   ')).toBeNaN();
      expect(parseStrictInteger('42.5')).toBeNaN();
      expect(parseStrictInteger('abc')).toBeNaN();

      expect(parseStrictFloat(3.14)).toBe(3.14);
      expect(parseStrictFloat('3.14')).toBe(3.14);
      expect(parseStrictFloat('')).toBeNaN();
      expect(parseStrictFloat('   ')).toBeNaN();
      expect(parseStrictFloat('xyz')).toBeNaN();
    });

    it('validates calendar dates strictly without allowing invalid dates', () => {
      expect(isValidDate('2026-11-12')).toBe(true);
      expect(isValidDate('2024-02-29')).toBe(true); // Leap year
      expect(isValidDate('2025-02-29')).toBe(false); // Not a leap year
      expect(isValidDate('2026-04-31')).toBe(false); // April has 30 days
      expect(isValidDate('2026-13-01')).toBe(false); // Invalid month
      expect(isValidDate('invalid-date')).toBe(false);
      expect(isValidDate('')).toBe(false);
    });

    it('validates 24-hr timestamps strictly', () => {
      expect(isValidTime('14:30:00')).toBe(true);
      expect(isValidTime('00:00:00')).toBe(true);
      expect(isValidTime('23:59:59')).toBe(true);
      expect(isValidTime('24:00:00')).toBe(false);
      expect(isValidTime('12:60:00')).toBe(false);
      expect(isValidTime('12:00:60')).toBe(false);
      expect(isValidTime('9:00:00')).toBe(false);
      expect(isValidTime('')).toBe(false);
    });
  });

  // ==========================================================================
  // 2. HARDENED RFC 4180 COMPLIANT CSV PARSER
  // ==========================================================================
  describe('parseRFC4180CSV Hardened Parser', () => {
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

    it('rejects characters following closing quote other than comma, line ending, or EOF', () => {
      const badCsv = 'id,name\nM09-P01,"Alice"trailingText,Learner';
      expect(() => parseRFC4180CSV(badCsv)).toThrow(/Unexpected character "t" following closing quote/);
    });

    it('strips UTF-8 BOM if present at the start of CSV', () => {
      const bomCsv = '\uFEFFid,name\nM09-P01,Alice';
      const { headers, rows } = parseRFC4180CSV(bomCsv);
      expect(headers[0]).toBe('id');
      expect(rows[0].id).toBe('M09-P01');
    });

    it('detects and rejects duplicate headers in CSV', () => {
      const dupCsv = 'id,name,id\nM09-P01,Alice,extra';
      expect(() => parseRFC4180CSV(dupCsv)).toThrow(/Duplicate header "id" detected/);
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

    it('safely handles empty trailing lines without creating spurious records', () => {
      const trailingCsv = 'id,name\nM09-P01,Alice\n\n\n';
      const { rows } = parseRFC4180CSV(trailingCsv);
      expect(rows.length).toBe(1);
      expect(rows[0].id).toBe('M09-P01');
    });
  });

  // ==========================================================================
  // 3. COMPLETE SCHEMA & RELATIONAL DATASET VALIDATION
  // ==========================================================================
  describe('Dataset Schema & Relational Validation', () => {
    it('validates required headers for all tables', () => {
      expect(() => validateHeaders('sessions', ['participant_id', 'status'])).toThrow(/missing required header/);
      expect(() => validateHeaders('unknown_table', [])).toThrow(/Unknown dataset/);
    });

    it('detects missing required fields, invalid enums, and bounds in sessions.csv', () => {
      const mockSessions = [
        {
          participant_id: 'M09-P99', // Invalid format
          experience_group: 'Group X', // Invalid enum
          weekly_study_hours: '   ', // Whitespace-only numeric field
          device_context: 'Tablet', // Invalid device
          viewport_width: '200', // Invalid <320
          viewport_height: '3000', // Invalid >2160
          environment: 'Underwater', // Invalid env
          task_sequence: 'Seq Z', // Invalid seq
          consent_verified: 'false', // Must be true
          session_date: '2026-02-30', // Invalid date
          session_duration: '-10', // Negative duration
          status: 'UnknownStatus',
        },
      ];
      const errors = validateDatasets({ sessions: mockSessions });
      expect(errors.length).toBeGreaterThan(6);
      expect(errors.some((e) => e.includes('Invalid participant_id'))).toBe(true);
      expect(errors.some((e) => e.includes('Invalid experience_group'))).toBe(true);
      expect(errors.some((e) => e.includes('weekly_study_hours must be a finite non-negative number'))).toBe(true);
      expect(errors.some((e) => e.includes('viewport_width must be an integer between 320 and 3840'))).toBe(true);
      expect(errors.some((e) => e.includes('viewport_height must be an integer between 480 and 2160'))).toBe(true);
      expect(errors.some((e) => e.includes('session_date'))).toBe(true);
    });

    it('enforces unconditional foreign-key validation even when sessions.csv has zero rows', () => {
      const mockTasks = [
        {
          participant_id: 'M09-P01',
          task_id: 'T01',
          sequence_position: 1,
          start_time: '10:00:00',
          end_time: '10:01:00',
          duration_seconds: 60,
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
      // Zero sessions provided! Foreign key must fail unconditionally!
      const errors = validateDatasets({ sessions: [], tasks: mockTasks });
      expect(errors.some((e) => e.includes('Foreign-key error. Participant "M09-P01" does not exist in sessions.csv.'))).toBe(true);
    });

    it('validates qualitative feedback records thoroughly (format, foreign keys, required text)', () => {
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
      ];
      const mockQual = [
        {
          feedback_id: 'INVALID_ID', // bad format
          participant_id: 'M09-P02', // missing FK
          task_id: 'T99', // bad task
          theme_category: 'BadCategory',
          sentiment: 'BadSentiment',
          severity: 'BadSeverity',
          verbatim_quote: '   ', // empty
          suggested_action: '', // empty
        },
      ];
      const errors = validateDatasets({ sessions: mockSessions, qualitative: mockQual });
      expect(errors.some((e) => e.includes('Invalid feedback_id'))).toBe(true);
      expect(errors.some((e) => e.includes('Foreign-key error'))).toBe(true);
      expect(errors.some((e) => e.includes('Invalid task_id'))).toBe(true);
      expect(errors.some((e) => e.includes('verbatim_quote is missing or empty'))).toBe(true);
      expect(errors.some((e) => e.includes('suggested_action is missing or empty'))).toBe(true);
    });
  });

  // ==========================================================================
  // 4. COUNTERBALANCED TASK SEQUENCE VERIFICATION
  // ==========================================================================
  describe('Counterbalanced Task Sequence Verification', () => {
    it('defines valid assigned sequence mappings for all 18 participants and 5 cyclic sequence patterns', () => {
      expect(Object.keys(PARTICIPANT_SEQUENCE_MAP).length).toBe(18);
      expect(PARTICIPANT_SEQUENCE_MAP['M09-P01']).toBe('Seq A');
      expect(PARTICIPANT_SEQUENCE_MAP['M09-P18']).toBe('Seq C');
      expect(EXPECTED_SEQUENCES['Seq A']).toEqual(['T01', 'T02', 'T03', 'T04', 'T05']);
      expect(EXPECTED_SEQUENCES['Seq E']).toEqual(['T05', 'T01', 'T02', 'T03', 'T04']);
    });

    it('verifies that valid assigned sequence matches without errors', () => {
      // M09-P01 is assigned Sequence A: T01 -> T02 -> T03 -> T04 -> T05
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
      ];
      const mockTasks = [
        { participant_id: 'M09-P01', task_id: 'T01', sequence_position: 1, start_time: '10:00:00', end_time: '10:01:00', duration_seconds: 60, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
        { participant_id: 'M09-P01', task_id: 'T02', sequence_position: 2, start_time: '10:02:00', end_time: '10:03:00', duration_seconds: 60, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
        { participant_id: 'M09-P01', task_id: 'T03', sequence_position: 3, start_time: '10:04:00', end_time: '10:05:00', duration_seconds: 60, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
        { participant_id: 'M09-P01', task_id: 'T04', sequence_position: 4, start_time: '10:06:00', end_time: '10:07:00', duration_seconds: 60, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
        { participant_id: 'M09-P01', task_id: 'T05', sequence_position: 5, start_time: '10:08:00', end_time: '10:09:00', duration_seconds: 60, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
      ];
      const errors = validateDatasets({ sessions: mockSessions, tasks: mockTasks });
      expect(errors).toEqual([]);
    });

    it('rejects sequence position mismatch when task order violates assigned Latin-Square sequence', () => {
      // M09-P01 is assigned Sequence A: position 2 MUST be T02, not T03!
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
      ];
      const mockTasks = [
        { participant_id: 'M09-P01', task_id: 'T01', sequence_position: 1, start_time: '10:00:00', end_time: '10:01:00', duration_seconds: 60, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
        { participant_id: 'M09-P01', task_id: 'T03', sequence_position: 2, start_time: '10:02:00', end_time: '10:03:00', duration_seconds: 60, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
      ];
      const errors = validateDatasets({ sessions: mockSessions, tasks: mockTasks });
      expect(errors.some((e) => e.includes('Counterbalanced sequence mismatch. In Seq A, position 2 must be T02, received "T03"'))).toBe(true);
    });

    it('rejects duplicate sequence_position for the same participant', () => {
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
      ];
      const mockTasks = [
        { participant_id: 'M09-P01', task_id: 'T01', sequence_position: 1, start_time: '10:00:00', end_time: '10:01:00', duration_seconds: 60, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
        { participant_id: 'M09-P01', task_id: 'T02', sequence_position: 1, start_time: '10:02:00', end_time: '10:03:00', duration_seconds: 60, outcome: 'Unassisted', assist_count: 0, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, seq_score: 6 },
      ];
      const errors = validateDatasets({ sessions: mockSessions, tasks: mockTasks });
      expect(errors.some((e) => e.includes('Duplicate sequence_position 1'))).toBe(true);
    });
  });

  // ==========================================================================
  // 5. SUS SCORING, INCOMPLETE RESPONSE RULES, & BENCHMARKS
  // ==========================================================================
  describe('SUS Scoring, Neutral Imputation & Incomplete Handling', () => {
    it('calculates genuine SUS score of 100 for perfect responses (odd 5s, even 1s)', () => {
      const perfect = [5, 1, 5, 1, 5, 1, 5, 1, 5, 1];
      const res = calculateSUSScore(perfect);
      expect(res.score).toBe(100.0);
      expect(res.imputedCount).toBe(0);
      expect(res.blankCount).toBe(0);
    });

    it('preserves a genuine valid SUS score of 0 (odd 1s, even 5s)', () => {
      const worst = [1, 5, 1, 5, 1, 5, 1, 5, 1, 5];
      const res = calculateSUSScore(worst);
      expect(res.score).toBe(0.0);
      expect(res.imputedCount).toBe(0);
      expect(res.blankCount).toBe(0);
    });

    it('allows exactly one blank answer and imputes with neutral value 3', () => {
      // 9 items answered (odd 4s, even 2s -> contributions: 3, 3); 1 item blank
      // Item 3 (odd, blank): 3 - 1 = 2
      // 8 normal items: 8 * 3 = 24; plus 1 normal odd item (q9=4 -> 3): total normal = 27
      // Imputed odd item (q3): contribution = 2. Total = 29. 29 * 2.5 = 72.5
      const oneBlank = [4, 2, '', 2, 4, 2, 4, 2, 4, 2];
      const res = calculateSUSScore(oneBlank);
      expect(res.imputedCount).toBe(1);
      expect(res.blankCount).toBe(1);
      expect(res.score).toBe(72.5);
    });

    it('rejects multiple blank answers as excessive missing responses', () => {
      const twoBlanks = [4, 2, '', 2, 4, '', 4, 2, 4, 2];
      expect(() => calculateSUSScore(twoBlanks)).toThrow(/Maximum permitted blank items for neutral imputation is 1/);
    });

    it('rejects ten blank answers and does not produce a score', () => {
      const tenBlanks = ['', '', '', '', '', '', '', '', '', ''];
      expect(() => calculateSUSScore(tenBlanks)).toThrow(/All 10 items are blank. Completely blank questionnaires cannot produce a score/);
    });

    it('accepts stored composite score matching answers within 0.1 tolerance', () => {
      const records = [
        { q1: 5, q2: 1, q3: 5, q4: 1, q5: 5, q6: 1, q7: 5, q8: 1, q9: 5, q10: 1, sus_score: '100.0' },
      ];
      const summary = calculateSUSSummary(records);
      expect(summary.count).toBe(1);
      expect(summary.mean).toBe(100.0);
      expect(summary.grade).toBe('A+');
    });

    it('rejects stored composite score that disagrees with item answers', () => {
      // q1-q10 produce 100.0, but stored score claims 50.0!
      const records = [
        { participant_id: 'M09-P01', q1: 5, q2: 1, q3: 5, q4: 1, q5: 5, q6: 1, q7: 5, q8: 1, q9: 5, q10: 1, sus_score: '50.0' },
      ];
      expect(() => calculateSUSSummary(records)).toThrow(/Stored sus_score \(50\) disagrees with calculated score \(100\)/);
    });

    it('treats whitespace-only composite score as blank and calculates from items', () => {
      const records = [
        { q1: 5, q2: 1, q3: 5, q4: 1, q5: 5, q6: 1, q7: 5, q8: 1, q9: 5, q10: 1, sus_score: '   ' },
      ];
      const summary = calculateSUSSummary(records);
      expect(summary.count).toBe(1);
      expect(summary.mean).toBe(100.0);
    });

    it('excludes incomplete questionnaires from SUS sample size count', () => {
      const records = [
        { q1: 5, q2: 1, q3: 5, q4: 1, q5: 5, q6: 1, q7: 5, q8: 1, q9: 5, q10: 1, sus_score: '100.0' },
        { q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '', sus_score: '' }, // Incomplete
      ];
      const summary = calculateSUSSummary(records);
      expect(summary.count).toBe(1); // Incomplete excluded from count!
      expect(summary.excludedCount).toBe(1);
      expect(summary.mean).toBe(100.0);
    });

    it('determines correct Sauro-Lewis curved grades and distinguishes Grade A cutoff 80.3 from 80.0', () => {
      expect(getSUSGrade(92.0)).toBe('A+');
      expect(getSUSGrade(80.5)).toBe('A');
      expect(getSUSGrade(80.3)).toBe('A');
      expect(getSUSGrade(80.0)).toBe('B'); // 80.0 is Grade B / project benchmark boundary!
      expect(getSUSGrade(74.1)).toBe('B');
      expect(getSUSGrade(70.0)).toBe('C');
      expect(getSUSGrade(55.0)).toBe('D');
      expect(getSUSGrade(45.0)).toBe('F');
    });
  });

  // ==========================================================================
  // 6. EFFECTIVENESS, EFFICIENCY, ERRORS, & SEQ METRICS
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

    it('calculates time on task omitting missing durations and preserves valid 0s', () => {
      const tasks = [
        { duration_seconds: 60 },
        { duration_seconds: '' }, // missing duration omitted
        { duration_seconds: '   ' }, // whitespace duration omitted
        { duration_seconds: 0 }, // valid instant abort/finish included
        { duration_seconds: 120 },
      ];
      const res = calculateTimeOnTask(tasks);
      expect(res.count).toBe(3); // 60, 0, 120
      expect(res.min).toBe(0);
      expect(res.max).toBe(120);
      expect(res.mean).toBe(60);
    });

    it('summarizes errors across all 5 standard categories and throws on invalid numbers', () => {
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

      expect(() => calculateErrorSummary([{ err_crit: 'notANumber' }])).toThrow(/Invalid error count/);
    });

    it('calculates SEQ stats and distribution, throwing on invalid ratings', () => {
      const tasks = [
        { seq_score: 5 },
        { seq_score: 6 },
        { seq_score: 6 },
      ];
      const res = calculateSEQStats(tasks);
      expect(res.mean).toBe(5.67);
      expect(res.distribution[6]).toBe(2);
      expect(res.distribution[5]).toBe(1);

      expect(() => calculateSEQStats([{ seq_score: 8 }])).toThrow(/Invalid SEQ rating/);
      expect(() => calculateSEQStats([{ seq_score: 0 }])).toThrow(/Invalid SEQ rating/);
    });

    it('calculates per-task summary for T01 through T05', () => {
      const tasks = [
        { task_id: 'T01', outcome: 'Unassisted', duration_seconds: 50, seq_score: 6, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, assist_count: 0 },
        { task_id: 'T02', outcome: 'Assisted', duration_seconds: 70, seq_score: 5, err_crit: 0, err_non: 1, err_click: 0, err_nav: 0, err_model: 0, assist_count: 1 },
      ];
      const summary = calculatePerTaskSummary(tasks);
      expect(summary.T01.completion.unassistedCount).toBe(1);
      expect(summary.T02.completion.assistedCount).toBe(1);
      expect(summary.T03.completion.attempted).toBe(0);
    });
  });

  // ==========================================================================
  // 7. CONTEXT STRATIFICATION & SAFE AGGREGATE OUTPUT
  // ==========================================================================
  describe('Context-Stratified Analysis & Qualitative Privacy', () => {
    it('stratifies metrics descriptively by experience group, device, and environment', () => {
      const sessions = [
        { participant_id: 'M09-P01', experience_group: 'Group A', device_context: 'Laptop', environment: 'Quiet', status: 'Completed' },
        { participant_id: 'M09-P02', experience_group: 'Group B', device_context: 'Mobile', environment: 'Distracting', status: 'Completed' },
      ];
      const tasks = [
        { participant_id: 'M09-P01', task_id: 'T01', outcome: 'Unassisted', duration_seconds: 50, seq_score: 6, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, assist_count: 0 },
        { participant_id: 'M09-P02', task_id: 'T01', outcome: 'Assisted', duration_seconds: 80, seq_score: 5, err_crit: 0, err_non: 0, err_click: 0, err_nav: 0, err_model: 0, assist_count: 0 },
      ];
      const sus = [
        { participant_id: 'M09-P01', sus_score: '80.0', q1: 5, q2: 1, q3: 4, q4: 2, q5: 4, q6: 2, q7: 4, q8: 2, q9: 4, q10: 2 },
        { participant_id: 'M09-P02', sus_score: '75.0', q1: 4, q2: 2, q3: 4, q4: 2, q5: 4, q6: 2, q7: 4, q8: 2, q9: 4, q10: 2 },
      ];

      const res = calculateContextStratification(sessions, tasks, sus);
      expect(res.byExperience['Group A (Frequent)'].participantCount).toBe(1);
      expect(res.byExperience['Group A (Frequent)'].sus.mean).toBe(80.0);
      expect(res.byDevice.Laptop.participantCount).toBe(1);
      expect(res.byDevice.Mobile.participantCount).toBe(1);
      expect(res.byEnvironment.Quiet.participantCount).toBe(1);
      expect(res.byEnvironment.Distracting.participantCount).toBe(1);
    });

    it('aggregates qualitative categories without exposing PII or raw quotes', () => {
      const feedback = [
        { feedback_id: 'FDB-001', participant_id: 'M09-P01', theme_category: 'Discovery', sentiment: 'Positive', severity: 'Minor', verbatim_quote: 'Secret Quote 1' },
        { feedback_id: 'FDB-002', participant_id: 'M09-P01', theme_category: 'Discovery', sentiment: 'Critical', severity: 'Major', verbatim_quote: 'Secret Quote 2' },
        { feedback_id: 'FDB-003', participant_id: 'M09-P02', theme_category: 'Layout', sentiment: 'Neutral', severity: 'Cosmetic', verbatim_quote: 'Secret Quote 3' },
      ];
      const res = calculateQualitativeSummary(feedback);
      expect(res.total).toBe(3);
      expect(res.byCategory.Discovery).toBe(2);
      expect(res.byCategory.Layout).toBe(1);
      expect(res.bySentiment.Positive).toBe(1);
      expect(res.bySeverity.Major).toBe(1);
      // Ensure raw quotes are never embedded in the summary object
      expect(JSON.stringify(res).includes('Secret Quote')).toBe(false);
    });
  });

  // ==========================================================================
  // 8. COMPLETION STATE CLASSIFICATION
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

    it('classifies full complete dataset as ANALYSIS_READY only when all 18 participants have 5 tasks', () => {
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
