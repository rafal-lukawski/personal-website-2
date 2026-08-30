import { hudDark } from "@/theme/hud";

type Particle = {
  x: number;
  y: number;
  z: number;
  sx: number;
  sy: number;
  r: number;
};

/** Opt-in: only a literal `true` runs the animation. Empty, missing or anything else = off. */
export const PARTICLES_ENABLED = process.env.NEXT_PUBLIC_ENABLE_PARTICLES === "true";

const MAX_DISTANCE = 120;
const MAX_DISTANCE_SQ = MAX_DISTANCE * MAX_DISTANCE;
/** Per viewport-sized area; the canvas spans the whole document, so it scales up with page height. */
const PARTICLE_COUNT = 80;
const PARTICLE_COUNT_MAX = 240;
const SPEED = 0.28;
const GRAVITY = 40;
const GRAVITY_MIN_DISTANCE = 40;
const GRAVITY_MIN_DISTANCE_SQ = GRAVITY_MIN_DISTANCE * GRAVITY_MIN_DISTANCE;

function hexToRgb(hex: string): [number, number, number] | null {
  const h = hex.trim().replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = Number.parseInt(full.slice(0, 6), 16);
  if (Number.isNaN(n)) return null;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Used until `--mui-palette-hud-cyan` can be read off the document (first paint, detached canvas). */
const FALLBACK_RGB: [number, number, number] = hexToRgb(hudDark.cyan) ?? [0, 0, 0];

export class ParticleSim {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private w = 0;
  private h = 0;
  private raf = 0;
  private running = false;
  private rgb: [number, number, number] = FALLBACK_RGB;
  private readonly pair: [number, number, number, number] = [-1, 0, -1, 0];
  private resizeTimer = 0;
  private readonly onResize = () => {
    window.clearTimeout(this.resizeTimer);
    this.resizeTimer = window.setTimeout(() => this.resize(), 80);
  };
  private readonly onVisibility = () => {
    if (document.hidden) {
      this.hasPointer = false;
      this.stopLoop();
    } else {
      this.startLoop();
    }
  };
  private resizeObserver = new ResizeObserver(this.onResize);
  private docLeft = 0;
  private docTop = 0;
  private drawnTop = 0;
  private drawnBottom = 0;
  private mx = 0;
  private my = 0;
  private hasPointer = false;
  private readonly onPointerMove = (e: PointerEvent) => {
    this.mx = e.pageX - this.docLeft;
    this.my = e.pageY - this.docTop;
    this.hasPointer = true;
  };
  private readonly onPointerLeave = () => {
    this.hasPointer = false;
  };
  /** `relatedTarget` is null only when the pointer leaves the document for good. */
  private readonly onPointerOut = (e: PointerEvent) => {
    if (!e.relatedTarget) this.hasPointer = false;
  };
  private themeObserver = new MutationObserver(() => this.syncColor());

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) throw new Error("2d context");
    this.ctx = ctx;
  }

  start() {
    this.syncColor();
    this.resize(true);
    this.resizeObserver.observe(this.canvas);
    window.addEventListener("resize", this.onResize, { passive: true });
    window.addEventListener("pointermove", this.onPointerMove, { passive: true });
    // Each of these misses some way of leaving; together they cover window chrome,
    // a second monitor, alt-tab, devtools and iframes.
    window.addEventListener("blur", this.onPointerLeave);
    document.addEventListener("pointerout", this.onPointerOut, { passive: true });
    document.documentElement.addEventListener("mouseleave", this.onPointerLeave);
    document.addEventListener("visibilitychange", this.onVisibility);
    this.themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    this.startLoop();
  }

  destroy() {
    this.stopLoop();
    window.clearTimeout(this.resizeTimer);
    this.resizeObserver.disconnect();
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("blur", this.onPointerLeave);
    document.removeEventListener("pointerout", this.onPointerOut);
    document.documentElement.removeEventListener("mouseleave", this.onPointerLeave);
    document.removeEventListener("visibilitychange", this.onVisibility);
    this.themeObserver.disconnect();
  }

  private syncColor() {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(
      "--mui-palette-hud-cyan",
    );
    this.rgb = hexToRgb(raw) ?? FALLBACK_RGB;
  }

  private resize(seed = false) {
    const rect = this.canvas.getBoundingClientRect();
    const nextW = Math.max(1, Math.round(rect.width));
    const nextH = Math.max(1, Math.round(rect.height));
    this.docLeft = rect.left + window.scrollX;
    this.docTop = rect.top + window.scrollY;
    const sx = this.w ? nextW / this.w : 1;
    const sy = this.h ? nextH / this.h : 1;
    this.w = nextW;
    this.h = nextH;
    this.canvas.width = nextW;
    this.canvas.height = nextH;
    this.drawnTop = 0;
    this.drawnBottom = 0;
    if (seed || this.particles.length !== this.targetCount()) {
      this.generate();
      return;
    }
    for (const p of this.particles) {
      p.x *= sx;
      p.y *= sy;
    }
  }

  private targetCount() {
    const viewport = window.innerWidth * window.innerHeight;
    const scaled = PARTICLE_COUNT * Math.max(1, (this.w * this.h) / Math.max(1, viewport));
    return Math.min(Math.round(scaled), PARTICLE_COUNT_MAX);
  }

  private generate() {
    const count = this.targetCount();
    this.particles = new Array(count);
    for (let i = 0; i < count; i++) {
      const speed = (Math.random() * 1 + 0.35) * SPEED;
      const direction = Math.PI * 2 * Math.random();
      const z = Math.random() * 8;
      this.particles[i] = {
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        z,
        sx: Math.sin(direction) * speed,
        sy: Math.cos(direction) * speed,
        r: 1.4 + z * 0.18,
      };
    }
  }

  private startLoop() {
    if (this.running) return;
    this.running = true;
    const tick = () => {
      if (!this.running) return;
      this.frame();
      this.raf = window.requestAnimationFrame(tick);
    };
    this.raf = window.requestAnimationFrame(tick);
  }

  private stopLoop() {
    this.running = false;
    window.cancelAnimationFrame(this.raf);
  }

  private nearestTwo(ci: number, out: [number, number, number, number]) {
    let d1 = MAX_DISTANCE_SQ + 1;
    let d2 = MAX_DISTANCE_SQ + 1;
    let i1 = -1;
    let i2 = -1;
    const p = this.particles[ci];
    const list = this.particles;
    for (let i = 0; i < list.length; i++) {
      if (i === ci) continue;
      const q = list[i];
      const dx = p.x - q.x;
      const dy = p.y - q.y;
      const dSq = dx * dx + dy * dy;
      if (dSq > MAX_DISTANCE_SQ) continue;
      if (dSq < d1) {
        d2 = d1;
        i2 = i1;
        d1 = dSq;
        i1 = i;
      } else if (dSq < d2) {
        d2 = dSq;
        i2 = i;
      }
    }
    out[0] = i1;
    out[1] = d1;
    out[2] = i2;
    out[3] = d2;
  }

  private frame() {
    const { ctx, particles, w, h, rgb } = this;

    const scrolled = window.scrollY - this.docTop;
    const top = Math.max(0, scrolled - MAX_DISTANCE);
    const bottom = Math.min(h, scrolled + window.innerHeight + MAX_DISTANCE);
    const clearTop = Math.min(top, this.drawnTop);
    const clearBottom = Math.max(bottom, this.drawnBottom);
    ctx.clearRect(0, clearTop, w, clearBottom - clearTop);
    this.drawnTop = top;
    this.drawnBottom = bottom;

    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    ctx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

    const pair = this.pair;
    const invMax = 1 / MAX_DISTANCE;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.y < top || p.y > bottom) continue;
      this.nearestTwo(i, pair);
      for (let k = 0; k < 2; k++) {
        const ni = pair[k * 2];
        const dSq = pair[k * 2 + 1];
        if (ni < 0) continue;
        const q = particles[ni];
        ctx.globalAlpha = (1 - Math.sqrt(dSq) * invMax) * 0.45;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (p.y < top || p.y > bottom) continue;
      ctx.globalAlpha = 0.28 + (1 - p.z / 8) * 0.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      if (this.hasPointer) {
        const dx = this.mx - p.x;
        const dy = this.my - p.y;
        const dSq = dx * dx + dy * dy;
        if (dSq > 1) {
          const dist = Math.sqrt(dSq);
          const mag = GRAVITY / Math.max(dSq, GRAVITY_MIN_DISTANCE_SQ);
          p.sx += (dx / dist) * mag;
          p.sy += (dy / dist) * mag;
        }
      }
      p.x += p.sx;
      p.y += p.sy;
      if (p.x < -p.r) p.x = w + p.r;
      else if (p.x > w + p.r) p.x = -p.r;
      if (p.y < -p.r) p.y = h + p.r;
      else if (p.y > h + p.r) p.y = -p.r;
    }
  }
}
