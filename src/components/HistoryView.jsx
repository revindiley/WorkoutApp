import { useRef, useState } from "react";
import { ALLEX, DAYS } from "../data/program.js";
import { fmtDate } from "../lib/schedule.js";
import { mergeBackup } from "../lib/storage.js";
import { dateStamp, shareOrDownload } from "../lib/files.js";

export default function HistoryView({ state, setState }) {
  const fileRef = useRef(null);
  const [msg, setMsg] = useState("");
  const log = state.log;

  async function backup() {
    const blob = new Blob([JSON.stringify({ app: "WorkoutApp", version: 1, log }, null, 2)], { type: "application/json" });
    const r = await shareOrDownload(blob, `workout-backup-${dateStamp(new Date().toISOString())}.json`, "Workout backup");
    setMsg(r === "cancelled" ? "" : "Backup ready. Keep it somewhere safe, like Files or iCloud Drive.");
  }

  async function restore(ev) {
    const f = ev.target.files?.[0];
    ev.target.value = "";
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      const before = log.length;
      const next = mergeBackup(state, data);
      setState(next);
      setMsg(`Restored. ${next.log.length - before} workouts added.`);
    } catch (e) {
      setMsg("That file couldn't be read. Pick a backup file this app made.");
    }
  }

  return (
    <>
      {!log.length && (
        <div className="empty">
          Finished workouts show up here with every set you logged.
          <br />
          Start Day A from the Today tab.
        </div>
      )}
      {log.slice().reverse().map((s) => {
        const D = DAYS[s.day];
        const n = Object.values(s.sets).reduce((a, arr) => a + arr.filter((x) => x.done).length, 0);
        const rows = Object.keys(s.sets)
          .map((id) => ALLEX[id])
          .filter((e) => e && s.sets[e.id].some((x) => x.done));
        return (
          <div className="card" key={s.id}>
            <div className="hist">
              <b>{D.name} · {D.title}</b>
              <small>{fmtDate(s.date)}</small>
            </div>
            <div className="meta">{n} sets done</div>
            <details>
              <summary>Show sets</summary>
              {rows.map((e) => (
                <div className="plan-row" key={e.id}>
                  <span>{e.n}</span>
                  <span>{s.sets[e.id].filter((x) => x.done).map((x) => `${x.w ? x.w + "×" : ""}${x.r}`).join("  ")}</span>
                </div>
              ))}
            </details>
          </div>
        );
      })}
      <div className="card">
        <div className="label">Back up your history</div>
        <p className="muted">Workouts are saved on this phone only. Save a backup now and then so a new phone or cleared Safari data doesn't erase them.</p>
        <div className="row">
          <button className="btn quiet" onClick={backup} disabled={!log.length}>Save backup</button>
          <button className="btn quiet" onClick={() => fileRef.current?.click()}>Restore from backup</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={restore} />
        </div>
        {msg && <p className="muted small" aria-live="polite">{msg}</p>}
      </div>
    </>
  );
}
