import { DAYS, ORDER, LEARN, START } from "../data/program.js";

const WEEK_MS = 7 * 864e5;

export function startOfWeek(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); // Monday
  return x;
}

export function weekNumber(log) {
  if (!log.length) return 1;
  const first = startOfWeek(new Date(log[0].date));
  const now = startOfWeek(new Date());
  return Math.floor((now - first) / WEEK_MS) + 1;
}

export const isDeload = (w) => w % 5 === 0;
export const phase = (w) => (w <= 2 ? "learn" : "build");

export function nextDay(log) {
  const last = log[log.length - 1];
  return last ? ORDER[(ORDER.indexOf(last.day) + 1) % 3] : "A";
}

// Exercises for a day in a given week, with the learning swaps and reduced volume applied.
export function exFor(day, w) {
  const learn = phase(w) === "learn";
  return DAYS[day].ex.map((e, idx) => {
    const x = learn && LEARN[e.id] ? LEARN[e.id] : e;
    let sets = x.sets;
    if (learn) sets = idx === 0 ? 3 : 2;
    else if (w <= 4 && sets > 3) sets = 3;
    if (isDeload(w)) sets = Math.max(2, sets - 1);
    return { ...x, sets };
  });
}

export function lastFor(log, exId) {
  for (let i = log.length - 1; i >= 0; i--) {
    const s = log[i].sets[exId];
    if (s && s.some((x) => x.done)) return { sets: s, date: log[i].date };
  }
  return null;
}

export function sessionsThisWeek(log) {
  const sow = startOfWeek(new Date());
  return log.filter((x) => new Date(x.date) >= sow);
}

export function repLabel(e) {
  const r = e.lo === e.hi ? e.lo : `${e.lo}–${e.hi}`;
  return `${r}${e.unit ? " " + e.unit : ""}${e.uni ? " / side" : ""}`;
}

export function hintFor(log, e) {
  const l = lastFor(log, e.id);
  if (!l) {
    return e.bw
      ? "First time: focus on form, no weight needed."
      : `First time: try ${START[e.id] || "a light weight"}. Stop each set with 2 to 3 reps left in the tank.`;
  }
  const done = l.sets.filter((s) => s.done);
  const allTop = done.length >= e.sets && done.every((s) => (+s.r || 0) >= e.hi);
  if (!allTop) return "";
  return e.bw
    ? "You hit every target last time. Slow the lowering to 3 seconds or add a dumbbell."
    : "You hit the top of the range on every set. Go up one weight step today.";
}

export function fmtDate(iso, opts = { weekday: "short", month: "short", day: "numeric" }) {
  return new Date(iso).toLocaleDateString(undefined, opts);
}

export function sessionTotals(session) {
  let sets = 0, lb = 0;
  Object.values(session.sets).forEach((arr) =>
    arr.forEach((s) => {
      if (!s.done) return;
      sets++;
      lb += (parseFloat(s.w) || 0) * (parseFloat(s.r) || 0);
    })
  );
  return { sets, lb: Math.round(lb) };
}
