// Everything lives in this phone's browser storage. Wrapped in try/catch because
// private browsing or blocked site data can make localStorage throw.
const KEY = "gluteProgram.v1";

export const EMPTY = { log: [], active: null, bag: [], lastCheer: null, lastObj: null };

export function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) || "null");
    if (s && Array.isArray(s.log)) return { ...EMPTY, ...s };
  } catch (e) {
    /* fall through */
  }
  return { ...EMPTY };
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    return false;
  }
}

// Ask the browser not to evict this site's storage. iOS may ignore it.
export function requestPersist() {
  try {
    navigator.storage?.persist?.();
  } catch (e) {
    /* ignore */
  }
}

// Merge a backup into the current log by session id.
export function mergeBackup(state, backup) {
  if (!backup || !Array.isArray(backup.log)) throw new Error("That file isn't a workout backup.");
  const m = new Map();
  [...state.log, ...backup.log].forEach((x) => x && x.id && x.date && m.set(x.id, x));
  const log = [...m.values()].sort((a, b) => a.date.localeCompare(b.date));
  return { ...state, log };
}
