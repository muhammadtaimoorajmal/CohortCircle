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
  const valid = arr.map(Number).filter((v) => !isNaN(v) && Number.isFinite(v));
  if (valid.length === 0) return 0;
  const sum = valid.reduce((acc, val) => acc + val, 0);
  return Number((sum / valid.length).toFixed(2));
}

export function median(arr) {
  if (!arr || arr.length === 0) return 0;
  const sorted = arr.map(Number).filter((v) => !isNaN(v) && Number.isFinite(v)).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
  }
  return Number(sorted[mid].toFixed(2));
}

export function stdDev(arr) {
  if (!arr || arr.length <= 1) return 0;
  const valid = arr.map(Number).filter((v) => !isNaN(v) && Number.isFinite(v));
  if (valid.length <= 1) return 0;
  // Standard deviation must use an unrounded mean internally
  const unroundedMean = valid.reduce((acc, val) => acc + val, 0) / valid.length;
  const variance = valid.reduce((sum, val) => sum + Math.pow(val - unroundedMean, 2), 0) / (valid.length - 1);
  return Number(Math.sqrt(variance).toFixed(2));
}

export function percentile(arr, p) {
  if (!arr || arr.length === 0) return 0;
  const sorted = arr.map(Number).filter((v) => !isNaN(v) && Number.isFinite(v)).sort((a, b) => a - b);
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

// Strict numeric parsing helpers to prevent silent coercion of empty/whitespace strings to zero
export function parseStrictInteger(val) {
  if (typeof val === 'number') {
    return Number.isInteger(val) ? val : NaN;
  }
  if (typeof val !== 'string' || val.trim().length === 0) {
    return NaN;
  }
  const trimmed = val.trim();
  if (!/^[+-]?\d+$/.test(trimmed)) {
    return NaN;
  }
  const n = Number(trimmed);
  return Number.isInteger(n) ? n : NaN;
}

export function parseStrictFloat(val) {
  if (typeof val === 'number') {
    return Number.isFinite(val) ? val : NaN;
  }
  if (typeof val !== 'string' || val.trim().length === 0) {
    return NaN;
  }
  const trimmed = val.trim();
  if (!/^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(trimmed)) {
    return NaN;
  }
  const n = Number(trimmed);
  return Number.isFinite(n) ? n : NaN;
}

export function isValidDate(dateStr) {
  if (typeof dateStr !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim())) return false;
  const [y, m, d] = dateStr.trim().split('-').map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

export function isValidTime(timeStr) {
  if (typeof timeStr !== 'string' || !/^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(timeStr.trim())) return false;
  return true;
}

// ============================================================================
// 2. RFC 4180 COMPLIANT CSV PARSER
// ============================================================================

/**
 * Parses RFC 4180 compliant CSV string into headers and array of row objects.
 * Supports:
 * - Quoted fields, embedded commas, escaped quotes ("")
 * - CRLF and LF line breaks, embedded newlines within quoted fields
 * - Rejection of any characters following closing quote other than delimiter / newline / EOF
 * - UTF-8 BOM stripping
 * - Duplicate header detection
 * - Malformed row column count checks
 * - Safe trimming of empty trailing records
 */
export function parseRFC4180CSV(text) {
  if (typeof text !== 'string') {
    throw new Error('CSV input must be a string');
  }

  // Strip UTF-8 BOM if present
  let cleanText = text;
  if (cleanText.charCodeAt(0) === 0xFEFF) {
    cleanText = cleanText.slice(1);
  }

  if (cleanText.trim().length === 0) {
    return { headers: [], rows: [] };
  }

  const rawRows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  let justClosedQuote = false;
  let i = 0;
  const len = cleanText.length;

  while (i < len) {
    const char = cleanText[i];

    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < len && cleanText[i + 1] === '"') {
          // Escaped double quote ("")
          currentField += '"';
          i += 2;
        } else {
          // Closing quote of quoted field
          inQuotes = false;
          justClosedQuote = true;
          i++;
        }
      } else {
        currentField += char;
        i++;
      }
    } else if (justClosedQuote) {
      // After a quoted field closes, reject any character other than delimiter, line ending, or EOF
      if (char === ',') {
        currentRow.push(currentField);
        currentField = '';
        justClosedQuote = false;
        i++;
      } else if (char === '\r') {
        if (i + 1 < len && cleanText[i + 1] === '\n') {
          i++; // Skip \n of CRLF
        }
        currentRow.push(currentField);
        rawRows.push(currentRow);
        currentRow = [];
        currentField = '';
        justClosedQuote = false;
        i++;
      } else if (char === '\n') {
        currentRow.push(currentField);
        rawRows.push(currentRow);
        currentRow = [];
        currentField = '';
        justClosedQuote = false;
        i++;
      } else {
        throw new Error(`Malformed CSV: Unexpected character "${char}" following closing quote at index ${i}`);
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
        if (i + 1 < len && cleanText[i + 1] === '\n') {
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

  if (currentField.length > 0 || currentRow.length > 0 || justClosedQuote) {
    currentRow.push(currentField);
    rawRows.push(currentRow);
  }

  // Remove empty trailing lines
  while (rawRows.length > 0) {
    const lastRow = rawRows[rawRows.length - 1];
    if (lastRow.length === 1 && lastRow[0].trim() === '') {
      rawRows.pop();
    } else {
      break;
    }
  }

  if (rawRows.length === 0) {
    return { headers: [], rows: [] };
  }

  const headers = rawRows[0].map((h) => h.trim());
  const headerSet = new Set();
  for (const h of headers) {
    if (headerSet.has(h)) {
      throw new Error(`Malformed CSV: Duplicate header "${h}" detected`);
    }
    headerSet.add(h);
  }

  const headerCount = headers.length;
  const records = [];

  for (let rIdx = 1; rIdx < rawRows.length; rIdx++) {
    const row = rawRows[rIdx];
    // Skip empty lines in between if single blank column
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
// 3. DATASET SCHEMAS, ENUMS, & COUNTERBALANCED SEQUENCES
// ============================================================================

export const REQUIRED_HEADERS = {
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

export const VALID_ENUMS = {
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

export const PARTICIPANT_ID_REGEX = /^M09-P(0[1-9]|1[0-8])$/;
export const FEEDBACK_ID_REGEX = /^(FDB-\d{3,}|FB-P(0[1-9]|1[0-8])-\d{2})$/;

export const PARTICIPANT_SEQUENCE_MAP = {
  'M09-P01': 'Seq A',
  'M09-P02': 'Seq B',
  'M09-P03': 'Seq C',
  'M09-P04': 'Seq D',
  'M09-P05': 'Seq E',
  'M09-P06': 'Seq A',
  'M09-P07': 'Seq B',
  'M09-P08': 'Seq C',
  'M09-P09': 'Seq D',
  'M09-P10': 'Seq E',
  'M09-P11': 'Seq A',
  'M09-P12': 'Seq B',
  'M09-P13': 'Seq C',
  'M09-P14': 'Seq D',
  'M09-P15': 'Seq E',
  'M09-P16': 'Seq A',
  'M09-P17': 'Seq B',
  'M09-P18': 'Seq C',
};

export const EXPECTED_SEQUENCES = {
  'Seq A': ['T01', 'T02', 'T03', 'T04', 'T05'],
  'Seq B': ['T02', 'T03', 'T04', 'T05', 'T01'],
  'Seq C': ['T03', 'T04', 'T05', 'T01', 'T02'],
  'Seq D': ['T04', 'T05', 'T01', 'T02', 'T03'],
  'Seq E': ['T05', 'T01', 'T02', 'T03', 'T04'],
};

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
  const sessionSequenceMap = new Map();

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
    } else if (PARTICIPANT_SEQUENCE_MAP[pid] && s.task_sequence !== PARTICIPANT_SEQUENCE_MAP[pid]) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): Task sequence mismatch. Expected "${PARTICIPANT_SEQUENCE_MAP[pid]}", received "${s.task_sequence}".`);
    } else {
      sessionSequenceMap.set(pid, s.task_sequence);
    }

    if (String(s.consent_verified).trim().toLowerCase() !== 'true') {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): consent_verified must be "true".`);
    }

    if (!isValidDate(s.session_date)) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): session_date "${s.session_date}" must be a valid calendar date in YYYY-MM-DD format.`);
    }

    const duration = parseStrictInteger(s.session_duration);
    if (isNaN(duration) || duration < 0) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): session_duration must be a non-negative integer, received "${s.session_duration}".`);
    }

    const hours = parseStrictFloat(s.weekly_study_hours);
    if (isNaN(hours) || hours < 0) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): weekly_study_hours must be a finite non-negative number, received "${s.weekly_study_hours}".`);
    }

    const width = parseStrictInteger(s.viewport_width);
    if (isNaN(width) || width < 320 || width > 3840) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): viewport_width must be an integer between 320 and 3840, received "${s.viewport_width}".`);
    }

    const height = parseStrictInteger(s.viewport_height);
    if (isNaN(height) || height < 480 || height > 2160) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): viewport_height must be an integer between 480 and 2160, received "${s.viewport_height}".`);
    }

    if (!VALID_ENUMS.session_status.includes(s.status)) {
      errors.push(`sessions.csv row ${idx + 2} (${pid}): Invalid status "${s.status}". Must be Completed, Partial, or Terminated.`);
    }
  }

  // 2. Validate tasks.csv
  const taskPairs = new Set();
  const participantTaskPositions = new Map(); // pid -> Set of positions
  const tasksByPid = new Map(); // pid -> Array of task records

  for (let idx = 0; idx < tasks.length; idx++) {
    const t = tasks[idx];
    const pid = String(t.participant_id || '').trim();
    const tid = String(t.task_id || '').trim();

    // UNCONDITIONAL Foreign-key check: referenced participant must exist in sessions.csv
    if (!PARTICIPANT_ID_REGEX.test(pid)) {
      errors.push(`tasks.csv row ${idx + 2}: Invalid participant_id "${pid}".`);
    } else if (!sessionParticipantIds.has(pid)) {
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

    // Sequence position validation
    const seqPos = parseStrictInteger(t.sequence_position);
    if (isNaN(seqPos) || seqPos < 1 || seqPos > 5) {
      errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): sequence_position must be an integer between 1 and 5, received "${t.sequence_position}".`);
    } else {
      const posSet = participantTaskPositions.get(pid) || new Set();
      if (posSet.has(seqPos)) {
        errors.push(`tasks.csv row ${idx + 2} (${pid}): Duplicate sequence_position ${seqPos}. Each task must have a unique position.`);
      } else {
        posSet.add(seqPos);
        participantTaskPositions.set(pid, posSet);
      }

      // Counterbalanced sequence verification
      const assignedSeq = sessionSequenceMap.get(pid) || PARTICIPANT_SEQUENCE_MAP[pid];
      if (assignedSeq && EXPECTED_SEQUENCES[assignedSeq]) {
        const expectedTaskId = EXPECTED_SEQUENCES[assignedSeq][seqPos - 1];
        if (tid && tid !== expectedTaskId) {
          errors.push(`tasks.csv row ${idx + 2} (${pid}): Counterbalanced sequence mismatch. In ${assignedSeq}, position ${seqPos} must be ${expectedTaskId}, received "${tid}".`);
        }
      }
    }

    if (!isValidTime(t.start_time)) {
      errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): start_time "${t.start_time}" must be a valid 24-hr time in HH:MM:SS format.`);
    }

    if (!isValidTime(t.end_time)) {
      errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): end_time "${t.end_time}" must be a valid 24-hr time in HH:MM:SS format.`);
    }

    if (!VALID_ENUMS.outcome.includes(t.outcome)) {
      errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): Invalid outcome "${t.outcome}". Must be Unassisted, Assisted, or Failed.`);
    }

    // duration_seconds: required integer in 0 to 300 range
    const dur = parseStrictInteger(t.duration_seconds);
    if (isNaN(dur) || dur < 0 || dur > 300) {
      errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): duration_seconds must be an integer between 0 and 300, received "${t.duration_seconds}".`);
    }

    // seq_score: required integer between 1 and 7
    const seq = parseStrictInteger(t.seq_score);
    if (isNaN(seq) || seq < 1 || seq > 7) {
      errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): seq_score must be an integer between 1 and 7, received "${t.seq_score}".`);
    }

    // Assist and Error counts: required non-negative integers
    const errFields = ['err_crit', 'err_non', 'err_click', 'err_nav', 'err_model', 'assist_count'];
    for (const f of errFields) {
      const val = parseStrictInteger(t[f]);
      if (isNaN(val) || val < 0) {
        errors.push(`tasks.csv row ${idx + 2} (${pid}, ${tid}): ${f} must be a non-negative integer, received "${t[f]}".`);
      }
    }

    const pList = tasksByPid.get(pid) || [];
    pList.push(t);
    tasksByPid.set(pid, pList);
  }

  // 3. Validate sus.csv
  const susParticipantIds = new Set();
  for (let idx = 0; idx < sus.length; idx++) {
    const s = sus[idx];
    const pid = String(s.participant_id || '').trim();

    // UNCONDITIONAL Foreign-key check
    if (!PARTICIPANT_ID_REGEX.test(pid)) {
      errors.push(`sus.csv row ${idx + 2}: Invalid participant_id "${pid}".`);
    } else if (!sessionParticipantIds.has(pid)) {
      errors.push(`sus.csv row ${idx + 2}: Foreign-key error. Participant "${pid}" does not exist in sessions.csv.`);
    }

    if (susParticipantIds.has(pid)) {
      errors.push(`sus.csv row ${idx + 2}: Duplicate participant_id "${pid}" in sus.csv.`);
    } else {
      susParticipantIds.add(pid);
    }

    let blankItemCount = 0;
    const answers = [];
    for (let q = 1; q <= 10; q++) {
      const rawVal = s[`q${q}`];
      if (rawVal === '' || rawVal === undefined || rawVal === null || String(rawVal).trim() === '') {
        blankItemCount++;
        answers.push('');
      } else {
        const num = parseStrictInteger(rawVal);
        if (isNaN(num) || num < 1 || num > 5) {
          errors.push(`sus.csv row ${idx + 2} (${pid}): q${q} must be integer 1–5 or blank for permitted neutral imputation, received "${rawVal}".`);
        }
        answers.push(num);
      }
    }

    if (blankItemCount === 10) {
      errors.push(`sus.csv row ${idx + 2} (${pid}): Incomplete SUS survey. All 10 items are blank; completely blank questionnaires cannot produce a score.`);
    } else if (blankItemCount > 1) {
      errors.push(`sus.csv row ${idx + 2} (${pid}): Incomplete SUS survey. ${blankItemCount} items are blank (maximum permitted blank items is 1). Marked incomplete and excluded.`);
    }

    // If stored composite score is provided, check against calculated score
    const rawSus = s.sus_score;
    if (rawSus !== '' && rawSus !== undefined && rawSus !== null && String(rawSus).trim() !== '') {
      const parsedStored = parseStrictFloat(rawSus);
      if (isNaN(parsedStored) || parsedStored < 0 || parsedStored > 100) {
        errors.push(`sus.csv row ${idx + 2} (${pid}): sus_score must be a finite number between 0.0 and 100.0, received "${rawSus}".`);
      } else if (blankItemCount <= 1) {
        try {
          const calculated = calculateSUSScore(answers);
          if (Math.abs(parsedStored - calculated.score) > 0.1) {
            errors.push(`sus.csv row ${idx + 2} (${pid}): Stored sus_score (${parsedStored}) disagrees with calculated score (${calculated.score}).`);
          }
        } catch {
          // If calculateSUSScore throws, covered by item validation
        }
      }
    }
  }

  // 4. Validate qualitative.csv
  const feedbackIds = new Set();
  for (let idx = 0; idx < qualitative.length; idx++) {
    const q = qualitative[idx];
    const fid = String(q.feedback_id || '').trim();
    const pid = String(q.participant_id || '').trim();
    const tid = String(q.task_id || '').trim();

    if (!FEEDBACK_ID_REGEX.test(fid)) {
      errors.push(`qualitative.csv row ${idx + 2}: Invalid feedback_id "${fid}". Must match format FDB-001 or FB-P01-01.`);
    } else if (feedbackIds.has(fid)) {
      errors.push(`qualitative.csv row ${idx + 2}: Duplicate feedback_id "${fid}".`);
    } else {
      feedbackIds.add(fid);
    }

    // UNCONDITIONAL Foreign-key check
    if (!PARTICIPANT_ID_REGEX.test(pid)) {
      errors.push(`qualitative.csv row ${idx + 2}: Invalid participant_id "${pid}".`);
    } else if (!sessionParticipantIds.has(pid)) {
      errors.push(`qualitative.csv row ${idx + 2}: Foreign-key error. Participant "${pid}" does not exist in sessions.csv.`);
    }

    if (tid !== 'GLOBAL' && !VALID_ENUMS.task_id.includes(tid)) {
      errors.push(`qualitative.csv row ${idx + 2} (${fid}): Invalid task_id "${tid}". Must be T01–T05 or GLOBAL.`);
    }

    if (!VALID_ENUMS.theme_category.includes(q.theme_category)) {
      errors.push(`qualitative.csv row ${idx + 2} (${fid}): Invalid theme_category "${q.theme_category}". Must be one of: ${VALID_ENUMS.theme_category.join(', ')}.`);
    }

    if (!VALID_ENUMS.sentiment.includes(q.sentiment)) {
      errors.push(`qualitative.csv row ${idx + 2} (${fid}): Invalid sentiment "${q.sentiment}". Must be Positive, Neutral, or Critical.`);
    }

    if (!VALID_ENUMS.severity.includes(q.severity)) {
      errors.push(`qualitative.csv row ${idx + 2} (${fid}): Invalid severity "${q.severity}". Must be Critical, Major, Minor, or Cosmetic.`);
    }

    if (!q.verbatim_quote || String(q.verbatim_quote).trim().length === 0) {
      errors.push(`qualitative.csv row ${idx + 2} (${fid}): Required field verbatim_quote is missing or empty.`);
    }

    if (!q.suggested_action || String(q.suggested_action).trim().length === 0) {
      errors.push(`qualitative.csv row ${idx + 2} (${fid}): Required field suggested_action is missing or empty.`);
    }
  }

  return errors;
}

// ============================================================================
// 4. SUS SCORING WITH DOCUMENTED NEUTRAL IMPUTATION (BROOKE 1996)
// ============================================================================

/**
 * Computes individual SUS score for 10 items.
 * Rules:
 * - Completely blank questionnaires (10 blanks) must not produce a score.
 * - Excessive missing responses (> 1 blank) are marked incomplete and rejected.
 * - At most 1 accidentally blank item is permitted for neutral imputation (assigned value 3, contribution = 2).
 * - Genuine scores of 0.0 and 100.0 remain strictly valid.
 * Returns { score, imputedCount, blankCount }.
 */
export function calculateSUSScore(ratings) {
  if (!ratings || ratings.length !== 10) {
    throw new Error('SUS ratings array must contain exactly 10 items');
  }

  let blankCount = 0;
  for (let i = 0; i < 10; i++) {
    const rawVal = ratings[i];
    if (rawVal === '' || rawVal === null || rawVal === undefined || (typeof rawVal === 'string' && rawVal.trim() === '')) {
      blankCount++;
    }
  }

  if (blankCount === 10) {
    throw new Error('Incomplete SUS survey: All 10 items are blank. Completely blank questionnaires cannot produce a score.');
  }

  if (blankCount > 1) {
    throw new Error(`Incomplete SUS survey: ${blankCount} items are blank. Maximum permitted blank items for neutral imputation is 1. Survey marked incomplete and excluded.`);
  }

  let contributionSum = 0;
  let imputedCount = 0;

  for (let i = 0; i < 10; i++) {
    const rawVal = ratings[i];
    let num;

    if (rawVal === '' || rawVal === null || rawVal === undefined || (typeof rawVal === 'string' && rawVal.trim() === '')) {
      num = 3; // Neutral imputation (contribution = 2)
      imputedCount++;
    } else {
      num = parseStrictInteger(rawVal);
      if (isNaN(num) || num < 1 || num > 5) {
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
  return { score, imputedCount, blankCount };
}

/**
 * Returns Sauro-Lewis grade curve for a SUS score.
 * Grade A threshold is 80.3 (project benchmark >= 80.0 falls at the Grade B / Grade A boundary).
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
 * Incomplete or invalid surveys are excluded and do not contribute to sample size.
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
      excludedCount: 0,
    };
  }

  const scores = [];
  let totalImputedItems = 0;
  let excludedCount = 0;

  for (const r of susRecords) {
    const rawScore = r.sus_score;
    const answers = [r.q1, r.q2, r.q3, r.q4, r.q5, r.q6, r.q7, r.q8, r.q9, r.q10];

    // Attempt to calculate score from item answers
    let calculated = null;
    let calculationError = null;
    try {
      calculated = calculateSUSScore(answers);
    } catch (err) {
      calculationError = err;
    }

    if (rawScore !== '' && rawScore !== undefined && rawScore !== null && String(rawScore).trim() !== '') {
      const parsed = parseStrictFloat(rawScore);
      if (isNaN(parsed) || parsed < 0 || parsed > 100) {
        throw new Error(`Invalid stored sus_score: "${rawScore}". Must be a finite number between 0.0 and 100.0`);
      }

      if (calculated) {
        if (Math.abs(parsed - calculated.score) > 0.1) {
          throw new Error(`Stored sus_score (${parsed}) disagrees with calculated score (${calculated.score}) for participant "${r.participant_id || 'unknown'}".`);
        }
        scores.push(calculated.score);
        totalImputedItems += calculated.imputedCount;
      } else {
        // If calculation threw because answers were incomplete or invalid, exclude or fail
        excludedCount++;
      }
    } else {
      // Score was blank or whitespace-only, calculate from answers
      if (calculated) {
        scores.push(calculated.score);
        totalImputedItems += calculated.imputedCount;
      } else {
        // Incomplete questionnaire excluded from sample size
        excludedCount++;
      }
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
      totalImputedItems,
      excludedCount,
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
    excludedCount,
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

  // Only consider records with non-empty, strictly valid duration in 0–300s
  // Never convert missing/blank strings into zero
  const times = [];
  for (const t of tasks) {
    const raw = t.duration_seconds;
    if (raw !== '' && raw !== undefined && raw !== null && String(raw).trim() !== '') {
      const num = parseStrictInteger(raw);
      if (!isNaN(num) && num >= 0 && num <= 300) {
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
    const crit = parseStrictInteger(t.err_crit);
    const non = parseStrictInteger(t.err_non);
    const click = parseStrictInteger(t.err_click);
    const nav = parseStrictInteger(t.err_nav);
    const model = parseStrictInteger(t.err_model);

    if (isNaN(crit) || isNaN(non) || isNaN(click) || isNaN(nav) || isNaN(model)) {
      throw new Error(`Invalid error count in task record for participant "${t.participant_id || 'unknown'}". Error counts must be non-negative integers.`);
    }

    critCount += crit;
    nonCount += non;
    clickCount += click;
    navCount += nav;
    modelCount += model;
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
    if (raw !== '' && raw !== undefined && raw !== null && String(raw).trim() !== '') {
      const s = parseStrictInteger(raw);
      if (isNaN(s) || s < 1 || s > 7) {
        throw new Error(`Invalid SEQ rating "${raw}" for participant "${t.participant_id || 'unknown'}". Must be an integer between 1 and 7.`);
      }
      scores.push(s);
      distribution[s] = (distribution[s] || 0) + 1;
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
 * computing descriptive comparative breakdowns across:
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
 * Never exposes raw verbatim quotes or PII in output summaries.
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
 * - PENDING_FIELDWORK: No usable records across all tables
 * - PARTIAL_FIELDWORK: Some valid records exist, but incomplete (< 18 sessions, < 90 tasks, etc.)
 * - ANALYSIS_READY: 18 valid completed sessions, 90 tasks with matching counterbalanced sequences, 18 SUS records
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
      // Check that all 18 participants have exactly 5 tasks
      const pTaskCounts = new Map();
      for (const t of tasks) {
        pTaskCounts.set(t.participant_id, (pTaskCounts.get(t.participant_id) || 0) + 1);
      }
      const allHaveFive = Array.from(pTaskCounts.values()).every((c) => c === 5) && pTaskCounts.size === 18;
      if (allHaveFive) {
        return 'ANALYSIS_READY';
      }
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

  // Private aggregate-only output structure (no raw quotes, names, or PII)
  const outputData = {
    status: state,
    timestamp: new Date().toISOString(),
    sessionsCount: sessions.length,
    tasksCount: tasks.length,
    susCount: susStats.count,
    completion,
    timeStats,
    errorStats,
    seqStats,
    susStats,
    perTask,
    contextStrat,
    qualitativeSummary,
  };

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
