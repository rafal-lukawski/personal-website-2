"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TouchEvent } from "react";
import type { CatalogProject } from "./useProjects";

export type LightboxController = ReturnType<typeof useLightbox>;

/** Horizontal travel a swipe needs before it counts as a page turn. */
const SWIPE_MIN = 48;

/**
 * Owns which screenshot is on screen. Everything the dialog needs is derived
 * from the `{ projectId, index }` pair, so the state stays valid even when the
 * project list is re-created on a locale change.
 */
export function useLightbox(projects: readonly CatalogProject[]) {
  const [target, setTarget] = useState<{ projectId: string; index: number } | null>(null);

  const open = useCallback((projectId: string, index = 0) => setTarget({ projectId, index }), []);
  const close = useCallback(() => setTarget(null), []);
  const select = useCallback(
    (index: number) => setTarget((current) => (current ? { ...current, index } : current)),
    [],
  );

  const step = useCallback(
    (dir: -1 | 1) => {
      setTarget((current) => {
        if (!current) return current;
        const project = projects.find((item) => item.id === current.projectId);
        if (!project) return current;
        const length = project.screenshots.length;
        return { projectId: current.projectId, index: (current.index + dir + length) % length };
      });
    },
    [projects],
  );

  const swipeFrom = useRef<{ x: number; y: number } | null>(null);

  /**
   * Touch paging. MUI ships no gesture handling outside `SwipeableDrawer`, so
   * the dialog needs its own; spread these onto whatever should accept swipes.
   */
  const swipeHandlers = useMemo(
    () => ({
      onTouchStart: (event: TouchEvent<HTMLElement>) => {
        const touch = event.touches[0];
        swipeFrom.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
      },
      onTouchEnd: (event: TouchEvent<HTMLElement>) => {
        const from = swipeFrom.current;
        swipeFrom.current = null;
        const touch = event.changedTouches[0];
        if (!from || !touch) return;
        const dx = touch.clientX - from.x;
        const dy = touch.clientY - from.y;
        // A drag that travels further vertically is the page being scrolled,
        // not a page turn.
        if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) <= Math.abs(dy)) return;
        step(dx < 0 ? 1 : -1);
      },
    }),
    [step],
  );

  useEffect(() => {
    if (!target) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      step(event.key === "ArrowLeft" ? -1 : 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [target, step]);

  const project = target ? projects.find((item) => item.id === target.projectId) ?? null : null;
  const shot = project && target ? project.screenshots[target.index] ?? null : null;

  return {
    project,
    shot,
    index: target?.index ?? 0,
    isOpen: Boolean(project && shot),
    open,
    close,
    select,
    step,
    swipeHandlers,
  };
}
