import { DAYS, ORDER } from "../data/program.js";
import { exFor, repLabel } from "../lib/schedule.js";

export default function PlanView({ week }) {
  return (
    <>
      <div className="card">
        <div className="label">How the program works</div>
        <p>
          Three full-body sessions a week, for example Monday, Wednesday and Friday. Every session trains the glutes
          from a different angle. Day A is hip-thrust and hinge heavy, Day B is squat and side-glute heavy, Day C is
          single-leg and high-rep. Upper body and core rotate through so no muscle gets worked two days in a row.
          Weeks 1 and 2 have about 25 sets a week that work the glutes. That builds to about 33 by week 6.
        </p>
      </div>
      <div className="card">
        <div className="label">New lifter ramp-up</div>
        <ul>
          <li>Weeks 1 and 2: easier swaps (split squat, kettlebell deadlift, bodyweight hip thrust) and 2 sets each, 3 for the first exercise. The goal is learning the movements, not getting tired.</li>
          <li>Weeks 3 and 4: the full exercise list, 3 sets max.</li>
          <li>Week 5 is a deload. Week 6 on: the hip thrust goes to 4 sets.</li>
          <li>Expect to add weight almost every week at first. That is normal for a new lifter.</li>
          <li>Soreness the first 2 weeks is normal. Sharp pain in a joint is not, so skip that exercise.</li>
        </ul>
      </div>
      <div className="card">
        <div className="label">Progression</div>
        <ul>
          <li>Each exercise has a rep range, like 8 to 12.</li>
          <li>Keep the weight until every set reaches the top number.</li>
          <li>Then go up one weight step and work back up from the bottom number.</li>
          <li>Finish most sets with 1 to 3 good reps left. Form breaking down means the set is over.</li>
          <li>Every 5th week is a deload: one fewer set, same weights. The app handles it.</li>
        </ul>
      </div>
      <div className="card">
        <div className="label">When the 55s get easy</div>
        <ul>
          <li>Hip thrust: pause 3 seconds at the top, or switch to single-leg with a DB.</li>
          <li>Lunges and split squats: slow the lowering to 3 seconds, or add a pause at the bottom.</li>
          <li>Kettlebells: do the sumo deadlift with one leg slightly back, or swing for 20 reps.</li>
        </ul>
      </div>
      {ORDER.map((d) => {
        const D = DAYS[d];
        return (
          <div className="card plan-day" key={d}>
            <div className="exhead"><h3 className="plan-title">{D.name} · {D.title}</h3></div>
            <div className="meta">{D.focus}. Shown for this week.</div>
            {exFor(d, week).map((e) => (
              <div className="plan-row" key={e.id}>
                <span>{e.n}</span>
                <span>{e.sets} × {repLabel(e)}</span>
              </div>
            ))}
          </div>
        );
      })}
      <div className="card">
        <div className="label">Put it on the home screen</div>
        <p>Open this page in Safari, tap the Share button, then tap "Add to Home Screen". It opens full screen like an app after that.</p>
      </div>
    </>
  );
}
