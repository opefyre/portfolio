import { LensAnchor } from "@/components/lens/LensAnchor";
import { SocialLinks } from "@/components/site/SocialLinks";
import { closing, site } from "@/content/site";

/** Closing statement and contact, shared by every page. The lens returns small and dark. */
export function SiteFooter() {
  return (
    <footer className="closing" data-nav-tone="dark">
      <div className="frame">
        <div className="closing-top">
          <p className="closing-line">
            <span>{closing[0]}</span>
            <span>{closing[1]}</span>
          </p>
          <LensAnchor id="closing" className="closing-lens" sizeRatio={0.8} darkness={0.9} plateLines={0} plateHalo={0.35} />
        </div>
        <div className="closing-contact">
          <a href={`mailto:${site.email}`} className="closing-email">
            {site.email}
          </a>
          <SocialLinks className="closing-links" />
        </div>
        <p className="site-foot">
          <span>© 2026 {site.name}</span>
          <span>{site.location}</span>
        </p>
      </div>
    </footer>
  );
}
