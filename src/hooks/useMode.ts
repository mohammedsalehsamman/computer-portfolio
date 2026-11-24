export type RenderMode = "3d" | "2d";

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * The 3D desk scene runs on desktop-class devices. Phones, touch-only tablets and browsers
 * without WebGL get the OS full-screen. `?mode=2d` or `?mode=3d` overrides the choice.
 */
export function detectMode(): RenderMode {
  const q = new URLSearchParams(window.location.search).get("mode");
  if (q === "2d" || q === "3d") return q;
  const small = window.matchMedia("(max-width: 767px), (max-height: 480px)").matches;
  const touchOnly =
    window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(any-pointer: fine)").matches;
  if (small || touchOnly || !hasWebGL()) return "2d";
  return "3d";
}
