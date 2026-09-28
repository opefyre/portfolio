import type { Metadata } from "next";
import { ogImage } from "@/content/site";
import { PageHead } from "@/components/site/PageHead";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArchiveList, type ArchiveItem } from "@/components/work/ArchiveList";
import { displayName, headlineFor, productCard, whereFor } from "@/content/work";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Archive",
  description: "Every project Abolfazl Shirkavand has documented — products, operations, process automation, enterprise systems and analytics.",
  alternates: { canonical: "/archive/" },
  openGraph: { title: "Archive — Abolfazl Shirkavand", url: "/archive/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Archive — Abolfazl Shirkavand", images: [ogImage] },
};

export default async function ArchivePage() {
  const projects = await getProjects();
  const items: ArchiveItem[] = projects.map((p) => ({
    slug: p.slug,
    title: productCard(p.slug)?.name ?? (whereFor(p) ? headlineFor(p) : displayName(p)),
    category: p.category,
    summary: p.description,
  }));
  const categories = [...new Set(projects.map((p) => p.category))].sort();

  return (
    <>
      <PageHead
        kicker={<>Archive &nbsp;·&nbsp; {projects.length} projects</>}
        title="The full record."
        lead={<p>Everything documented, unfiltered by importance. Most of it happened inside other companies; some of it is mine.</p>}
      />
      <section className="section archive" data-nav-tone="dark" aria-label="Projects">
        <div className="frame">
          <ArchiveList items={items} categories={categories} />
        </div>
      </section>
      <SiteFooter index="—" />
    </>
  );
}
