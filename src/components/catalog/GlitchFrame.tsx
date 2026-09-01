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

const IDLE_WAIT_MS = () => Math.random() * 5000;
const HOVER_GAP_MS = () => 450 + Math.random() * 550;
const FRAME_MS = () => 70 + Math.random() * 50;

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

function useRandomTears(hovered: boolean, reducedMotion: boolean) {
  const [cyan, setCyan] = useState<Slice | null>(null);
  const [magenta, setMagenta] = useState<Slice | null>(null);
  const idleConsumed = useRef(false);

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let timer = 0;

    const hide = () => {
      setCyan(null);
      setMagenta(null);
    };

    const show = () => {
      setCyan(randomSlice());
      setMagenta(randomSlice());
    };

    const burstThen = (next: () => void) => {
      show();
      timer = window.setTimeout(() => {
        if (cancelled) return;
        show();
        timer = window.setTimeout(() => {
          if (cancelled) return;
          hide();
          next();
        }, FRAME_MS());
      }, FRAME_MS());
    };

    const waitHover = () => {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        burstThen(waitHover);
      }, HOVER_GAP_MS());
    };

    if (hovered) {
      idleConsumed.current = true;
      timer = window.setTimeout(() => {
        if (cancelled) return;
        burstThen(waitHover);
      }, 40);
    } else if (!idleConsumed.current) {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        idleConsumed.current = true;
        burstThen(() => {});
      }, IDLE_WAIT_MS());
    } else {
      timer = window.setTimeout(() => {
        if (cancelled) return;
        hide();
      }, 0);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [hovered, reducedMotion]);

  return {
    cyan: reducedMotion ? null : cyan,
    magenta: reducedMotion ? null : magenta,
  };
}

/**
 * RGB tears over whatever it wraps. Each instance fires one idle burst on a
 * random timeout (within 5s). Hover cancels that timeout for good; further
 * bursts come from hover only.
 */
export function GlitchFrame({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const hovered = useHoverHost(rootRef);
  const { cyan, magenta } = useRandomTears(hovered, reducedMotion);

  return (
    <Box
      ref={rootRef}
      data-glitch-frame
      sx={{ position: "relative", display: "block", width: "100%", overflow: "hidden", ...sx }}
    >
      {children}
      {!reducedMotion && (
        <>
          <Layer content={children} slice={cyan} channel="cyan" />
          <Layer content={children} slice={magenta} channel="magenta" />
        </>
      )}
    </Box>
  );
}
