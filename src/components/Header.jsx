const TABS = [
  ["today", "Today"],
  ["plan", "Program"],
  ["log", "History"],
];

export default function Header({ view, setView, week, deload }) {
  return (
    <header className="top">
      <div className="brand">
        <h1>Workout Program</h1>
        <span className="wk">Week {week}{deload ? " · Deload" : ""}</span>
      </div>
      <nav className="tabs" role="tablist">
        {TABS.map(([id, label]) => (
          <button
            key={id}
            role="tab"
            aria-selected={view === id}
            onClick={() => {
              setView(id);
              window.scrollTo(0, 0);
            }}
          >
            {label}
          </button>
        ))}
      </nav>
    </header>
  );
}
