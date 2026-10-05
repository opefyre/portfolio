import { GLImage } from "@/components/media/GLImage";
import type { InstagramFeed } from "@/scripts/fetch-instagram";

/** The latest posts from Instagram, fetched at build. Hidden when there are none. */
export function HomeInstagram({ feed }: { feed: InstagramFeed }) {
  if (feed.posts.length === 0) return null;
  return (
    <section className="home-ig" data-nav-tone="dark" aria-labelledby="home-ig-title">
      <div className="frame">
        <div className="home-ig-head">
          <h2 id="home-ig-title" className="h-section">
            Instagram
          </h2>
          <a href={feed.profile} target="_blank" rel="noopener noreferrer" className="text-link">
            @{feed.username} <span aria-hidden="true">↗</span>
          </a>
        </div>
        <ul className="ig-grid">
          {feed.posts.map((p) => (
            <li key={p.id}>
              <a
                href={p.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="ig-post"
                aria-label={p.caption ? `Instagram post: ${p.caption}` : "Instagram post"}
              >
                <GLImage id={`ig-${p.id}`} src={p.src} alt={p.caption} width={p.width} height={p.height} radius={10} />
                {p.video && (
                  <span className="ig-play" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14">
                      <path d="M4 2.5v11l9-5.5z" fill="currentColor" />
                    </svg>
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
