import type { ReactNode } from "react";
import { LensAnchor } from "@/components/lens/LensAnchor";

/**
 * Opening of every inner page: a kicker, a large title, a lead — and a place
 * for the lens to settle, smaller than on the homepage.
 */
export function PageHead({
  kicker,
  title,
  lead,
  lens = true,
  tone = "dark",
  children,
}: {
  kicker: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  lens?: boolean;
  tone?: "dark" | "light";
  children?: ReactNode;
}) {
  return (
    <header className="page-head" data-nav-tone={tone}>
      <div className="frame page-head-frame">
        <div className="page-head-copy">
          <p className="page-kicker t-mono">{kicker}</p>
          <h1 className="page-title">{title}</h1>
          {lead && <div className="page-lead">{lead}</div>}
          {children}
        </div>
        {lens && (
          <LensAnchor id="page" className="page-lens" sizeRatio={0.78} plateLines={0.55} plateHalo={0.8} darkness={0.05} />
        )}
      </div>
    </header>
  );
}
