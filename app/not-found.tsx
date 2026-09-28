import type { Metadata } from "next";
import { PageHead } from "@/components/site/PageHead";
import { TLink } from "@/components/shell/transitions";

export const metadata: Metadata = { title: "Not found", robots: { index: false } };

export default function NotFound() {
  return (
    <PageHead
      kicker="404"
      title={
        <>
          Nothing here.
          <br />
          <span className="t-serif-inline">Not even underneath.</span>
        </>
      }
      lead={<p>The page you&rsquo;re looking for doesn&rsquo;t exist — or moved when the site was rebuilt.</p>}
    >
      <p className="nf-links">
        <TLink href="/" className="link-arrow">
          Home <span className="arrow" aria-hidden="true">→</span>
        </TLink>
        <TLink href="/work/" className="link-arrow">
          Work <span className="arrow" aria-hidden="true">→</span>
        </TLink>
      </p>
    </PageHead>
  );
}
