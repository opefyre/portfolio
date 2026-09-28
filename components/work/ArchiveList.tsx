"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useReducedMotionSafe } from "@/components/shell/useReducedMotionSafe";
import { Toggle } from "@base-ui/react/toggle";
import { ToggleGroup } from "@base-ui/react/toggle-group";
import { TLink } from "@/components/shell/transitions";

export type ArchiveItem = { slug: string; title: string; category: string; summary: string };

const ALL = "All";

export function ArchiveList({ items, categories }: { items: ArchiveItem[]; categories: string[] }) {
  const [filter, setFilter] = useState<string>(ALL);
  const reduced = useReducedMotionSafe();

  // Deep links from /work: /archive/?c=Process%20Automation
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("c");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL after hydration
    if (c && categories.includes(c)) setFilter(c);
  }, [categories]);

  const select = (value: string) => {
    setFilter(value);
    const url = new URL(window.location.href);
    if (value === ALL) url.searchParams.delete("c");
    else url.searchParams.set("c", value);
    window.history.replaceState(window.history.state, "", url);
  };

  const shown = useMemo(() => (filter === ALL ? items : items.filter((i) => i.category === filter)), [items, filter]);
  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const i of items) m.set(i.category, (m.get(i.category) ?? 0) + 1);
    return m;
  }, [items]);

  return (
    <>
      <ToggleGroup
        value={[filter]}
        onValueChange={(v) => select((v[0] as string | undefined) ?? ALL)}
        className="filter-bar"
        aria-label="Filter by area"
      >
        {[ALL, ...categories].map((c) => (
          <Toggle key={c} value={c} className="filter-chip">
            {c}
            <span className="filter-count t-mono">{c === ALL ? items.length : counts.get(c)}</span>
          </Toggle>
        ))}
      </ToggleGroup>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        {filter !== ALL ? ` in ${filter}` : ""}.
      </p>

      <ol className="archive-list">
        <AnimatePresence initial={false} mode="popLayout">
          {shown.map((item) => (
            <motion.li
              key={item.slug}
              layout={reduced ? false : "position"}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 420, damping: 38 }}
            >
              <TLink href={`/work/${item.slug}/`} className="archive-row">
                <span className="archive-title">{item.title}</span>
                <span className="archive-summary">{item.summary}</span>
                <span className="archive-cat t-mono">{item.category}</span>
                <span className="archive-arrow" aria-hidden="true">
                  →
                </span>
              </TLink>
            </motion.li>
          ))}
        </AnimatePresence>
      </ol>
    </>
  );
}
