const HISTORY_KEY = "daypivotDecisionHistory";
const ACTIVE_KEY = "daypivotActiveDecision";
const LAST_RESULT_KEY = "daypivotLastResult";

export function saveActiveDecision(decision) {
  localStorage.setItem(ACTIVE_KEY, JSON.stringify(decision));
}

export function getActiveDecision() {
  const raw = localStorage.getItem(ACTIVE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function clearActiveDecision() {
  localStorage.removeItem(ACTIVE_KEY);
}

export function saveLastResult(result) {
  localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));
}

export function getLastResult() {
  const raw = localStorage.getItem(LAST_RESULT_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function getHistory() {
  const raw = localStorage.getItem(HISTORY_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function addHistoryItem(item) {
  const history = getHistory();
  const nextHistory = [item, ...history].slice(0, 30);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
  return nextHistory;
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
