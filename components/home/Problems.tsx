import { TLink } from "@/components/shell/transitions";
import type { Project } from "@/lib/data";
import { ProblemList } from "@/components/work/ProblemList";

export function Problems({ projects, total }: { projects: Project[]; total: number }) {
  return (
    <section id="work" className="section problems" data-nav-tone="dark" aria-labelledby="problems-title">
      <div className="frame">
        <p className="section-index">
          <span>03</span>
        </p>
        <div className="problems-head">
          <h2 id="problems-title" className="t-h2">
            Some problems
            <br />
            I&rsquo;ve worked on
          </h2>
          <p className="t-body problems-intro">
            Across factories, launches, operations and software — described by the problem rather than the job title.
          </p>
        </div>

        <ProblemList projects={projects} />

        <TLink href="/archive/" className="link-arrow problems-archive">
          View the archive — {total} projects <span className="arrow" aria-hidden="true">→</span>
        </TLink>
      </div>
    </section>
  );
}
