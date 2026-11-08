import { useEffect, useRef, useState } from "react";
import { buildCard } from "../lib/shareCard.js";
import { dateStamp, shareOrDownload } from "../lib/files.js";

const reduceMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Counts the pound total up from zero after the headline lands.
function useCountUp(target, delay = 1350, dur = 900) {
  const [v, setV] = useState(reduceMotion() ? target : 0);
  useEffect(() => {
    if (reduceMotion() || target <= 0) {
      setV(target);
      return;
    }
    let raf;
    const t0 = performance.now() + delay;
    const step = (t) => {
      const k = Math.min(1, Math.max(0, (t - t0) / dur));
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, dur]);
  return v;
}

function Bloom() {
  return (
    <svg className="bloom-svg" viewBox="0 0 150 150" aria-hidden="true">
      <g className="bloom">
        <circle className="petal p1" cx="75" cy="53" r="36" fill="var(--petal1)" />
        <circle className="petal p2" cx="94" cy="86" r="36" fill="var(--petal2)" />
        <circle className="petal p3" cx="56" cy="86" r="36" fill="var(--petal3)" />
        <circle className="core" cx="75" cy="75" r="9" fill="var(--surface)" />
      </g>
    </svg>
  );
}

export default function Celebration({ data, onDone }) {
  const doneRef = useRef(null);
  const lb = useCountUp(data.lb);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    doneRef.current?.focus();
  }, []);

  async function saveImage() {
    setSaveMsg("Preparing image…");
    try {
      const blob = await buildCard(data);
      const r = await shareOrDownload(blob, `workout-${dateStamp(data.date)}.png`, "Workout complete");
      setSaveMsg(r === "cancelled" ? "" : r === "downloaded" ? "Saved" : "");
    } catch (e) {
      setSaveMsg("Couldn't make the image. Try a screenshot instead.");
    }
  }

  const dots = data.cmp ? Math.min(Math.ceil(data.cmp.n), 12) : 0;

  return (
    <div className="cele" role="dialog" aria-modal="true" aria-labelledby="celeTitle">
      <Bloom />
      <span className="eyebrow">{data.eyebrow}</span>
      <h2 id="celeTitle">{data.title}</h2>
      <p>{data.msg}</p>
      <div className="stats">
        <div className="stat"><b>{data.sets}</b><span>sets done</span></div>
        {data.lb > 0 && <div className="stat"><b>{lb.toLocaleString()}</b><span>lb lifted</span></div>}
        <div className="stat"><b>{data.wk} of 3</b><span>this week</span></div>
      </div>
      {data.cmp && (
        <div className="cmp">
          <small>That's about the weight of</small>
          <strong>{data.cmp.label}</strong>
          <div className="units" aria-hidden="true">
            {Array.from({ length: dots }, (_, i) => {
              const partial = i === dots - 1 && data.cmp.n % 1 && dots === Math.ceil(data.cmp.n);
              return (
                <span className="unit" key={i} style={{ animationDelay: `${2.35 + i * 0.12}s` }}>
                  <i style={{ width: `${partial ? (data.cmp.n % 1) * 100 : 100}%` }} />
                </span>
              );
            })}
          </div>
        </div>
      )}
      <div className="actions">
        <button ref={doneRef} className="btn light" onClick={onDone}>Done</button>
        <button className="save" onClick={saveImage}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
          Save image
        </button>
        <span className="saveMsg" aria-live="polite">{saveMsg}</span>
      </div>
    </div>
  );
}
