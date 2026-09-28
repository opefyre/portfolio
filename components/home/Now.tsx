import { now } from "@/content/site";

/** A snapshot in time. Data lives in content/site.ts → `now`. */
export function Now() {
  return (
    <section id="now" className="section now" data-nav-tone="dark" aria-labelledby="now-title">
      <div className="frame">
        <p className="section-index">
          <span>06</span>
        </p>
        <div className="now-head">
          <h2 id="now-title" className="t-h2">
            Now
          </h2>
          <p className="t-lead">A snapshot in time.</p>
          <p className="t-mono now-updated">Updated {now.updated}</p>
        </div>
        <ul className="now-row">
          {now.items.map((item) => (
            <li key={item.label} className="now-card">
              <span className="t-label">{item.label}</span>
              <span className="now-value">{item.value}</span>
              <span className="dot now-dot" data-tone={item.tone} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
