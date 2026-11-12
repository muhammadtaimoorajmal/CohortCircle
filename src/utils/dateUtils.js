/**
 * CohortCircle Date Utilities
 * Safe local date comparisons and formatting avoiding timezone drift.
 */

export function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isDateInPast(dateStr) {
  if (!dateStr) return false;
  // Compare YYYY-MM-DD lexicographically
  const today = getTodayString();
  return dateStr < today;
}

export function isFutureDate(dateStr) {
  if (!dateStr) return false;
  const today = getTodayString();
  return dateStr >= today;
}

export function formatFriendlyDate(dateStr) {
  if (!dateStr) return '';
  const today = getTodayString();
  if (dateStr === today) return 'Today';

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, '0')}-${String(tomorrow.getDate()).padStart(2, '0')}`;
  if (dateStr === tomorrowStr) return 'Tomorrow';

  try {
    const [year, month, day] = dateStr.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateStr;
  }
}
