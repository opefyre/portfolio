"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Popover } from "@base-ui/react/popover";
import { LiquidGlass } from "@/components/glass/LiquidGlass";
import { TLink } from "@/components/shell/transitions";

const LINKS = [
  { href: "/work/", label: "Work" },
  { href: "/notes/", label: "Notes" },
  { href: "/about/", label: "About" },
] as const;

type Mode = "top" | "scrolled" | "compact";

const MotionGlass = motion.create(LiquidGlass);
const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 } as const;

function useNavMode() {
  const [mode, setMode] = useState<Mode>("top");
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - last;
      last = y;
      if (y < 48) setMode("top");
      else if (d > 6 && y > 720) setMode("compact");
      else if (d < -10) setMode("scrolled");
      else setMode((m) => (m === "top" ? "scrolled" : m));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return mode;
}

/** The glass re-tints to the surface passing underneath it (data-nav-tone). */
function useUnderTone(navRef: React.RefObject<HTMLElement | null>) {
  const [tone, setTone] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const probe = () => {
      const nav = navRef.current;
      if (!nav) return;
      const r = nav.getBoundingClientRect();
      const x = r.left + r.width / 2;
      const y = r.top + r.height / 2;
      const prev = nav.style.pointerEvents;
      nav.style.pointerEvents = "none";
      const stack = document.elementsFromPoint(x, y);
      nav.style.pointerEvents = prev;
      const toned = stack.find((n) => n instanceof HTMLElement && n.closest("[data-nav-tone]"));
      const t = (toned as HTMLElement | undefined)?.closest<HTMLElement>("[data-nav-tone]")?.dataset.navTone;
      setTone(t === "light" ? "light" : "dark");
    };
    probe();
    window.addEventListener("scroll", probe, { passive: true });
    window.addEventListener("resize", probe);
    return () => {
      window.removeEventListener("scroll", probe);
      window.removeEventListener("resize", probe);
    };
  }, [navRef]);
  return tone;
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href) || pathname === href.replace(/\/$/, "");
}

function StatusDot({ compact }: { compact: boolean }) {
  return (
    <TLink href="/#now" className="nav-status" aria-label="Now: building Vrolen">
      <span className="dot" data-tone="live" aria-hidden="true" />
      <AnimatePresence initial={false}>
        {!compact && (
          <motion.span
            key="label"
            className="nav-status-label"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            transition={spring}
          >
            Building Vrolen
          </motion.span>
        )}
      </AnimatePresence>
    </TLink>
  );
}

export function LiquidNav() {
  const pathname = usePathname();
  const scrollMode = useNavMode();
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const tone = useUnderTone(navRef);

  // Scrolling down collapses an expanded compact nav again; navigating closes
  // the mobile sheet. Adjusted during render rather than in an effect.
  const [seenMode, setSeenMode] = useState(scrollMode);
  if (seenMode !== scrollMode) {
    setSeenMode(scrollMode);
    if (scrollMode === "compact") setExpanded(false);
  }
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMenuOpen(false);
  }

  const mode: Mode = scrollMode === "compact" && !expanded ? "compact" : scrollMode;
  const compact = mode === "compact";

  return (
    <header className="nav-wrap" data-mode={mode}>
      <LayoutGroup>
        <MotionGlass
          ref={navRef as React.Ref<HTMLDivElement>}
          layout
          transition={spring}
          tone={tone}
          radius={999}
          band={16}
          strength={30}
          className="nav-pill"
          role="navigation"
          aria-label="Primary"
        >
          <motion.div layout="position" transition={spring}>
            <TLink href="/" className="nav-brand" aria-label="abosh.io — home">
              abosh<span className="nav-brand-tld">.io</span>
            </TLink>
          </motion.div>

          {/* Desktop links */}
          <AnimatePresence initial={false} mode="popLayout">
            {!compact && (
              <motion.ul
                key="links"
                layout
                className="nav-links"
                initial={{ opacity: 0, filter: "blur(6px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={spring}
              >
                {LINKS.map((l) => {
                  const active = isActive(pathname, l.href);
                  return (
                    <li key={l.href}>
                      <TLink href={l.href} className="nav-link" aria-current={active ? "page" : undefined}>
                        {active && <motion.span layoutId="nav-active" className="nav-active" transition={spring} />}
                        <span className="nav-link-label">{l.label}</span>
                      </TLink>
                    </li>
                  );
                })}
              </motion.ul>
            )}
          </AnimatePresence>

          <motion.div layout="position" transition={spring} className="nav-end">
            <StatusDot compact={compact || mode === "scrolled"} />
            {compact && (
              <motion.button
                layout
                type="button"
                className="nav-expand"
                aria-label="Show navigation"
                onClick={() => setExpanded(true)}
                whileTap={{ scale: 0.9 }}
                transition={spring}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </motion.button>
            )}

            {/* Mobile: compact island with a glass sheet */}
            <Popover.Root open={menuOpen} onOpenChange={setMenuOpen}>
              <Popover.Trigger className="nav-menu-trigger" aria-label="Menu">
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </Popover.Trigger>
              <AnimatePresence>
                {menuOpen && (
                  <Popover.Portal keepMounted>
                    <Popover.Positioner sideOffset={12} align="end" className="nav-sheet-positioner">
                      <Popover.Popup
                        render={
                          <motion.div
                            initial={{ opacity: 0, transform: "scale(0.94) translateY(-6px)" }}
                            animate={{ opacity: 1, transform: "scale(1) translateY(0px)" }}
                            exit={{ opacity: 0, transform: "scale(0.96) translateY(-4px)" }}
                            transition={spring}
                          />
                        }
                        className="nav-sheet glass"
                      >
                        <nav aria-label="Mobile">
                          <ul>
                            {[{ href: "/", label: "Home" }, ...LINKS].map((l) => (
                              <li key={l.href}>
                                <TLink href={l.href} className="nav-sheet-link" aria-current={pathname === l.href ? "page" : undefined}>
                                  {l.label}
                                </TLink>
                              </li>
                            ))}
                          </ul>
                        </nav>
                      </Popover.Popup>
                    </Popover.Positioner>
                  </Popover.Portal>
                )}
              </AnimatePresence>
            </Popover.Root>
          </motion.div>
        </MotionGlass>
      </LayoutGroup>
    </header>
  );
}
