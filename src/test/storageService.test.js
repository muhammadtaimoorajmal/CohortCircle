import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  loadState,
  saveState,
  resetToSeed,
  clearState,
  isStorageAvailable,
  isValidStateSchema,
  STORAGE_KEY,
  CURRENT_SCHEMA_VERSION
} from '../services/storageService';
import { DEMO_CURRENT_USER, DEMO_CIRCLES } from '../data/demoData';

describe('StorageService (Local-First Persistence)', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('first launch seeds valid demonstration state', () => {
    const state = loadState();
    expect(state).toBeDefined();
    expect(state.version).toBe(CURRENT_SCHEMA_VERSION);
    expect(state.currentUser.name).toBe(DEMO_CURRENT_USER.name);
    expect(state.circles.length).toBe(DEMO_CIRCLES.length);
    expect(state.memberships.length).toBeGreaterThan(0);
    expect(state.sessions.length).toBeGreaterThan(0);
    expect(state.joinRequests.length).toBeGreaterThan(0);
  });

  it('saved state loads after simulation of page reload', () => {
    const initialState = loadState();
    const modifiedState = {
      ...initialState,
      currentUser: {
        ...initialState.currentUser,
        name: 'Jordan Test User',
        bio: 'Updated bio for testing persistence across reload'
      }
    };
    saveState(modifiedState);

    const reloaded = loadState();
    expect(reloaded.currentUser.name).toBe('Jordan Test User');
    expect(reloaded.currentUser.bio).toBe('Updated bio for testing persistence across reload');
  });

  it('recovers safely with fresh seed when localStorage contains corrupted JSON', () => {
    window.localStorage.setItem(STORAGE_KEY, '{"version": 1, corrupted: broken JSON');
    const state = loadState();
    expect(state).toBeDefined();
    expect(state.currentUser.name).toBe(DEMO_CURRENT_USER.name);
    expect(state.circles.length).toBe(DEMO_CIRCLES.length);
  });

  it('recovers safely when schema version or structure is invalid', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 999, invalid: true }));
    const state = loadState();
    expect(state.version).toBe(CURRENT_SCHEMA_VERSION);
    expect(state.currentUser.id).toBe(DEMO_CURRENT_USER.id);
  });

  it('handles unavailable or throwing localStorage gracefully without crashing', () => {
    const spy = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('QuotaExceededError or SecurityError');
    });
    const state = loadState();
    expect(state).toBeDefined();
    expect(state.currentUser.name).toBe(DEMO_CURRENT_USER.name);
    spy.mockRestore();
  });

  it('resetToSeed restores factory demonstration baseline', () => {
    const modified = loadState();
    modified.currentUser.name = 'Temporary Altered Name';
    saveState(modified);

    const restored = resetToSeed();
    expect(restored.currentUser.name).toBe(DEMO_CURRENT_USER.name);

    const loadedAfterReset = loadState();
    expect(loadedAfterReset.currentUser.name).toBe(DEMO_CURRENT_USER.name);
  });

  it('checks storage availability and clears state cleanly', () => {
    expect(isStorageAvailable()).toBe(true);

    saveState({ version: 1, currentUser: { id: 'usr-1' }, circles: [], memberships: [], joinRequests: [], sessions: [] });
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeDefined();

    clearState();
    expect(window.localStorage.getItem(STORAGE_KEY)).toBeNull();
  });

  it('validates schema correctly using isValidStateSchema', () => {
    expect(isValidStateSchema(null)).toBe(false);
    expect(isValidStateSchema({})).toBe(false);
    expect(isValidStateSchema({ version: 1 })).toBe(false);
    expect(
      isValidStateSchema({
        version: 1,
        currentUser: { id: 'usr-1' },
        circles: [],
        memberships: [],
        joinRequests: [],
        sessions: []
      })
    ).toBe(true);
  });
});
