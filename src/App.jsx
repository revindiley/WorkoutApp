import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import TodayView from "./components/TodayView.jsx";
import SessionView from "./components/SessionView.jsx";
import PlanView from "./components/PlanView.jsx";
import HistoryView from "./components/HistoryView.jsx";
import RestTimer from "./components/RestTimer.jsx";
import Celebration from "./components/Celebration.jsx";
import { ALLEX, DAYS } from "./data/program.js";
import { exFor, isDeload, lastFor, sessionTotals, sessionsThisWeek, weekNumber } from "./lib/schedule.js";
import { drawCheer, compareWeight } from "./lib/celebrate.js";
import { load, save, requestPersist } from "./lib/storage.js";

export default function App() {
  const [state, setState] = useState(load);
  const [view, setView] = useState("today");
  const [restEnd, setRestEnd] = useState(null);
  const [celebration, setCelebration] = useState(null);

  useEffect(() => {
    save(state);
  }, [state]);

  useEffect(() => {
    requestPersist();
  }, []);

  const week = weekNumber(state.log);

  function startSession(day) {
    const sets = {};
    exFor(day, week).forEach((e) => {
      const l = lastFor(state.log, e.id);
      sets[e.id] = Array.from({ length: e.sets }, (_, i) => ({
        w: l?.sets[i]?.w ?? l?.sets[0]?.w ?? "",
        r: "",
        done: false,
      }));
    });
    setState((s) => ({ ...s, active: { id: `s${Date.now()}`, day, week, date: new Date().toISOString(), sets } }));
    try {
      navigator.wakeLock?.request("screen").catch(() => {});
    } catch (e) {
      /* optional */
    }
    window.scrollTo(0, 0);
  }

  function updateSet(exId, i, patch) {
    setState((s) => {
      const arr = s.active.sets[exId].map((x, j) => (j === i ? { ...x, ...patch } : x));
      return { ...s, active: { ...s.active, sets: { ...s.active.sets, [exId]: arr } } };
    });
  }

  function toggleSet(exId, i) {
    const cur = state.active.sets[exId][i];
    const done = !cur.done;
    const e = ALLEX[exId];
    updateSet(exId, i, { done, r: done && !cur.r ? String(e.lo) : cur.r });
    if (done) setRestEnd(Date.now() + e.rest * 1000);
  }

  function finishSession() {
    const a = state.active;
    const any = Object.values(a.sets).some((arr) => arr.some((s) => s.done));
    if (!any) {
      setState((s) => ({ ...s, active: null }));
      setRestEnd(null);
      return;
    }
    const done = { ...a, date: new Date().toISOString() };
    const log = [...state.log, done];
    const { cheer, index, bag } = drawCheer(state.bag, state.lastCheer);
    const totals = sessionTotals(done);
    const cmp = compareWeight(totals.lb, state.lastObj);
    setState((s) => ({ ...s, log, active: null, bag, lastCheer: index, lastObj: cmp ? cmp.obj : s.lastObj }));
    setRestEnd(null);
    setView("today");
    const D = DAYS[done.day];
    setCelebration({
      eyebrow: `${D.name} · ${D.title} complete`,
      title: cheer[0],
      msg: cheer[1],
      sets: totals.sets,
      lb: totals.lb,
      wk: Math.min(sessionsThisWeek(log).length, 3),
      date: done.date,
      cmp,
    });
  }

  function discardSession() {
    setState((s) => ({ ...s, active: null }));
    setRestEnd(null);
  }

  let body;
  if (view === "plan") body = <PlanView week={week} />;
  else if (view === "log") body = <HistoryView state={state} setState={setState} />;
  else if (state.active)
    body = (
      <SessionView
        log={state.log}
        active={state.active}
        onUpdate={updateSet}
        onToggle={toggleSet}
        onFinish={finishSession}
        onDiscard={discardSession}
      />
    );
  else body = <TodayView log={state.log} week={week} onStart={startSession} />;

  return (
    <>
      <div className="wrap">
        <Header view={view} setView={setView} week={week} deload={isDeload(week)} />
        <main className="view">{body}</main>
        <p className="sync">Saved on this phone</p>
      </div>
      {restEnd && <RestTimer endAt={restEnd} setEndAt={setRestEnd} />}
      {celebration && <Celebration data={celebration} onDone={() => { setCelebration(null); window.scrollTo(0, 0); }} />}
    </>
  );
}
