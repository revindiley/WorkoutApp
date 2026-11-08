import { useState } from "react";
import { ALLEX, DAYS } from "../data/program.js";
import ExerciseCard from "./ExerciseCard.jsx";

export default function SessionView({ log, active, onUpdate, onToggle, onFinish, onDiscard }) {
  const [confirming, setConfirming] = useState(false);
  const D = DAYS[active.day];
  const list = Object.keys(active.sets).map((id) => ALLEX[id]).filter(Boolean);

  return (
    <>
      <section className="hero">
        <span className="day">In progress · {D.name}</span>
        <h2>{D.title}</h2>
        <p>Fill in weight and reps, then tap the check. The rest timer starts on its own.</p>
      </section>
      {list.map((e) => (
        <ExerciseCard
          key={e.id}
          e={e}
          log={log}
          sets={active.sets[e.id]}
          onUpdate={(i, patch) => onUpdate(e.id, i, patch)}
          onToggle={(i) => onToggle(e.id, i)}
        />
      ))}
      <button className="btn primary" onClick={onFinish}>Finish workout</button>
      <div className="confirm">
        <button className="btn quiet" onClick={() => setConfirming(true)}>Discard this workout</button>
        {confirming && (
          <span>
            Throw away this session?{" "}
            <button className="btn quiet" onClick={onDiscard}>Yes, discard</button>
          </span>
        )}
      </div>
    </>
  );
}
