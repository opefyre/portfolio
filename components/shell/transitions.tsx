"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useLayoutEffect, type ComponentProps, type MouseEvent } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { glNav } from "@/components/lens/glImages";
import { scrollStore, scrollToTarget } from "./SmoothScroll";

/**
 * Page transitions.
 *
 * The DOM content steps back and fades while the WebGL scene stays alive:
 * the lens springs to the next page's anchor, and the image you clicked
 * (`keep`) flies from its box into the next page's hero. Everything else
 * dissolves. With reduced motion, navigation is instant.
 */
const LEAVE_MS = 300;

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Mounted once in the shell: finishes transitions and resets scroll on route change. */
export function RouteChangeHandler() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    const root = document.documentElement;
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    if (target instanceof HTMLElement) scrollToTarget(target, { immediate: true, offset: -24 });
    else if (scrollStore.lenis) scrollStore.lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);

    const arriving = root.classList.contains("is-leaving");
    root.classList.remove("is-leaving");
    glNav.leaving = false;
    if (arriving) root.classList.add("is-entering");
    const done = window.setTimeout(() => {
      root.classList.remove("is-entering");
      glNav.keep = null;
    }, 1100);
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(done);
    };
  }, [pathname]);
  return null;
}

export function useTransitionNavigate() {
  const router = useRouter();
  const pathname = usePathname();
  return useCallback(
    (href: string, keep?: string) => {
      const url = new URL(href, window.location.href);
      if (url.pathname.replace(/\/$/, "") === pathname.replace(/\/$/, "")) {
        scrollToTarget(url.hash ? url.hash : 0, { offset: -24 });
        return;
      }
      if (reduced()) {
        router.push(href, { scroll: false });
        return;
      }
      glNav.keep = keep ?? null;
      glNav.leaving = true;
      document.documentElement.classList.add("is-leaving");
      window.setTimeout(() => router.push(href, { scroll: false }), LEAVE_MS);
    },
    [router, pathname],
  );
}

/** next/link with a page transition. `keep` names the WebGL image that should fly to the next page. */
export function TLink({ href, onClick, keep, ...props }: ComponentProps<typeof Link> & { href: string; keep?: string }) {
  const navigate = useTransitionNavigate();
  return (
    <Link
      href={href}
      scroll={false}
      {...props}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (href.startsWith("http") || href.startsWith("mailto:")) return;
        e.preventDefault();
        navigate(href, keep);
      }}
    />
  );
}
