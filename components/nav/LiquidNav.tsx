"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Popover } from "@base-ui/react/popover";
import { LiquidGlass } from "@/components/glass/LiquidGlass";
import { TLink } from "@/components/shell/transitions";

const LINKS = [
  { href: "/#work", label: "Work", match: "/work/" },
  { href: "/notes/", label: "Notes", match: "/notes/" },
  { href: "/about/", label: "About", match: "/about/" },
] as const;

const MotionGlass = motion.create(LiquidGlass);
const spring = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 } as const;

/** The glass re-tints to the surface passing underneath it (data-nav-tone). */
function useUnderTone(navRef: React.RefObject<HTMLElement | null>) {
  const [tone, setTone] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const probe = () => {
      const nav = navRef.current;
      if (!nav) return;
      const r = nav.getBoundingClientRect();
      const prev = nav.style.pointerEvents;
      nav.style.pointerEvents = "none";
      const stack = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
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

function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return scrolled;
}

export function LiquidNav() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const tone = useUnderTone(navRef);

  // Navigating closes the mobile sheet (adjusted during render, not in an effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMenuOpen(false);
  }

  return (
    <header className="nav-wrap" data-scrolled={scrolled || undefined}>
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
          <TLink href="/" className="nav-brand" aria-label="Abolfazl Shirkavand, home">
            Abosh
          </TLink>

          <ul className="nav-links">
            {LINKS.map((l) => {
              const active = pathname.startsWith(l.match);
              return (
                <li key={l.href}>
                  <TLink href={l.href} className="nav-link" aria-current={active ? "page" : undefined}>
                    {active && <motion.span layoutId="nav-active" className="nav-active" transition={spring} />}
                    <span className="nav-link-label">{l.label}</span>
                  </TLink>
                </li>
              );
            })}
          </ul>

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
                          {[{ href: "/", label: "Home", match: "@" }, ...LINKS].map((l) => (
                            <li key={l.href}>
                              <TLink
                                href={l.href}
                                className="nav-sheet-link"
                                aria-current={(l.match === "@" ? pathname === "/" : pathname.startsWith(l.match)) ? "page" : undefined}
                              >
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
        </MotionGlass>
      </LayoutGroup>
    </header>
  );
}
