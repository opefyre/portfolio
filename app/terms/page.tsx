import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { site } from "@/content/site";

const description = "Terms for abosh.io and the abosh publisher, a private single-user tool that schedules the owner's own videos on Instagram and YouTube.";

export const metadata: Metadata = {
  title: "Terms of service",
  description,
  alternates: { canonical: "/terms/" },
};

const updated = "19 October 2026";

export default function TermsPage() {
  return (
    <>
      <div className="paper" data-nav-tone="light">
        <article className="note frame">
          <header className="note-head">
            <h1 className="note-title">Terms of service</h1>
            <p className="note-dek">Last updated {updated}.</p>
          </header>
          <div className="note-layout">
            <div className="note-body">
              <h2>Who runs this</h2>
              <p>
                abosh.io and &ldquo;abosh publisher&rdquo; are run by Abolfazl Shirkavand, Lisbon, Portugal. Contact:{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>

              <h2>abosh publisher</h2>
              <p>
                abosh publisher is a private tool with a single user, its owner. It uploads, schedules and measures the owner&rsquo;s own videos on accounts he owns or manages: the @abosh.io Instagram account and the Vrolen YouTube channel. It is not offered, sold or licensed to anyone else, and no one else can sign in to it.
              </p>

              <h2>YouTube API Services</h2>
              <p>
                abosh publisher uses YouTube API Services. Anyone whose YouTube account is connected to it agrees to be bound by the{" "}
                <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube Terms of Service</a>. Google&rsquo;s handling of data is described in the{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
              </p>

              <h2>Privacy</h2>
              <p>
                What data the tool uses, how long it is kept and how to revoke access is set out in the <a href="/privacy/">privacy policy</a>.
              </p>

              <h2>This website</h2>
              <p>
                The articles and other content on abosh.io are provided for general information. They are not professional advice, and no guarantee is given that they are complete or current.
              </p>

              <h2>Changes</h2>
              <p>Changes to these terms are posted on this page with a new date.</p>
            </div>
          </div>
        </article>
      </div>
      <SiteFooter />
    </>
  );
}
