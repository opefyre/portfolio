import type { Metadata } from "next";
import { SiteFooter } from "@/components/site/SiteFooter";
import { site } from "@/content/site";

const description = "How abosh.io and the abosh publisher handle data: no trackers on this site, and the publisher only posts to and reads statistics from the owner's own channels.";

export const metadata: Metadata = {
  title: "Privacy policy",
  description,
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacy/" },
};

const updated = "19 October 2026";

export default function PrivacyPage() {
  return (
    <>
      <div className="paper" data-nav-tone="light">
        <article className="note frame">
          <header className="note-head">
            <h1 className="note-title">Privacy policy</h1>
            <p className="note-dek">Last updated {updated}.</p>
          </header>
          <div className="note-layout">
            <div className="note-body">
              <h2>Who this covers</h2>
              <p>
                This policy covers the website abosh.io and &ldquo;abosh publisher&rdquo;, a private tool that Abolfazl Shirkavand uses to schedule and publish his own videos. Contact:{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>

              <h2>This website</h2>
              <p>
                abosh.io sets no cookies and runs no analytics, advertising or tracking scripts. The hosting provider (Google Firebase Hosting) keeps standard server logs, such as IP address and requested page, to deliver and protect the site.
              </p>

              <h2>abosh publisher</h2>
              <p>
                The publisher is used only by its owner, on accounts he owns or manages: the @abosh.io Instagram account and the Vrolen YouTube channel. It is not offered to anyone else, and nobody else can sign in to it.
              </p>
              <p>With the owner&rsquo;s permission it:</p>
              <ul>
                <li>uploads the owner&rsquo;s videos, covers and captions, and schedules them for publication;</li>
                <li>reads statistics for those videos (views, watch time, likes, comments, shares, saves) to measure what works.</li>
              </ul>
              <p>
                It does not collect information about viewers or other users, read private messages, or sell, share or transfer any data. Statistics are kept as numbers per video. Access tokens are stored privately on the owner&rsquo;s own computers and cloud project, and are used only for the actions above.
              </p>

              <h2>YouTube and Google data</h2>
              <p>
                The publisher uses YouTube API Services. By using it you agree to the{" "}
                <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer">YouTube Terms of Service</a>, and Google&rsquo;s handling of data is described in the{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
              </p>
              <p>
                Use of information received from Google APIs adheres to the{" "}
                <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">Google API Services User Data Policy</a>, including the Limited Use requirements.
              </p>
              <p>
                Access can be revoked at any time at{" "}
                <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer">myaccount.google.com/permissions</a>. Stored statistics and tokens are deleted when access is revoked or on request to the email above, within 7 days.
              </p>

              <h2>Instagram data</h2>
              <p>
                Instagram publishing and statistics use Meta&rsquo;s Instagram API under the same limits: the owner&rsquo;s account only, no data about other people. Access can be removed in Instagram under Settings, Apps and websites.
              </p>

              <h2>Changes</h2>
              <p>Changes to this policy are posted on this page with a new date.</p>
            </div>
          </div>
        </article>
      </div>
      <SiteFooter />
    </>
  );
}
