import { useState } from "react";
import { DAYS, ORDER, WARMUP } from "../data/program.js";
import { exFor, fmtDate, isDeload, nextDay, phase, repLabel, sessionsThisWeek } from "../lib/schedule.js";

function WeekStrip({ log }) {
  const done = sessionsThisWeek(log);
  return (
    <div className="week">
      {[0, 1, 2].map((i) => {
        const s = done[i];
        return (
          <div key={i} className={`pip${s ? " on" : ""}`}>
            <b>{s ? DAYS[s.day].name : `Session ${i + 1}`}</b>
            <span>{s ? fmtDate(s.date) : "Not yet"}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function TodayView({ log, week, onStart }) {
  const [picking, setPicking] = useState(false);
  const d = nextDay(log);
  const D = DAYS[d];
  const learn = phase(week) === "learn";
  const deload = isDeload(week);

  return (
    <>
      <div className="label">This week</div>
      <WeekStrip log={log} />
      <section className="hero">
        <span className="day">
          Up next · {D.name}
          {learn ? " · Learning phase" : ""}
          {deload ? " · Deload week" : ""}
        </span>
        <h2>{D.title}</h2>
        <p>
          {D.focus}. About {learn ? 35 : 50} minutes.
          {learn ? " Weeks 1 and 2 use lighter versions and fewer sets to learn each movement." : ""}
          {deload ? " One fewer set per exercise this week, same weights." : ""}
        </p>
        <div className="row">
          <button className="btn light" onClick={() => onStart(d)}>Start {D.name}</button>
          <button className="btn ghost" onClick={() => setPicking((p) => !p)}>Do a different day</button>
        </div>
        {picking && (
          <div className="row">
            {ORDER.filter((x) => x !== d).map((x) => (
              <button key={x} className="btn ghost" onClick={() => onStart(x)}>
                {DAYS[x].name}: {DAYS[x].title}
              </button>
            ))}
          </div>
        )}
      </section>
      <div className="card">
        <div className="label">Warm-up, 5 minutes</div>
        <ul>{WARMUP.map((w) => <li key={w}>{w}</li>)}</ul>
      </div>
      <div className="label">Today's exercises</div>
      {exFor(d, week).map((e) => (
        <div className="ex" key={e.id}>
          <div className="exhead">
            <h3>{e.n}</h3>
            <span className={`tag${e.g ? " glute" : ""}`}>{e.sets} × {repLabel(e)}</span>
          </div>
          <div className="meta">{e.eq}</div>
        </div>
      ))}
    </>
  );
}
