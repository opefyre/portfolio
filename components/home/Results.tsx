import { LensAnchor } from "@/components/lens/LensAnchor";
import { LensFragment } from "@/components/lens/LensFragment";
import { CountUp } from "@/components/motion/CountUp";
import { results } from "@/content/site";

/**
 * Career results. Each figure is the "after"; the lens shows the "before",
 * struck through, underneath it. Pointer, touch and keyboard focus move it.
 */
export function Results() {
  return (
    <section className="results" data-nav-tone="dark" aria-labelledby="results-title">
      <div className="frame">
        <h2 id="results-title" className="sr-only">
          Results
        </h2>
        <p className="results-lead">
          <CountUp value={results.headline.value} className="results-big" />
          <span className="results-big-label">{results.headline.label}</span>
        </p>

        <LensAnchor
          id="results"
          className="results-field"
          interactive
          sizeRatio={0.95}
          minSize={230}
          thickness={0.34}
          plateLines={0}
          plateHalo={0.45}
        >
          <ul className="results-list">
            {results.pairs.map((p, i) => (
              <li key={p.label} className="result">
                <LensFragment
                  anchorId="results"
                  id={`result-${i}`}
                  surface={p.after}
                  through={p.before}
                  kind="figure"
                  className="result-value"
                  rest={i === 0}
                  label={`${p.after}, down from ${p.before}`}
                />
                <p className="result-label">{p.label}</p>
              </li>
            ))}
          </ul>
        </LensAnchor>
      </div>
    </section>
  );
}
