/**
 * CohortCircle ID Utilities
 * Generates unique, human-readable IDs for local domain entities.
 */

let counter = 0;

export function generateId(prefix = 'id') {
  counter += 1;
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 7);
  return `${prefix}-${timestamp}-${randomPart}-${counter}`;
}

export function generateInitials(name = '') {
  if (!name || typeof name !== 'string') return 'CC';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'CC';
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
