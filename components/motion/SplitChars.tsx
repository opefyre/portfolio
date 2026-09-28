import type { CSSProperties } from "react";

/**
 * Splits text into per-character spans for choreographed reveals. The outer
 * span is for scroll-linked motion, the inner one for the entrance, so the
 * two never fight over `transform`. Screen readers get the plain text.
 */
export function SplitChars({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="split">
        {text.split(" ").map((word, w, words) => {
          const start = offset + words.slice(0, w).join(" ").length + (w > 0 ? 1 : 0);
          return (
            <span className="split-word" key={w}>
              {[...word].map((c, i) => (
                <span className="ch" key={i} style={{ "--i": start + i } as CSSProperties}>
                  <span className="ch-in">{c}</span>
                </span>
              ))}
              {w < words.length - 1 && <span className="ch ch-space"> </span>}
            </span>
          );
        })}
      </span>
    </>
  );
}
