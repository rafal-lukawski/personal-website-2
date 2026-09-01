"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { hud } from "@/theme/hud";

type Slice = {
  top: number;
  height: number;
  x: number;
  skew: number;
};

type Trigger = "idle" | "hover";

/** Thin horizontal tear at a random Y, anywhere from the top edge to the bottom. */
function randomSlice(): Slice {
  const height = 4 + Math.random() * 4;
  const top = Math.random() * (100 - height);
  const dir = Math.random() < 0.5 ? -1 : 1;
  return {
    top,
    height,
    x: dir * (3 + Math.random() * 3),
    skew: dir * Math.random() * 2,
  };
}

function clipOf(slice: Slice | null) {
  if (!slice) {
    return { clipPath: "inset(0 0 100% 0)", transform: "none" };
  }
  return {
    clipPath: `inset(${slice.top}% -5px ${100 - slice.top - slice.height}% 0)`,
    transform: `translate3d(${slice.x}px, 0, 0) skewX(${slice.skew}deg)`,
  };
}

/** Second copy of the whole tree so RGB tears can span every nested image. */
function duplicate(node: ReactNode): ReactNode {
  return Children.map(node, (child) => {
    if (!isValidElement(child)) return child;
    const props = child.props as { children?: ReactNode; alt?: unknown; priority?: unknown };
    const extra: Record<string, unknown> = { "aria-hidden": true };
    if ("alt" in props) extra.alt = "";
    if ("priority" in props) extra.priority = false;
    return cloneElement(
      child as ReactElement,
      extra,
      props.children !== undefined ? duplicate(props.children) : undefined,
    );
  });
}

function Layer({
  content,
  slice,
  channel,
}: {
  content: ReactNode;
  slice: Slice | null;
  channel: "cyan" | "magenta";
}) {
  const cyan = channel === "cyan";
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        overflow: "hidden",
        pointerEvents: "none",
        filter: `drop-shadow(${cyan ? 2 : -2}px 0 color-mix(in srgb, ${cyan ? hud.cyan : hud.glitch} 55%, transparent))`,
        ...clipOf(slice),
      }}
    >
      {duplicate(content)}
    </Box>
  );
}

function useHoverHost(ref: RefObject<HTMLElement | null>) {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const host = node.closest("button") ?? node;
    const on = () => setHovered(true);
    const off = () => setHovered(false);
    host.addEventListener("pointerenter", on);
    host.addEventListener("pointerleave", off);
    return () => {
      host.removeEventListener("pointerenter", on);
      host.removeEventListener("pointerleave", off);
    };
  }, [ref]);

  return hovered;
}

function useRandomTears(active: boolean, hovered: boolean) {
  const [cyan, setCyan] = useState<Slice | null>(null);
  const [magenta, setMagenta] = useState<Slice | null>(null);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let timer = 0;

    const gap = () => (hovered ? 450 + Math.random() * 550 : 5500 + Math.random() * 3500);

    const flash = () => {
      if (cancelled) return;
      setCyan(randomSlice());
      setMagenta(randomSlice());
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setCyan(randomSlice());
        setMagenta(randomSlice());
        timer = window.setTimeout(() => {
          if (cancelled) return;
          setCyan(null);
          setMagenta(null);
          timer = window.setTimeout(flash, gap());
        }, 70 + Math.random() * 50);
      }, 70 + Math.random() * 50);
    };

    timer = window.setTimeout(flash, hovered ? 40 : 1800 + Math.random() * 2200);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [active, hovered]);

  return { cyan: active ? cyan : null, magenta: active ? magenta : null };
}

/**
 * RGB tears over whatever it wraps. Slice Y is random across the full height
 * on every burst. Wrap the whole shot (background + foreground) so the tear
 * spans the component, not just the inset screenshot.
 */
export function GlitchFrame({
  children,
  trigger,
  sx,
}: {
  children: ReactNode;
  trigger: Trigger;
  sx?: SxProps<Theme>;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const hovered = useHoverHost(rootRef);
  const active = !reducedMotion && (trigger === "idle" || hovered);
  const { cyan, magenta } = useRandomTears(active, hovered);

  return (
    <Box
      ref={rootRef}
      data-glitch-frame
      sx={{ position: "relative", display: "block", width: "100%", overflow: "hidden", ...sx }}
    >
      {children}
      {active && (
        <>
          <Layer content={children} slice={cyan} channel="cyan" />
          <Layer content={children} slice={magenta} channel="magenta" />
        </>
      )}
    </Box>
  );
}
