"use client";

import { useState } from "react";
import { videos, videoUrl } from "@/content/videos";

/**
 * A Vrolen video inside a Note. Shows a local thumbnail until the reader
 * presses play; only then does the youtube-nocookie player load.
 */
export function NoteVideo({ id, caption }: { id: string; caption: string }) {
  const [playing, setPlaying] = useState(false);
  const video = videos[id];
  return (
    <figure className="note-video">
      <div className="note-video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button type="button" className="note-video-poster" onClick={() => setPlaying(true)} aria-label={`Play video: ${video.title}`}>
            <img src={`/notes/videos/${id}.webp`} alt="" width={960} height={540} loading="lazy" decoding="async" />
            <span className="note-video-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <a href={videoUrl(id)} target="_blank" rel="noopener noreferrer" className="note-video-title">
          {video.title} <span aria-hidden="true">↗</span>
        </a>
        <span className="note-video-caption">{caption}</span>
      </figcaption>
    </figure>
  );
}
