import { LensAnchor } from "@/components/lens/LensAnchor";
import { LensFragment } from "@/components/lens/LensFragment";
import { CountUp } from "@/components/motion/CountUp";
import { programs } from "@/content/site";

/**
 * Transformation programs inside companies, told in numbers. Where a result
 * has a "before", the headline figure is drawn in the lens scene and the
 * glass shows the old value underneath it, struck through.
 */
export function Programs() {
  return (
    <section className="programs" data-nav-tone="dark" aria-labelledby="programs-title">
      <div className="frame">
        <h2 id="programs-title" className="sr-only">
          Programs
        </h2>
        <p className="programs-lead">
          <CountUp value={programs.headline.value} className="programs-big" />
          <span className="programs-big-label">{programs.headline.label}</span>
        </p>

        <LensAnchor
          id="programs"
          className="programs-field"
          interactive
          sizeRatio={0.2}
          minSize={190}
          thickness={0.34}
          plateLines={0}
          plateHalo={0.45}
        >
          <ol className="program-list">
            {programs.items.map((p, i) => (
              <li key={p.company} className="program">
                <div className="program-who">
                  <h3 className="program-company">{p.company}</h3>
                  <p className="program-meta">
                    {p.role} · {p.years}
                  </p>
                  <p className="program-line">{p.line}</p>
                </div>

                <div className="program-hero">
                  {p.hero.before ? (
                    <LensFragment
                      anchorId="programs"
                      id={`program-${i}`}
                      surface={p.hero.value}
                      through={p.hero.before}
                      kind="figure"
                      className="program-figure"
                      label={`${p.hero.value} ${p.hero.label}, down from ${p.hero.before}`}
                      rest={i === 0}
                    />
                  ) : (
                    <CountUp value={p.hero.value} className="program-figure" />
                  )}
                  <p className="program-hero-label">{p.hero.label}</p>
                </div>

                {p.stats.length > 0 && (
                  <dl className="program-stats">
                    {p.stats.map((s) => (
                      <div key={s.label} className="program-stat">
                        <dt className="sr-only">{s.label}</dt>
                        <dd>
                          <CountUp value={s.value} className="program-stat-value" />
                          <span className="program-stat-label" aria-hidden="true">
                            {s.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}
              </li>
            ))}
          </ol>
        </LensAnchor>
      </div>
    </section>
  );
}
