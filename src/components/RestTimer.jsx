import { useEffect, useState } from "react";

export default function RestTimer({ endAt, setEndAt }) {
  const [now, setNow] = useState(Date.now());
  const left = Math.max(0, Math.round((endAt - now) / 1000));

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [endAt]);

  useEffect(() => {
    if (left === 0) {
      try {
        navigator.vibrate?.(300);
      } catch (e) {
        /* not supported on iPhone */
      }
    }
  }, [left === 0]);

  const set = (sec) => setEndAt(Date.now() + sec * 1000);

  return (
    <div className="timer">
      <div className="in">
        <span className="label tight">Rest</span>
        <span className={`clock${left === 0 ? " zero" : ""}`}>
          {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
        </span>
        <span className="sp" />
        <button onClick={() => set(60)}>60s</button>
        <button onClick={() => set(90)}>90s</button>
        <button onClick={() => set(120)}>2m</button>
        <button onClick={() => setEndAt(null)}>Hide</button>
      </div>
    </div>
  );
}
