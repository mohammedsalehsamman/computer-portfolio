import { CanvasTexture, SRGBColorSpace } from "three";

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

/** Night sky seen through the window. */
export function skyTexture() {
  return canvasTexture(512, 512, (c) => {
    const g = c.createLinearGradient(0, 0, 0, 512);
    g.addColorStop(0, "#0b1030");
    g.addColorStop(1, "#2c2350");
    c.fillStyle = g;
    c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 140; i++) {
      c.fillStyle = `rgba(255,255,255,${0.3 + Math.random() * 0.7})`;
      const r = Math.random() * 1.6;
      c.beginPath();
      c.arc(Math.random() * 512, Math.random() * 380, r, 0, Math.PI * 2);
      c.fill();
    }
    c.fillStyle = "#f3eccb";
    c.beginPath();
    c.arc(380, 120, 40, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#151738";
    // Skyline silhouette
    let x = 0;
    while (x < 512) {
      const w = 30 + Math.random() * 50;
      const h = 60 + Math.random() * 120;
      c.fillRect(x, 512 - h, w, h);
      c.fillStyle = "#f2c14e";
      for (let wy = 512 - h + 10; wy < 500; wy += 18)
        for (let wx = x + 6; wx < x + w - 6; wx += 12) if (Math.random() > 0.72) c.fillRect(wx, wy, 5, 7);
      c.fillStyle = "#151738";
      x += w + 4;
    }
  });
}
