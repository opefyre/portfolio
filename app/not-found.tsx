import type { Metadata } from "next";
import { LensAnchor } from "@/components/lens/LensAnchor";
import { TLink } from "@/components/shell/transitions";

export const metadata: Metadata = { title: "Not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="nf" data-nav-tone="dark" aria-labelledby="nf-title">
      <div className="frame nf-grid">
        <div>
          <h1 id="nf-title" className="nf-title">
            Nothing here.
          </h1>
          <p className="nf-links">
            <TLink href="/" className="text-link">
              Home <span aria-hidden="true">→</span>
            </TLink>
            <TLink href="/#work" className="text-link">
              Work <span aria-hidden="true">→</span>
            </TLink>
          </p>
        </div>
        <LensAnchor id="nf" className="nf-lens" sizeRatio={0.9} plateLines={0.6} plateHalo={0.8} />
      </div>
    </section>
  );
}
