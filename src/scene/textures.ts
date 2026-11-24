import { CanvasTexture, SRGBColorSpace } from "three";
import type { Phase } from "./daylight";

function canvasTexture(w: number, h: number, draw: (c: CanvasRenderingContext2D) => void) {
  const el = document.createElement("canvas");
  el.width = w;
  el.height = h;
  const c = el.getContext("2d")!;
  draw(c);
  const tex = new CanvasTexture(el);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** Original poster: big monogram, tagline, color blocks. */
export function posterTexture() {
  return canvasTexture(512, 720, (c) => {
    c.fillStyle = "#1c1630";
    c.fillRect(0, 0, 512, 720);
    const colors = ["#e0783f", "#b4567a", "#4a2f78", "#3e8e6a", "#f2c14e"];
    colors.forEach((col, i) => {
      c.fillStyle = col;
      c.fillRect(40 + i * 86, 60, 70, 70);
    });
    c.fillStyle = "#f4efe1";
    c.font = "bold 190px Georgia, serif";
    c.textAlign = "center";
    c.fillText("MSS", 256, 360);
    c.font = "600 34px Inter, sans-serif";
    c.fillText("BUILD · SHIP · TEST", 256, 450);
    c.strokeStyle = "#e0783f";
    c.lineWidth = 6;
    c.beginPath();
    c.moveTo(80, 500);
    c.lineTo(432, 500);
    c.stroke();
    c.font = "26px Inter, sans-serif";
    c.fillStyle = "#cfc6e6";
    c.fillText("DAMASCUS  —  2026", 256, 560);
    for (let i = 0; i < 18; i++) {
      c.fillStyle = i % 2 ? "#2d2450" : "#3a2f66";
      c.fillRect(i * 29, 640, 29, 80);
    }
  });
}

/** Sticky note stuck to the monitor bezel. */
export function noteTexture() {
  return canvasTexture(256, 256, (c) => {
    c.fillStyle = "#f6dd6a";
    c.fillRect(0, 0, 256, 256);
    c.fillStyle = "#e9c94f";
    c.fillRect(0, 0, 256, 40);
    c.fillStyle = "#3a3220";
    c.font = "bold 40px 'Comic Sans MS', 'Segoe Print', cursive";
    c.textAlign = "center";
    c.fillText("ship it", 128, 120);
    c.fillText("+ tests!", 128, 180);
  });
}

const SKY: Record<Phase, { top: string; bottom: string; stars: number; body: { color: string; x: number; y: number; r: number; glow?: string }; city: string; lit: number }> = {
  night: { top: "#0b1030", bottom: "#2c2350", stars: 140, body: { color: "#f3eccb", x: 380, y: 120, r: 40 }, city: "#151738", lit: 0.28 },
  dawn: { top: "#3b4a8a", bottom: "#f2a65a", stars: 25, body: { color: "#ffd9a0", x: 120, y: 330, r: 46, glow: "#ffb87a" }, city: "#2b2a4a", lit: 0.12 },
  day: { top: "#4f9fe0", bottom: "#c4e6ff", stars: 0, body: { color: "#fff6c8", x: 390, y: 95, r: 42, glow: "#fff3b0" }, city: "#5b6b93", lit: 0 },
  dusk: { top: "#2c2350", bottom: "#e0783f", stars: 15, body: { color: "#ffb36b", x: 400, y: 320, r: 50, glow: "#ff8a4c" }, city: "#24203f", lit: 0.2 },
};

/** Seeded random so the skyline stays the same across phases. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a * 1664525 + 1013904223) >>> 0;
    return a / 4294967296;
  };
}

/** The view through the window for a time of day. */
export function skyTexture(phase: Phase) {
  const p = SKY[phase];
  return canvasTexture(512, 512, (c) => {
    const rand = seeded(7);
    const g = c.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, p.top);
    g.addColorStop(1, p.bottom);
    c.fillStyle = g;
    c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < p.stars; i++) {
      c.fillStyle = `rgba(255,255,255,${0.3 + rand() * 0.7})`;
      c.beginPath();
      c.arc(rand() * 512, rand() * 300, rand() * 1.6, 0, Math.PI * 2);
      c.fill();
    }
    const b = p.body;
    if (b.glow) {
      const halo = c.createRadialGradient(b.x, b.y, b.r * 0.6, b.x, b.y, b.r * 3);
      halo.addColorStop(0, `${b.glow}aa`);
      halo.addColorStop(1, `${b.glow}00`);
      c.fillStyle = halo;
      c.fillRect(0, 0, 512, 512);
    }
    c.fillStyle = b.color;
    c.beginPath();
    c.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    c.fill();
    if (phase === "day") {
      c.fillStyle = "rgba(255,255,255,0.85)";
      for (const [cx, cy, s] of [
        [110, 120, 1],
        [250, 70, 0.7],
        [180, 210, 0.85],
      ])
        for (const [dx, dy, r] of [
          [0, 0, 26],
          [26, -8, 22],
          [-24, 4, 18],
          [48, 6, 16],
        ]) {
          c.beginPath();
          c.arc(cx + dx * s, cy + dy * s, r * s, 0, Math.PI * 2);
          c.fill();
        }
    }
    // Skyline silhouette with lit windows after dark.
    let x = 0;
    while (x < 512) {
      const w = 30 + rand() * 50;
      const h = 60 + rand() * 120;
      c.fillStyle = p.city;
      c.fillRect(x, 512 - h, w, h);
      c.fillStyle = "#f2c14e";
      for (let wy = 512 - h + 10; wy < 500; wy += 18)
        for (let wx = x + 6; wx < x + w - 6; wx += 12) if (rand() < p.lit) c.fillRect(wx, wy, 5, 7);
      x += w + 4;
    }
  });
}
