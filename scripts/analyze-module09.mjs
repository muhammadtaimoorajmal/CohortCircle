#!/usr/bin/env node
/**
 * CohortCircle Module 09 Summative Usability Analysis Engine
 *
 * Implements RFC 4180 compliant CSV parsing, comprehensive relational dataset
 * validation across all four research tables (sessions, tasks, sus, qualitative),
 * completion state classification, and statistical usability metrics:
 * - Global & per-task unassisted/assisted/failed completion rates
 * - Time-on-task metrics (mean, median, min, max, std dev) omitting missing records
 * - Error distributions across 5 standardized categories
 * - Per-task Single Ease Question (SEQ) stats & rating distributions
 * - System Usability Scale (SUS) with neutral-imputation for blanks, IQR, and grading
 * - Context-stratified comparative breakdowns (experience, device, environment)
 * - Safe aggregate qualitative counts without exposing PII
 *
 * Strictly local-only, zero network dependencies, zero PII disclosure.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// ============================================================================
// 1. STATISTICAL HELPER FUNCTIONS
// ============================================================================

export function mean(arr) {
  if (!arr || arr.length === 0) return 0;
  const valid = arr.map(Number).filter((v) => !isNaN(v));
  if (valid.length === 0) return 0;
  const sum = valid.reduce((acc, val) => acc + val, 0);
  return Number((sum / valid.length).toFixed(2));
}

export function median(arr) {
  if (!arr || arr.length === 0) return 0;
  const sorted = arr.map(Number).filter((v) => !isNaN(v)).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
  }
  return Number(sorted[mid].toFixed(2));
}

export function stdDev(arr) {
  if (!arr || arr.length <= 1) return 0;
  const valid = arr.map(Number).filter((v) => !isNaN(v));
  if (valid.length <= 1) return 0;
  const avg = mean(valid);
  const variance = valid.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / (valid.length - 1);
  return Number(Math.sqrt(variance).toFixed(2));
}

export function percentile(arr, p) {
  if (!arr || arr.length === 0) return 0;
  const sorted = arr.map(Number).filter((v) => !isNaN(v)).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  if (sorted.length === 1) return Number(sorted[0].toFixed(2));
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  if (lower === upper) return Number(sorted[lower].toFixed(2));
  const val = sorted[lower] * (1 - weight) + sorted[upper] * weight;
  return Number(val.toFixed(2));
}

export function calculateIQR(arr) {
  if (!arr || arr.length <= 1) return 0;
  const q1 = percentile(arr, 25);
  const q3 = percentile(arr, 75);
  return Number((q3 - q1).toFixed(2));
}

// ============================================================================
// 2. RFC 4180 COMPLIANT CSV PARSER
// ============================================================================

/**
 * Parses RFC 4180 compliant CSV string into headers and array of row objects.
 * Supports quoted fields, embedded commas, escaped quotes (""), CRLF/LF,
 * embedded line breaks in quoted fields, and strict malformed row detection.
 */
export function parseRFC4180CSV(text) {
  if (typeof text !== 'string') {
    throw new Error('CSV input must be a string');
  }

  if (text.trim().length === 0) {
    return { headers: [], rows: [] };
  }

  const rawRows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  let i = 0;
  const len = text.length;

  while (i < len) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < len && text[i + 1] === '"') {
          // Escaped double quote
          currentField += '"';
          i += 2;
        } else {
          // End of quoted field
          inQuotes = false;
          i++;
        }
      } else {
        // Any character inside quotes (including \n, \r, commas)
        currentField += char;
        i++;
      }
    } else {
      if (char === '"') {
        if (currentField.length === 0) {
          inQuotes = true;
          i++;
        } else {
          throw new Error(`Malformed CSV: Unexpected quote inside unquoted field at index ${i}`);
        }
      } else if (char === ',') {
        currentRow.push(currentField);
        currentField = '';
        i++;
      } else if (char === '\r') {
        if (i + 1 < len && text[i + 1] === '\n') {
          i++; // Skip \n of CRLF
        }
        currentRow.push(currentField);
        rawRows.push(currentRow);
        currentRow = [];
        currentField = '';
        i++;
      } else if (char === '\n') {
        currentRow.push(currentField);
        rawRows.push(currentRow);
        currentRow = [];
        currentField = '';
        i++;
      } else {
        currentField += char;
        i++;
      }
    }
  }

  if (inQuotes) {
    throw new Error('Malformed CSV: Unclosed quote detected at end of file');
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    rawRows.push(currentRow);
  }

  // Remove empty trailing line if present
  const validRows = rawRows.filter((r, idx) => {
    if (r.length === 1 && r[0].trim() === '' && idx === rawRows.length - 1) {
      return false;
    }
    return true;
  });

  if (validRows.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = validRows[0].map((h) => h.trim());
  const headerCount = headers.length;
  const records = [];

  for (let rIdx = 1; rIdx < validRows.length; rIdx++) {
    const row = validRows[rIdx];
    // Skip empty lines in between
    if (row.length === 1 && row[0].trim() === '') continue;

    if (row.length !== headerCount) {
      throw new Error(`Malformed CSV: Row ${rIdx + 1} has ${row.length} columns, expected ${headerCount}`);
    }

    const record = {};
    for (let cIdx = 0; cIdx < headerCount; cIdx++) {
      record[headers[cIdx]] = row[cIdx];
    }
    records.push(record);
  }

  return { headers, rows: records };
}

// Backward-compatible alias
export function parseCSV(content) {
  return parseRFC4180CSV(content).rows;
}

// ============================================================================
// 3. DATASET VALIDATION (SCHEMAS, RANGES, ENUMS, & FOREIGN KEYS)
// ============================================================================

const REQUIRED_HEADERS = {
  sessions: [
    'participant_id', 'experience_group', 'weekly_study_hours',
    'device_context', 'viewport_width', 'viewport_height',
    'environment', 'task_sequence', 'consent_verified',
    'session_date', 'session_duration', 'status',
  ],
  tasks: [
    'participant_id', 'task_id', 'sequence_position',
    'start_time', 'end_time', 'duration_seconds',
    'outcome', 'assist_count', 'err_crit', 'err_non',
    'err_click', 'err_nav', 'err_model', 'seq_score',
  ],
  sus: [
    'participant_id', 'q1', 'q2', 'q3', 'q4', 'q5',
    'q6', 'q7', 'q8', 'q9', 'q10', 'sus_score',
  ],
  qualitative: [
    'feedback_id', 'participant_id', 'task_id',
    'theme_category', 'sentiment', 'verbatim_quote',
    'severity', 'suggested_action',
  ],
};

const VALID_ENUMS = {
  experience_group: ['Group A', 'Group B', 'Group C'],
  device_context: ['Laptop', 'Mobile'],
  environment: ['Quiet', 'Distracting'],
  task_sequence: ['Seq A', 'Seq B', 'Seq C', 'Seq D', 'Seq E'],
  session_status: ['Completed', 'Partial', 'Terminated'],
  task_id: ['T01', 'T02', 'T03', 'T04', 'T05'],
  outcome: ['Unassisted', 'Assisted', 'Failed'],
  theme_category: ['Discovery', 'Compatibility', 'Governance', 'Scheduling', 'Layout'],
  sentiment: ['Positive', 'Neutral', 'Critical'],
  severity: ['Critical', 'Major', 'Minor', 'Cosmetic'],
};

const PARTICIPANT_ID_REGEX = /^M09-P(0[1-9]|1[0-8])$/;

/**
 * Validates raw headers of a dataset against required fields.
 */
export function validateHeaders(tableName, actualHeaders) {
  const expected = REQUIRED_HEADERS[tableName];
  if (!expected) {
    throw new Error(`Unknown dataset table name: "${tableName}"`);
  }
  const missing = expected.filter((h) => !actualHeaders.includes(h));
  if (missing.length > 0) {
    throw new Error(`Dataset "${tableName}.csv" is missing required header(s): ${missing.join(', ')}`);
  }
}

/**
 * Validates all 4 research datasets and their relational consistency.
 * Returns an array of diagnostic error strings (empty if valid).
 */
export function validateDatasets({ sessions = [], tasks = [], sus = [], qualitative = [] } = {}) {
  const errors = [];
  const sessionParticipantIds = new Set();

  // 1. Validate sessions.csv
  for (let idx = 0; idx < sessions.length; idx++) {
    const s = sessions[idx];
    const pid = String(s.participant_id || '').trim();

    if (!PARTICIPANT_ID_REGEX.test(pid)) {
      errors.push(`sessions.csv row ${idx + 2}: Invalid participant_id "${pid}". Must match M09-P01 to M09-P18.`);
    } else if (sessionParticipantIds.has(pid)) {
      errors.push(`sessions.csv row ${idx + 2}: Duplicate participant_id "${pid}".`);
    } else {
      sessionParticipantIds.add(pid);
    }

    if (!VALID_ENUMS.experience_group.includes(s.experience_group)) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): Invalid experience_group "${s.experience_group}". Must be Group A, Group B, or Group C.`);
    }

    if (!VALID_ENUMS.device_context.includes(s.device_context)) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): Invalid device_context "${s.device_context}". Must be Laptop or Mobile.`);
    }

    if (!VALID_ENUMS.environment.includes(s.environment)) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): Invalid environment "${s.environment}". Must be Quiet or Distracting.`);
    }

    if (!VALID_ENUMS.task_sequence.includes(s.task_sequence)) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): Invalid task_sequence "${s.task_sequence}". Must be Seq A through Seq E.`);
    }

    if (String(s.consent_verified).trim().toLowerCase() !== 'true') {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): consent_verified must be "true".`);
    }

    const hours = Number(s.weekly_study_hours);
    if (isNaN(hours) || hours < 0) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): weekly_study_hours must be a non-negative number.`);
    }

    const width = Number(s.viewport_width);
    if (isNaN(width) || width < 320) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): viewport_width must be an integer >= 320.`);
    }

    const height = Number(s.viewport_height);
    if (isNaN(height) || height < 480) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): viewport_height must be an integer >= 480.`);
    }

    if (!VALID_ENUMS.session_status.includes(s.status)) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): Invalid status "${s.status}". Must be Completed, Partial, or Terminated.`);
    }
  }

  // 2. Validate tasks.csv
  const taskPairs = new Set();
  for (let idx = 0; idx < tasks.length; idx++) {
    const t = tasks[idx];
    const pid = String(t.participant_id || '').trim();
    const tid = String(t.task_id || '').trim();

    if (!PARTICIPANT_ID_REGEX.test(pid)) {
      errors.push(`tasks.csv row ${idx + 2}: Invalid participant_id "${pid}".`);
    } else if (sessionParticipantIds.size > 0 && !sessionParticipantIds.has(pid)) {
      errors.push(`tasks.csv row ${idx + 2}: Foreign-key error. Participant "${pid}" does not exist in sessions.csv.`);
    }

    if (!VALID_ENUMS.task_id.includes(tid)) {
      errors.push(`tasks.csv row ${idx + 2} (${pid}): Invalid task_id "${tid}". Must be T01–T05.`);
    }

    const pairKey = `${pid}_${tid}`;
    if (taskPairs.has(pairKey)) {
      errors.push(`tasks.csv row ${idx + 2}: Duplicate task entry for participant "${pid}" on task "${tid}".`);
    } else {
      taskPairs.add(pairKey);
    }

    if (!VALID_ENUMS.outcome.includes(t.outcome)) {
      errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): Invalid outcome "${t.outcome}". Must be Unassisted, Assisted, or Failed.`);
    }

    const rawDuration = t.duration_seconds;
    if (rawDuration !== '' && rawDuration !== undefined && rawDuration !== null) {
      const dur = Number(rawDuration);
      if (isNaN(dur) || dur < 0 || dur > 300) {
        errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): duration_seconds must be a positive integer <= 300, received "${rawDuration}".`);
      }
    }

    const seq = Number(t.seq_score);
    if (isNaN(seq) || seq < 1 || seq > 7 || !Number.isInteger(seq)) {
      errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): seq_score must be an integer between 1 and 7, received "${t.seq_score}".`);
    }

    const errFields = ['err_crit', 'err_non', 'err_click', 'err_nav', 'err_model', 'assist_count'];
    for (const f of errFields) {
      const val = Number(t[f]);
      if (isNaN(val) || val < 0 || !Number.isInteger(val)) {
        errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): ${f} must be a non-negative integer, received "${t[f]}".`);
      }
    }
  }

  // 3. Validate sus.csv
  const susParticipantIds = new Set();
  for (let idx = 0; idx < sus.length; idx++) {
    const s = sus[idx];
    const pid = String(s.participant_id || '').trim();

    if (!PARTICIPANT_ID_REGEX.test(pid)) {
      errors.push(`sus.csv row ${idx + 2}: Invalid participant_id "${pid}".`);
    } else if (sessionParticipantIds.size > 0 && !sessionParticipantIds.has(pid)) {
      errors.push(`sus.csv row ${idx + 2}: Foreign-key error. Participant "${pid}" does not exist in sessions.csv.`);
    }

    if (susParticipantIds.has(pid)) {
      errors.push(`sus.csv row ${idx + 2}: Duplicate participant_id "${pid}" in sus.csv.`);
    } else {
      susParticipantIds.add(pid);
    }

    for (let q = 1; q <= 10; q++) {
      const val = s[`q${q}`];
      if (val !== '' && val !== undefined && val !== null) {
        const num = Number(val);
        if (isNaN(num) || num < 1 || num > 5 || !Number.isInteger(num)) {
          errors.push(`sus.csv row ${idx + 2} (${pid}): q${q} must be integer 1–5 or blank for neutral imputation, received "${val}".`);
        }
      }
    }

    const rawSus = s.sus_score;
    if (rawSus !== '' && rawSus !== undefined && rawSus !== null) {
      const parsed = Number(rawSus);
      if (isNaN(parsed) || parsed < 0 || parsed > 100) {
        errors.push(`sus.csv row ${idx + 2} (${pid}): sus_score must be between 0.0 and 100.0, received "${rawSus}".`);
      }
    }
  }

  // 4. Validate qualitative.csv
  for (let idx = 0; idx < qualitative.length; idx++) {
    const q = qualitative[idx];
    const pid = String(q.participant_id || '').trim();

    if (sessionParticipantIds.size > 0 && !sessionParticipantIds.has(pid)) {
      errors.push(`qualitative.csv row ${idx + 2}: Foreign-key error. Participant "${pid}" does not exist in sessions.csv.`);
    }

    if (!VALID_ENUMS.theme_category.includes(q.theme_category)) {
      errors.push(`qualitative.csv row ${idx + 2}: Invalid theme_category "${q.theme_category}".`);
    }

    if (!VALID_ENUMS.sentiment.includes(q.sentiment)) {
      errors.push(`qualitative.csv row ${idx + 2}: Invalid sentiment "${q.sentiment}".`);
    }

    if (!VALID_ENUMS.severity.includes(q.severity)) {
      errors.push(`qualitative.csv row ${idx + 2}: Invalid severity "${q.severity}".`);
    }
  }

  return errors;
}

// ============================================================================
// 4. SUS SCORING WITH DOCUMENTED NEUTRAL IMPUTATION (BROOKE 1996)
// ============================================================================

/**
 * Computes individual SUS score for 10 items.
 * If an item is blank/empty, it is imputed with neutral value 3 (contribution = 2)
 * per the documented questionnaire policy.
 * Returns { score, imputedCount }.
 */
export function calculateSUSScore(ratings) {
  if (!ratings || ratings.length < 10) {
    throw new Error('SUS ratings array must contain exactly 10 items');
  }

  let contributionSum = 0;
  let imputedCount = 0;

  for (let i = 0; i < 10; i++) {
    const rawVal = ratings[i];
    let num;

    if (rawVal === '' || rawVal === null || rawVal === undefined) {
      // Documented policy: accidentally blank item imputed with neutral value 3
      num = 3;
      imputedCount++;
    } else {
      num = Number(rawVal);
      if (isNaN(num) || num < 1 || num > 5 || !Number.isInteger(num)) {
        throw new Error(`Invalid SUS rating for item ${i + 1}: expected integer 1–5 or blank, received "${rawVal}"`);
      }
    }

    if (i % 2 === 0) {
      // Items 1, 3, 5, 7, 9 (0-indexed: 0, 2, 4, 6, 8)
      contributionSum += num - 1;
    } else {
      // Items 2, 4, 6, 8, 10 (0-indexed: 1, 3, 5, 7, 9)
      contributionSum += 5 - num;
    }
  }

  const score = Number((contributionSum * 2.5).toFixed(1));
  return { score, imputedCount };
}

/**
 * Returns Sauro-Lewis grade curve for a SUS score.
 */
export function getSUSGrade(score) {
  if (score >= 90.0) return 'A+';
  if (score >= 80.3) return 'A';
  if (score >= 74.1) return 'B';
  if (score >= 68.0) return 'C';
  if (score >= 51.0) return 'D';
  return 'F';
}

/**
 * Summarizes SUS scores across records.
 */
export function calculateSUSSummary(susRecords) {
  if (!susRecords || susRecords.length === 0) {
    return {
      count: 0,
      mean: 0,
      median: 0,
      stdDev: 0,
      min: 0,
      max: 0,
      iqr: 0,
      grade: 'N/A',
      totalImputedItems: 0,
    };
  }

  const scores = [];
  let totalImputedItems = 0;

  for (const r of susRecords) {
    const rawScore = r.sus_score;
    if (rawScore !== '' && rawScore !== undefined && rawScore !== null) {
      const parsed = Number(rawScore);
      if (isNaN(parsed) || parsed < 0 || parsed > 100) {
        throw new Error(`Invalid stored sus_score: "${rawScore}". Must be between 0.0 and 100.0`);
      }
      scores.push(parsed);
    } else {
      const answers = [r.q1, r.q2, r.q3, r.q4, r.q5, r.q6, r.q7, r.q8, r.q9, r.q10];
      const res = calculateSUSScore(answers);
      scores.push(res.score);
      totalImputedItems += res.imputedCount;
    }
  }

  if (scores.length === 0) {
    return {
      count: 0,
      mean: 0,
      median: 0,
      stdDev: 0,
      min: 0,
      max: 0,
      iqr: 0,
      grade: 'N/A',
      totalImputedItems: 0,
    };
  }

  const avg = mean(scores);
  return {
    count: scores.length,
    mean: avg,
    median: median(scores),
    stdDev: stdDev(scores),
    min: Math.min(...scores),
    max: Math.max(...scores),
    iqr: calculateIQR(scores),
    grade: getSUSGrade(avg),
    totalImputedItems,
  };
}

// ============================================================================
// 5. EFFECTIVENESS, EFFICIENCY, ERRORS, & SEQ METRICS
// ============================================================================

export function calculateCompletionRates(tasks) {
  if (!tasks || tasks.length === 0) {
    return {
      attempted: 0,
      unassistedCount: 0,
      assistedCount: 0,
      failedCount: 0,
      unassistedRate: 0,
      assistedRate: 0,
      failedRate: 0,
      overallCompletionRate: 0,
    };
  }

  const attempted = tasks.length;
  let unassistedCount = 0;
  let assistedCount = 0;
  let failedCount = 0;

  for (const t of tasks) {
    const outcome = String(t.outcome || '').trim();
    if (!VALID_ENUMS.outcome.includes(outcome)) {
      throw new Error(`Invalid outcome "${outcome}" in task record. Expected Unassisted, Assisted, or Failed.`);
    }

    if (outcome === 'Unassisted') {
      unassistedCount++;
    } else if (outcome === 'Assisted') {
      assistedCount++;
    } else {
      failedCount++;
    }
  }

  const unassistedRate = Number(((unassistedCount / attempted) * 100).toFixed(1));
  const assistedRate = Number(((assistedCount / attempted) * 100).toFixed(1));
  const failedRate = Number(((failedCount / attempted) * 100).toFixed(1));
  const overallCompletionRate = Number((((unassistedCount + assistedCount) / attempted) * 100).toFixed(1));

  return {
    attempted,
    unassistedCount,
    assistedCount,
    failedCount,
    unassistedRate,
    assistedRate,
    failedRate,
    overallCompletionRate,
  };
}

export function calculateTimeOnTask(tasks) {
  if (!tasks || tasks.length === 0) {
    return { count: 0, mean: 0, median: 0, stdDev: 0, min: 0, max: 0 };
  }

  // Only consider records with non-empty, valid duration (do not convert missing to zero)
  const times = [];
  for (const t of tasks) {
    const raw = t.duration_seconds;
    if (raw !== '' && raw !== undefined && raw !== null) {
      const num = Number(raw);
      if (!isNaN(num) && num > 0) {
        times.push(num);
      }
    }
  }

  if (times.length === 0) {
    return { count: 0, mean: 0, median: 0, stdDev: 0, min: 0, max: 0 };
  }

  return {
    count: times.length,
    mean: mean(times),
    median: median(times),
    stdDev: stdDev(times),
    min: Math.min(...times),
    max: Math.max(...times),
  };
}

export function calculateErrorSummary(tasks) {
  if (!tasks || tasks.length === 0) {
    return {
      totalErrors: 0,
      errorRatePerTask: 0,
      critCount: 0,
      nonCount: 0,
      clickCount: 0,
      navCount: 0,
      modelCount: 0,
    };
  }

  let critCount = 0;
  let nonCount = 0;
  let clickCount = 0;
  let navCount = 0;
  let modelCount = 0;

  for (const t of tasks) {
    critCount += Number(t.err_crit || 0);
    nonCount += Number(t.err_non || 0);
    clickCount += Number(t.err_click || 0);
    navCount += Number(t.err_nav || 0);
    modelCount += Number(t.err_model || 0);
  }

  const totalErrors = critCount + nonCount + clickCount + navCount + modelCount;
  const errorRatePerTask = Number((totalErrors / tasks.length).toFixed(2));

  return {
    totalErrors,
    errorRatePerTask,
    critCount,
    nonCount,
    clickCount,
    navCount,
    modelCount,
  };
}

export function calculateSEQStats(tasks) {
  if (!tasks || tasks.length === 0) {
    return { count: 0, mean: 0, median: 0, stdDev: 0, distribution: {} };
  }

  const scores = [];
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };

  for (const t of tasks) {
    const raw = t.seq_score;
    if (raw !== '' && raw !== undefined && raw !== null) {
      const s = Number(raw);
      if (!isNaN(s) && s >= 1 && s <= 7) {
        scores.push(s);
        distribution[s] = (distribution[s] || 0) + 1;
      }
    }
  }

  if (scores.length === 0) {
    return { count: 0, mean: 0, median: 0, stdDev: 0, distribution };
  }

  return {
    count: scores.length,
    mean: mean(scores),
    median: median(scores),
    stdDev: stdDev(scores),
    distribution,
  };
}

/**
 * Computes per-task breakdown for T01 through T05.
 */
export function calculatePerTaskSummary(tasks) {
  const taskIds = ['T01', 'T02', 'T03', 'T04', 'T05'];
  const summary = {};

  for (const tid of taskIds) {
    const taskSubset = tasks.filter((t) => t.task_id === tid);
    summary[tid] = {
      completion: calculateCompletionRates(taskSubset),
      time: calculateTimeOnTask(taskSubset),
      errors: calculateErrorSummary(taskSubset),
      seq: calculateSEQStats(taskSubset),
    };
  }

  return summary;
}

// ============================================================================
// 6. CONTEXT-STRATIFIED COMPARATIVE ANALYSIS
// ============================================================================

/**
 * Joins tasks and SUS records to sessions by participant_id,
 * computing comparative breakdowns across:
 * - Experience Group: Group A, Group B, Group C
 * - Device Context: Laptop vs Mobile
 * - Environment: Quiet vs Distracting
 */
export function calculateContextStratification(sessions, tasks, susRecords) {
  const sessionMap = new Map();
  for (const s of sessions) {
    sessionMap.set(s.participant_id, s);
  }

  const cuts = {
    experience: { 'Group A': [], 'Group B': [], 'Group C': [] },
    device: { Laptop: [], Mobile: [] },
    environment: { Quiet: [], Distracting: [] },
  };

  const tasksByPid = new Map();
  for (const t of tasks) {
    const list = tasksByPid.get(t.participant_id) || [];
    list.push(t);
    tasksByPid.set(t.participant_id, list);
  }

  const susByPid = new Map();
  for (const s of susRecords) {
    susByPid.set(s.participant_id, s);
  }

  for (const s of sessions) {
    const pid = s.participant_id;
    const pTasks = tasksByPid.get(pid) || [];
    const pSus = susByPid.get(pid);

    const record = { session: s, tasks: pTasks, sus: pSus };

    if (cuts.experience[s.experience_group]) {
      cuts.experience[s.experience_group].push(record);
    }
    if (cuts.device[s.device_context]) {
      cuts.device[s.device_context].push(record);
    }
    if (cuts.environment[s.environment]) {
      cuts.environment[s.environment].push(record);
    }
  }

  function summarizeStratum(stratumRecords) {
    const allTasks = stratumRecords.flatMap((r) => r.tasks);
    const allSus = stratumRecords.map((r) => r.sus).filter(Boolean);

    return {
      participantCount: stratumRecords.length,
      completion: calculateCompletionRates(allTasks),
      time: calculateTimeOnTask(allTasks),
      seq: calculateSEQStats(allTasks),
      sus: calculateSUSSummary(allSus),
    };
  }

  return {
    byExperience: {
      'Group A (Frequent)': summarizeStratum(cuts.experience['Group A']),
      'Group B (Occasional)': summarizeStratum(cuts.experience['Group B']),
      'Group C (Novice)': summarizeStratum(cuts.experience['Group C']),
    },
    byDevice: {
      Laptop: summarizeStratum(cuts.device.Laptop),
      Mobile: summarizeStratum(cuts.device.Mobile),
    },
    byEnvironment: {
      Quiet: summarizeStratum(cuts.environment.Quiet),
      Distracting: summarizeStratum(cuts.environment.Distracting),
    },
  };
}

/**
 * Summarizes qualitative feedback counts by category, sentiment, and severity.
 * Never exposes raw verbatim quotes or PII.
 */
export function calculateQualitativeSummary(qualitativeRecords) {
  if (!qualitativeRecords || qualitativeRecords.length === 0) {
    return { total: 0, byCategory: {}, bySentiment: {}, bySeverity: {} };
  }

  const byCategory = {};
  const bySentiment = {};
  const bySeverity = {};

  for (const q of qualitativeRecords) {
    byCategory[q.theme_category] = (byCategory[q.theme_category] || 0) + 1;
    bySentiment[q.sentiment] = (bySentiment[q.sentiment] || 0) + 1;
    bySeverity[q.severity] = (bySeverity[q.severity] || 0) + 1;
  }

  return {
    total: qualitativeRecords.length,
    byCategory,
    bySentiment,
    bySeverity,
  };
}

// ============================================================================
// 7. STATE CLASSIFICATION & FULL ANALYSIS RUNNER
// ============================================================================

/**
 * Determines completion status:
 * - PENDING_FIELDWORK: No usable records
 * - PARTIAL_FIELDWORK: Some valid records exist, but incomplete (<18 sessions or <90 tasks)
 * - ANALYSIS_READY: 18 valid sessions, 90 tasks, 18 SUS records
 */
export function determineCompletionState(sessions, tasks, susRecords) {
  const sCount = sessions.length;
  const tCount = tasks.length;
  const susCount = susRecords.length;

  if (sCount === 0 && tCount === 0 && susCount === 0) {
    return 'PENDING_FIELDWORK';
  }

  if (sCount === 18 && tCount === 90 && susCount === 18) {
    const completedSessions = sessions.filter((s) => s.status === 'Completed');
    if (completedSessions.length === 18) {
      return 'ANALYSIS_READY';
    }
  }

  return 'PARTIAL_FIELDWORK';
}

/**
 * Main execution runner: reads files, validates, classifies state, and outputs results.
 */
export function runAnalysis(dataDir) {
  console.log('CohortCircle Module 09 Summative Usability Analysis Engine');
  console.log('Target Data Directory:', dataDir);

  if (!fs.existsSync(dataDir)) {
    console.log('\n[NOTICE] Research data directory does not exist.');
    console.log('Status: MODULE 09 STUDY TOOLKIT PREPARED — SUMMATIVE FIELDWORK PENDING');
    console.log('All empirical participant data remains pending live fieldwork execution.');
    return { status: 'PENDING_FIELDWORK', data: null, errors: [] };
  }

  const files = {
    sessions: path.join(dataDir, 'sessions.csv'),
    tasks: path.join(dataDir, 'tasks.csv'),
    sus: path.join(dataDir, 'sus.csv'),
    qualitative: path.join(dataDir, 'qualitative.csv'),
  };

  const parsed = {};
  const errors = [];

  for (const [table, filePath] of Object.entries(files)) {
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const res = parseRFC4180CSV(content);
        if (res.headers.length > 0) {
          validateHeaders(table, res.headers);
        }
        parsed[table] = res.rows;
      } catch (err) {
        errors.push(`Error parsing ${table}.csv: ${err.message}`);
        parsed[table] = [];
      }
    } else {
      parsed[table] = [];
    }
  }

  const validationErrors = validateDatasets(parsed);
  errors.push(...validationErrors);

  if (errors.length > 0) {
    console.log('\n[DATASET VALIDATION ERRORS]');
    for (const e of errors) {
      console.log(` - ${e}`);
    }
    return { status: 'VALIDATION_FAILED', errors, data: null };
  }

  const sessions = parsed.sessions || [];
  const tasks = parsed.tasks || [];
  const susRecords = parsed.sus || [];
  const qualitative = parsed.qualitative || [];

  const state = determineCompletionState(sessions, tasks, susRecords);

  if (state === 'PENDING_FIELDWORK') {
    console.log('\n[NOTICE] Dataset contains 0 completed participant records.');
    console.log('Status: MODULE 09 STUDY TOOLKIT PREPARED — SUMMATIVE FIELDWORK PENDING');
    return { status: 'PENDING_FIELDWORK', data: null, errors: [] };
  }

  const completion = calculateCompletionRates(tasks);
  const timeStats = calculateTimeOnTask(tasks);
  const errorStats = calculateErrorSummary(tasks);
  const seqStats = calculateSEQStats(tasks);
  const susStats = calculateSUSSummary(susRecords);
  const perTask = calculatePerTaskSummary(tasks);
  const contextStrat = calculateContextStratification(sessions, tasks, susRecords);
  const qualitativeSummary = calculateQualitativeSummary(qualitative);

  console.log(`\n================ USABILITY METRICS SUMMARY [${state}] ================`);
  console.log(`Participants Logged: ${sessions.length} / 18 planned`);
  console.log(`Tasks Evaluated:     ${completion.attempted} / 90 planned`);
  console.log(`Unassisted Success:  ${completion.unassistedCount} (${completion.unassistedRate}%)`);
  console.log(`Assisted Completion: ${completion.assistedCount} (${completion.assistedRate}%)`);
  console.log(`Failed / Aborted:    ${completion.failedCount} (${completion.failedRate}%)`);
  console.log(`Overall Completion:  ${completion.overallCompletionRate}%`);
  console.log(`Mean Task Time:      ${timeStats.mean}s (Median: ${timeStats.median}s, Min: ${timeStats.min}s, Max: ${timeStats.max}s)`);
  console.log(`Total Errors Logged: ${errorStats.totalErrors} (Rate: ${errorStats.errorRatePerTask} / task)`);
  console.log(`Mean SEQ Rating:     ${seqStats.mean} / 7.0 (Median: ${seqStats.median})`);
  console.log(`Mean SUS Score:      ${susStats.mean} / 100 (Grade: ${susStats.grade}, Median: ${susStats.median}, IQR: ${susStats.iqr})`);
  console.log(`SUS Neutral Imputed: ${susStats.totalImputedItems} blank items`);
  console.log('======================================================================');

  const outputData = {
    status: state,
    timestamp: new Date().toISOString(),
    sessionsCount: sessions.length,
    tasksCount: tasks.length,
    completion,
    timeStats,
    errorStats,
    seqStats,
    susStats,
    perTask,
    contextStrat,
    qualitativeSummary,
  };

  // Optionally generate aggregate JSON output in private directory
  try {
    const analysisDir = path.resolve('private-research-data/module09/analysis');
    if (!fs.existsSync(analysisDir)) {
      fs.mkdirSync(analysisDir, { recursive: true });
    }
    fs.writeFileSync(path.join(analysisDir, 'summary.json'), JSON.stringify(outputData, null, 2), 'utf8');
    console.log(`Aggregate analysis output saved to: ${path.join(analysisDir, 'summary.json')}`);
  } catch (err) {
    console.log(`Note: Could not write private summary.json (${err.message}). Console output preserved.`);
  }

  return { status: state, data: outputData, errors: [] };
}

// Entry point if executed directly from CLI
const currentFilePath = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(currentFilePath)) {
  const targetDir = process.argv[2] || path.resolve('private-research-data/module09/data');
  runAnalysis(targetDir);
}
