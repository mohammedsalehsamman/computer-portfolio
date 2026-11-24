import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { useMemo } from "react";
import { MathUtils, Vector3 } from "three";
import { useScene } from "@/state/scene";
import { CAMERA_FOV, INTRO_POS, SCREEN_CENTER, SCREEN_H, SCREEN_W, WIDE_LOOK, WIDE_POS } from "./layout";

const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function CameraRig() {
  const camera = useThree((st) => st.camera);
  const look = useMemo(() => INTRO_POS.clone().lerp(WIDE_LOOK, 0.9), []);
  const pos = useMemo(() => new Vector3(), []);
  const target = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    const view = useScene.getState().view;
    const aspect = state.size.width / state.size.height;
    const tanHalf = Math.tan(MathUtils.degToRad(CAMERA_FOV / 2));

    if (view === "screen") {
      // Fit the 4:3 glass with a small margin, whichever dimension is tighter.
      const fill = 0.94;
      const dH = SCREEN_H / fill / (2 * tanHalf);
      const dW = SCREEN_W / fill / (2 * tanHalf * aspect);
      pos.copy(SCREEN_CENTER).add(new Vector3(0, 0, Math.max(dH, dW)));
      target.copy(SCREEN_CENTER);
    } else if (view === "wide") {
      // Pull back on narrow windows so the whole desk stays in frame.
      const k = Math.max(1, 1.55 / aspect);
      pos.copy(WIDE_POS).sub(WIDE_LOOK).multiplyScalar(k).add(WIDE_LOOK);
      pos.x += state.pointer.x * 0.12;
      pos.y += state.pointer.y * 0.06;
      target.copy(WIDE_LOOK);
    } else {
      pos.copy(INTRO_POS);
      pos.x += Math.sin(state.clock.elapsedTime * 0.15) * 0.25;
      target.copy(WIDE_LOOK);
    }

    const t = reduced ? 0.001 : view === "screen" ? 0.45 : 0.75;
    easing.damp3(camera.position, pos, t, delta);
    easing.damp3(look, target, reduced ? 0.001 : 0.4, delta);
    camera.lookAt(look);
  });

  return null;
}
