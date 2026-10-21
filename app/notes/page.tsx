import type { Metadata } from "next";
import { NotesBrowser } from "@/components/notes/NotesBrowser";
import { getNotesIndex } from "@/lib/notes-index-data";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ogImage } from "@/content/site";

const description = "Practical guides to operations, supply chains, Lean Six Sigma and AI by Abolfazl Shirkavand, with worked examples, interactive charts and sources.";

export const metadata: Metadata = {
  title: "Operations & supply chain notes",
  description,
  alternates: { canonical: "/notes/" },
  openGraph: { title: "Operations & supply chain notes", description, type: "website", url: "/notes/", images: [ogImage] },
  twitter: { card: "summary_large_image", title: "Operations & supply chain notes", description, images: [ogImage] },
};

export default function NotesPage() {
  const notes = getNotesIndex();
  return (
    <>
      <div className="paper notes-index" data-nav-tone="light">
        <NotesBrowser notes={notes} />
      </div>
      <SiteFooter />
    </>
  );
}
