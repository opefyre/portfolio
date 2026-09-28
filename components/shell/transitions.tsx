"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useLayoutEffect, type ComponentProps, type MouseEvent } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollStore } from "./SmoothScroll";

/**
 * View Transition navigation.
 *
 * Clicking a project should feel like opening the same object: elements that
 * share a `view-transition-name` on both pages (e.g. `work-vrolen`) morph
 * into each other while the rest of the page recedes. Falls back to a normal
 * navigation where the API is missing or motion is reduced.
 */
const pending: { resolve: (() => void) | null } = { resolve: null };

function canTransition() {
  if (typeof document === "undefined") return false;
  if (!("startViewTransition" in document)) return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Mounted once in the root layout: completes transitions & resets scroll on route change. */
export function RouteChangeHandler() {
  const pathname = usePathname();
  useLayoutEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    if (target instanceof HTMLElement) {
      scrollStore.lenis?.scrollTo(target, { immediate: true, force: true, offset: -88 });
    } else {
      window.scrollTo(0, 0);
      scrollStore.lenis?.scrollTo(0, { immediate: true, force: true });
    }
    pending.resolve?.();
    pending.resolve = null;
    // Layout changed under ScrollTrigger — recompute after paint.
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);
  return null;
}

export function useTransitionNavigate() {
  const router = useRouter();
  const pathname = usePathname();
  return useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href);
      const samePath = url.pathname.replace(/\/$/, "") === pathname.replace(/\/$/, "");
      if (samePath || !canTransition()) {
        router.push(href);
        return;
      }
      document.startViewTransition(
        () =>
          new Promise<void>((resolve) => {
            pending.resolve = resolve;
            router.push(href);
            // Safety net: never leave the page frozen if the route change stalls.
            setTimeout(resolve, 1800);
          }),
      );
    },
    [router, pathname],
  );
}

/** next/link with a View Transition. Modifier-clicks behave like a normal link. */
export function TLink({ href, onClick, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const navigate = useTransitionNavigate();
  return (
    <Link
      href={href}
      {...props}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (href.startsWith("http") || href.startsWith("mailto:")) return;
        e.preventDefault();
        navigate(href);
      }}
    />
  );
}
