import type { Metadata } from "next";
import { ogImage } from "@/content/site";
import { PageHead } from "@/components/site/PageHead";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TLink } from "@/components/shell/transitions";
import { ProblemList } from "@/components/work/ProblemList";
import { productCards } from "@/content/work";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products Abolfazl Shirkavand (Abosh) is building — Vrolen, Elixiary, Finkavo and more — and the operations, launch and automation problems he has worked on.",
  alternates: { canonical: "/work/" },
  openGraph: { title: "Work — Abolfazl Shirkavand", url: "/work/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Work — Abolfazl Shirkavand", images: [ogImage] },
};

export default async function WorkPage() {
  const projects = await getProjects();
  const byCategory = new Map<string, number>();
  for (const p of projects) byCategory.set(p.category, (byCategory.get(p.category) ?? 0) + 1);
  const categories = [...byCategory.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <>
      <PageHead
        kicker={<>Work &nbsp;·&nbsp; {projects.length} projects</>}
        title={
          <>
            Things I build,
            <br />
            <span className="t-serif-inline">problems I solve.</span>
          </>
        }
        lead={<p>Products I&rsquo;m building now, and problems I&rsquo;ve worked on inside factories, supply chains and fast-moving companies.</p>}
      />

      <section className="section work-products" data-nav-tone="dark" aria-labelledby="products-title">
        <div className="frame">
          <div className="sub-head">
            <h2 id="products-title" className="t-h3">
              Products
            </h2>
            <p className="t-mono sub-head-meta">{productCards.length} · mine</p>
          </div>
          <ol className="product-rows">
            {productCards.map((c, i) => (
              <li key={c.slug}>
                <TLink href={`/work/${c.slug}/`} className="product-row" data-identity={c.identity}>
                  <span className="product-num t-mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="product-copy">
                    <span className="product-name">{c.name}</span>
                    <span className="product-line">{c.line}</span>
                    <span className="product-status t-mono">
                      <span className="dot" data-tone={c.tone} aria-hidden="true" />
                      {c.status}
                    </span>
                  </span>
                  <span className="product-frame tile-frame">
                    <img
                      src={c.image}
                      alt={c.imageAlt}
                      loading={i < 2 ? "eager" : "lazy"}
                      decoding="async"
                      style={{ objectPosition: c.focus ?? "50% 50%", viewTransitionName: `work-${c.slug}` }}
                    />
                  </span>
                </TLink>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section work-problems" data-nav-tone="dark" aria-labelledby="wp-title">
        <div className="frame">
          <div className="sub-head">
            <h2 id="wp-title" className="t-h3">
              Problems I&rsquo;ve worked on
            </h2>
            <p className="t-mono sub-head-meta">Selected</p>
          </div>
          <ProblemList projects={projects} />
        </div>
      </section>

      <section className="section work-more" data-nav-tone="dark" aria-labelledby="more-title">
        <div className="frame work-more-grid">
          <div>
            <h2 id="more-title" className="t-h3">
              Everything else
            </h2>
            <p className="t-body work-more-intro">
              The full record — process automation, enterprise systems, analytics and operations work, as it happened.
            </p>
            <TLink href="/archive/" className="link-arrow">
              Open the archive <span className="arrow" aria-hidden="true">→</span>
            </TLink>
          </div>
          <ul className="category-list">
            {categories.map(([name, count]) => (
              <li key={name}>
                <TLink href={`/archive/?c=${encodeURIComponent(name)}`} className="category-link">
                  <span className="category-name">{name}</span>
                  <span className="category-count t-mono">{String(count).padStart(2, "0")}</span>
                </TLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SiteFooter index="—" />
    </>
  );
}
