"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";
import { lensStore } from "./lensStore";

/**
 * Registry of text fragments rendered in WebGL so the lens can genuinely
 * refract them. The DOM element provides layout (and the accessible text);
 * the stage mirrors it into the scene every frame.
 */
export type FragmentStyle = "display" | "serif" | "mono" | "chip";

export type FragmentEntry = {
  key: string;
  el: HTMLElement;
  surface: string;
  through: string;
  style: FragmentStyle;
};

let entries: FragmentEntry[] = [];
const listeners = new Set<() => void>();
const emit = () => {
  lensStore.dirty = true;
  listeners.forEach((l) => l());
};

export function useFragmentEntries() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => entries,
    () => entries,
  );
}

export function useLensFragment(
  ref: RefObject<HTMLElement | null>,
  key: string,
  surface: string,
  through: string,
  style: FragmentStyle,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const entry: FragmentEntry = { key, el, surface, through, style };
    entries = [...entries.filter((e) => e.key !== key), entry];
    emit();
    return () => {
      entries = entries.filter((e) => e !== entry);
      emit();
    };
  }, [ref, key, surface, through, style]);
}
