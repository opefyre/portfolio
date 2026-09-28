import { LensAnchor } from "@/components/lens/LensAnchor";
import { TLink } from "@/components/shell/transitions";
import { closing, site } from "@/content/site";

/** Closing statement + links, shared by every page. The lens returns small and dark. */
export function SiteFooter({ index = "08" }: { index?: string }) {
  return (
    <footer className="closing" data-nav-tone="dark" aria-labelledby="closing-line">
      <div className="frame">
        <p className="section-index">
          <span>{index}</span>
        </p>
        <div className="closing-body">
          <p id="closing-line" className="closing-line">
            <span>{closing.lines[0]}</span>
            <span className="closing-line-2">{closing.lines[1]}</span>
          </p>
          <LensAnchor id="closing" className="closing-lens" sizeRatio={0.8} darkness={0.9} plateLines={0} plateHalo={0.35} />
        </div>

        <nav className="closing-links" aria-label="Footer">
          <ul>
            <li>
              <TLink href="/work/" className="underline-draw">Work</TLink>
            </li>
            <li>
              <TLink href="/notes/" className="underline-draw">Notes</TLink>
            </li>
            <li>
              <TLink href="/about/" className="underline-draw">About</TLink>
            </li>
            <li>
              <a href={site.linkedin} className="underline-draw" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="underline-draw">
                Email
              </a>
            </li>
          </ul>
        </nav>

        <div className="site-foot t-mono">
          <span>© 2026 {site.name}</span>
          <span>abosh.io</span>
          <span>{site.location}</span>
        </div>
      </div>
    </footer>
  );
}
