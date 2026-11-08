import { YT_QUERY } from "../data/program.js";
import { hintFor, lastFor, repLabel } from "../lib/schedule.js";

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export default function ExerciseCard({ e, log, sets, onUpdate, onToggle }) {
  const last = lastFor(log, e.id);
  const hint = hintFor(log, e);
  const complete = sets.length > 0 && sets.every((s) => s.done);
  const lastTxt = last
    ? last.sets.filter((s) => s.done).map((s) => `${s.w ? s.w + "×" : ""}${s.r}`).join(", ")
    : "";
  const yt = `https://www.youtube.com/results?search_query=${encodeURIComponent(YT_QUERY[e.id] || `${e.n} form`)}`;
  const target = e.lo === e.hi ? String(e.lo) : `${e.lo}-${e.hi}`;

  return (
    <div className={`ex${complete ? " complete" : ""}`}>
      <div className="exhead">
        <h3>{e.n}</h3>
        <span className={`tag${e.g ? " glute" : ""}`}>{repLabel(e)}</span>
      </div>
      <div className="meta">
        <span>{e.eq}</span>
        <span>Rest <strong>{e.rest >= 120 ? "2 min" : `${e.rest}s`}</strong></span>
        {lastTxt && <span>Last: <strong>{lastTxt}</strong></span>}
      </div>
      {hint && <div className="hint">{hint}</div>}
      <details>
        <summary>How to do it</summary>
        <p>{e.cue}</p>
        <a className="yt" href={yt} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
          Watch form videos
        </a>
      </details>
      <div className="sets">
        <span className="h" />
        <span className="h">{e.bw ? "Added lb" : "Weight lb"}</span>
        <span className="h">{e.unit === "sec" ? "Seconds" : "Reps"}</span>
        <span className="h" />
        {sets.map((s, i) => (
          <div className="setrow" key={i}>
            <span className="n">{i + 1}</span>
            <input
              id={`w-${e.id}-${i}`}
              inputMode="decimal"
              placeholder={e.bw ? "0" : "lb"}
              value={s.w}
              onChange={(ev) => onUpdate(i, { w: ev.target.value.trim() })}
              aria-label={`${e.n} set ${i + 1} weight`}
            />
            <input
              id={`r-${e.id}-${i}`}
              inputMode="numeric"
              placeholder={target}
              value={s.r}
              onChange={(ev) => onUpdate(i, { r: ev.target.value.trim() })}
              aria-label={`${e.n} set ${i + 1} reps`}
            />
            <button className="chk" aria-pressed={s.done} onClick={() => onToggle(i)} aria-label={`Mark set ${i + 1} done`}>
              <Check />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
