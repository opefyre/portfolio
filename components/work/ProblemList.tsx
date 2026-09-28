import { TLink } from "@/components/shell/transitions";
import { ProblemGlyph } from "@/components/home/ProblemGlyph";
import { problems } from "@/content/site";
import type { Project } from "@/lib/data";

/** The six curated problems, phrased as problems — shared by the homepage and /work. */
export function ProblemList({ projects }: { projects: Project[] }) {
  const bySlug = new Map(projects.map((p) => [p.slug, p]));
  return (
    <ol className="problem-list">
      {problems.map((pr, i) => {
        const p = bySlug.get(pr.slug);
        return (
          <li key={pr.slug}>
            <TLink href={`/work/${pr.slug}/`} className="problem">
              <span className="problem-num t-mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="problem-viz">
                <ProblemGlyph type={pr.glyph} />
              </span>
              <span className="problem-main">
                <span className="problem-title">{pr.title}</span>
                {p && <span className="problem-outcome">{p.impact}</span>}
              </span>
              <span className="problem-where t-mono">{pr.where}</span>
              <span className="problem-arrow" aria-hidden="true">
                →
              </span>
            </TLink>
          </li>
        );
      })}
    </ol>
  );
}
