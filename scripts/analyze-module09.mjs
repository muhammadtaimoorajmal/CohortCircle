#!/usr/bin/env node
/**
 * CohortCircle Module 09 Summative Usability Analysis Engine
 *
 * Reads de-identified usability CSV files, validates schemas,
 * computes effectiveness (completion), efficiency (time-on-task),
 * error distributions, SEQ ratings, and composite SUS scores with grading curves.
 *
 * Local-only, zero network dependencies, zero PII disclosure.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// --- Statistical Helper Functions ---

export function mean(arr) {
  if (!arr || arr.length === 0) return 0;
  const sum = arr.reduce((acc, val) => acc + Number(val), 0);
  return Number((sum / arr.length).toFixed(2));
}

export function median(arr) {
  if (!arr || arr.length === 0) return 0;
  const sorted = [...arr].map(Number).sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
  }
  return Number(sorted[mid].toFixed(2));
}

export function stdDev(arr) {
  if (!arr || arr.length <= 1) return 0;
  const avg = mean(arr);
  const variance = arr.reduce((sum, val) => sum + Math.pow(Number(val) - avg, 2), 0) / (arr.length - 1);
  return Number(Math.sqrt(variance).toFixed(2));
}

// --- Usability Calculation Functions ---

/**
 * Calculates task completion rates: unassisted, assisted, failed, and overall.
 */
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
    const outcome = String(t.outcome || '').trim().toLowerCase();
    if (outcome === 'unassisted') {
      unassistedCount++;
    } else if (outcome === 'assisted') {
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

/**
 * Calculates time-on-task statistics (mean, median, stdDev, min, max).
 */
export function calculateTimeOnTask(tasks) {
  if (!tasks || tasks.length === 0) {
    return { count: 0, mean: 0, median: 0, stdDev: 0, min: 0, max: 0 };
  }

  const times = tasks.map((t) => Number(t.duration_seconds || 0)).filter((t) => !isNaN(t) && t >= 0);
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

/**
 * Computes error counts and breakdowns across categories.
 */
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

/**
 * Computes Single Ease Question (SEQ) statistics.
 */
export function calculateSEQStats(tasks) {
  if (!tasks || tasks.length === 0) {
    return { count: 0, mean: 0, median: 0, stdDev: 0, distribution: {} };
  }

  const scores = tasks.map((t) => Number(t.seq_score || 0)).filter((s) => s >= 1 && s <= 7);
  if (scores.length === 0) {
    return { count: 0, mean: 0, median: 0, stdDev: 0, distribution: {} };
  }

  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  for (const s of scores) {
    distribution[s] = (distribution[s] || 0) + 1;
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
 * Computes individual SUS score for 10 items using Brooke (1996) standard.
 * Odd items: raw - 1
 * Even items: 5 - raw
 * Composite: sum * 2.5
 */
export function calculateSUSScore(ratings) {
  if (!ratings || ratings.length < 10) return 0;

  let contributionSum = 0;
  for (let i = 0; i < 10; i++) {
    const raw = Number(ratings[i]);
    if (isNaN(raw) || raw < 1 || raw > 5) return 0;

    if (i % 2 === 0) {
      // Items 1, 3, 5, 7, 9 (0-indexed: 0, 2, 4, 6, 8)
      contributionSum += raw - 1;
    } else {
      // Items 2, 4, 6, 8, 10 (0-indexed: 1, 3, 5, 7, 9)
      contributionSum += 5 - raw;
    }
  }

  return Number((contributionSum * 2.5).toFixed(1));
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
 * Summarizes SUS scores across participants.
 */
export function calculateSUSSummary(susRecords) {
  if (!susRecords || susRecords.length === 0) {
    return { count: 0, mean: 0, median: 0, stdDev: 0, min: 0, max: 0, grade: 'N/A' };
  }

  const scores = susRecords.map((r) => {
    if (r.sus_score !== undefined && !isNaN(Number(r.sus_score))) {
      return Number(r.sus_score);
    }
    const answers = [r.q1, r.q2, r.q3, r.q4, r.q5, r.q6, r.q7, r.q8, r.q9, r.q10];
    return calculateSUSScore(answers);
  }).filter((s) => !isNaN(s) && s >= 0);

  if (scores.length === 0) {
    return { count: 0, mean: 0, median: 0, stdDev: 0, min: 0, max: 0, grade: 'N/A' };
  }

  const avg = mean(scores);
  return {
    count: scores.length,
    mean: avg,
    median: median(scores),
    stdDev: stdDev(scores),
    min: Math.min(...scores),
    max: Math.max(...scores),
    grade: getSUSGrade(avg),
  };
}

// --- CSV Simple Parser ---

export function parseCSV(content) {
  const lines = content.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const rawValues = lines[i].split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
    const row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = rawValues[j] !== undefined ? rawValues[j] : '';
    }
    rows.push(row);
  }

  return rows;
}

// --- CLI Execution Runner ---

export function runAnalysis(dataDir) {
  console.log('CohortCircle Module 09 Summative Usability Analysis Engine');
  console.log('Target Data Directory:', dataDir);

  if (!fs.existsSync(dataDir)) {
    console.log('\n[NOTICE] Research data directory does not exist or contains no records.');
    console.log('Status: MODULE 09 STUDY TOOLKIT PREPARED — SUMMATIVE FIELDWORK PENDING');
    console.log('All empirical participant data remains pending live fieldwork execution.');
    return { status: 'PENDING_FIELDWORK', data: null };
  }

  const tasksFile = path.join(dataDir, 'tasks.csv');
  const susFile = path.join(dataDir, 'sus.csv');
  const sessionsFile = path.join(dataDir, 'sessions.csv');

  if (!fs.existsSync(tasksFile) || !fs.existsSync(susFile)) {
    console.log('\n[NOTICE] Incomplete dataset: tasks.csv or sus.csv not found.');
    console.log('Status: MODULE 09 STUDY TOOLKIT PREPARED — SUMMATIVE FIELDWORK PENDING');
    return { status: 'PENDING_FIELDWORK', data: null };
  }

  const tasks = parseCSV(fs.readFileSync(tasksFile, 'utf8'));
  const susRecords = parseCSV(fs.readFileSync(susFile, 'utf8'));
  const sessions = fs.existsSync(sessionsFile) ? parseCSV(fs.readFileSync(sessionsFile, 'utf8')) : [];

  if (tasks.length === 0 && susRecords.length === 0) {
    console.log('\n[NOTICE] Dataset contains 0 completed participant records.');
    console.log('Status: MODULE 09 STUDY TOOLKIT PREPARED — SUMMATIVE FIELDWORK PENDING');
    return { status: 'PENDING_FIELDWORK', data: null };
  }

  const completion = calculateCompletionRates(tasks);
  const timeStats = calculateTimeOnTask(tasks);
  const errorStats = calculateErrorSummary(tasks);
  const seqStats = calculateSEQStats(tasks);
  const susStats = calculateSUSSummary(susRecords);

  console.log('\n================ USABILITY METRICS SUMMARY ================');
  console.log(`Participants Logged: ${sessions.length}`);
  console.log(`Tasks Evaluated:     ${completion.attempted}`);
  console.log(`Unassisted Success:  ${completion.unassistedCount} (${completion.unassistedRate}%)`);
  console.log(`Assisted Completion: ${completion.assistedCount} (${completion.assistedRate}%)`);
  console.log(`Failed / Aborted:    ${completion.failedCount} (${completion.failedRate}%)`);
  console.log(`Overall Completion:  ${completion.overallCompletionRate}%`);
  console.log(`Mean Task Time:      ${timeStats.mean}s (Median: ${timeStats.median}s, Range: ${timeStats.min}s–${timeStats.max}s)`);
  console.log(`Total Errors Logged: ${errorStats.totalErrors} (Rate: ${errorStats.errorRatePerTask} / task)`);
  console.log(`Mean SEQ Rating:     ${seqStats.mean} / 7.0 (Median: ${seqStats.median})`);
  console.log(`Mean SUS Score:      ${susStats.mean} / 100 (Grade: ${susStats.grade}, Median: ${susStats.median})`);
  console.log('===========================================================');

  return {
    status: 'COMPLETE',
    sessionsCount: sessions.length,
    completion,
    timeStats,
    errorStats,
    seqStats,
    susStats,
  };
}

// Entry point if executed directly
const currentFilePath = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(currentFilePath)) {
  const targetDir = process.argv[2] || path.resolve('private-research-data/module09/data');
  runAnalysis(targetDir);
}
