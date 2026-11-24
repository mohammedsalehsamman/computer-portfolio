import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { easing } from "maath";
import { useRef, type ReactNode } from "react";
import type { Group } from "three";
import type { L } from "@/content/types";
import { sfx } from "@/sound/sfx";
import { useScene } from "@/state/scene";

type Props = {
  label: L;
  onActivate: () => void;
  children: ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
};

const active = () => {
  const st = useScene.getState();
  return st.booted && st.view === "wide";
};

/** A room object that reacts to hover (label in the HUD, gentle grow) and clicks. Only live in the wide view. */
export function Clickable({ label, onActivate, children, position, rotation }: Props) {
  const ref = useRef<Group>(null);
  const hover = useRef(false);

  useFrame((_, delta) => {
    const g = ref.current;
    if (!g) return;
    const k = hover.current && active() ? 1.07 : 1;
    easing.damp3(g.scale, [k, k, k], 0.12, delta);
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!active()) return;
    hover.current = true;
    useScene.getState().setHovered(label);
    document.body.style.cursor = "pointer";
  };
  const out = () => {
    hover.current = false;
    if (useScene.getState().hovered === label) useScene.getState().setHovered(null);
    document.body.style.cursor = "";
  };
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!active()) return;
    sfx.click();
    hover.current = false;
    document.body.style.cursor = "";
    onActivate();
  };

  return (
    <group ref={ref} position={position} rotation={rotation} onPointerOver={over} onPointerOut={out} onClick={click}>
      {children}
    </group>
  );
}
