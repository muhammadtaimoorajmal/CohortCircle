/**
 * CohortCircle Versioned Local Storage Service
 *
 * Provides resilient, schema-validated browser persistence for the single-user
 * demonstration application. Handles missing, malformed, or corrupt JSON,
 * quota exceptions, and deep-cloning of baseline fixtures.
 */

import {
  DEMO_CURRENT_USER,
  DEMO_CIRCLES,
  DEMO_SESSIONS,
  DEMO_PENDING_REQUESTS,
  DEMO_MEMBERSHIPS,
  DEFAULT_SETTINGS
} from '../data/demoData';

export const STORAGE_KEY = 'cohortcircle_state_v1';
export const CURRENT_SCHEMA_VERSION = 1;

/**
 * Deep clones any plain JS object or array.
 */
export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (err) {
    console.error('CohortCircle clone error:', err);
    return obj;
  }
}

/**
 * Checks if browser localStorage is available and writable.
 */
export function isStorageAvailable() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const testKey = '__cc_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns a clean, deep-cloned demonstration initial state.
 */
export function getInitialSeedState() {
  return {
    version: CURRENT_SCHEMA_VERSION,
    currentUser: deepClone(DEMO_CURRENT_USER),
    circles: deepClone(DEMO_CIRCLES),
    memberships: deepClone(DEMO_MEMBERSHIPS),
    joinRequests: deepClone(DEMO_PENDING_REQUESTS),
    sessions: deepClone(DEMO_SESSIONS),
    activeRole: DEMO_CURRENT_USER.role || 'learner',
    settings: deepClone(DEFAULT_SETTINGS),
    lastUpdated: new Date().toISOString()
  };
}

/**
 * Validates that loaded state adheres to required domain schema.
 */
export function isValidStateSchema(state) {
  if (!state || typeof state !== 'object') return false;
  if (state.version !== CURRENT_SCHEMA_VERSION) return false;
  if (!state.currentUser || typeof state.currentUser !== 'object' || !state.currentUser.id) return false;
  if (!Array.isArray(state.circles)) return false;
  if (!Array.isArray(state.memberships)) return false;
  if (!Array.isArray(state.joinRequests)) return false;
  if (!Array.isArray(state.sessions)) return false;
  return true;
}

/**
 * Loads application state from localStorage.
 * Recovers safely with fresh seed if data is corrupt or missing.
 */
export function loadState() {
  if (!isStorageAvailable()) {
    return getInitialSeedState();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seed = getInitialSeedState();
      saveState(seed);
      return seed;
    }

    const parsed = JSON.parse(raw);
    if (!isValidStateSchema(parsed)) {
      console.warn('CohortCircle: Schema mismatch or corrupted state. Resetting to seed.');
      const seed = getInitialSeedState();
      saveState(seed);
      return seed;
    }

    return parsed;
  } catch (err) {
    console.error('CohortCircle: Failed to parse localStorage state. Falling back to seed.', err);
    const seed = getInitialSeedState();
    try {
      saveState(seed);
    } catch {
      // Ignore write errors in restricted contexts
    }
    return seed;
  }
}

/**
 * Persists application state to localStorage.
 */
export function saveState(state) {
  if (!isStorageAvailable()) return false;
  try {
    const payload = {
      ...state,
      version: CURRENT_SCHEMA_VERSION,
      lastUpdated: new Date().toISOString()
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error('CohortCircle: Error saving state to localStorage', err);
    return false;
  }
}

/**
 * Clears persistent state completely (for safe empty testing).
 */
export function clearState() {
  if (isStorageAvailable()) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('CohortCircle: Error clearing localStorage', err);
    }
  }
}

/**
 * Resets storage to initial demo seed.
 */
export function resetToSeed() {
  const seed = getInitialSeedState();
  saveState(seed);
  return seed;
}
