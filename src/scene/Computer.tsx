import { Html, RoundedBox } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef, useState, type RefObject } from "react";
import type { MeshStandardMaterial } from "three";
import { OS } from "@/os/OS";
import { sfx } from "@/sound/sfx";
import { useScene } from "@/state/scene";
import { s } from "@/i18n/strings";
import { Clickable } from "./Clickable";
import { DESK_Y, HTML_DISTANCE_FACTOR, MONITOR_POS, SCREEN_H, SCREEN_OFFSET_Y, SCREEN_W, SCREEN_Z } from "./layout";
import { noteTexture } from "./textures";

const plastic = "#d8cfb8";
const plasticDark = "#b9af97";

function SystemUnit() {
  const ledRef = useRef<MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (ledRef.current) ledRef.current.emissiveIntensity = Math.sin(clock.elapsedTime * 9) > 0.6 ? 2.5 : 0.4;
  });
  return (
    <group position={[0, DESK_Y + 0.065, -0.1]}>
      <RoundedBox args={[0.5, 0.13, 0.44]} radius={0.012} smoothness={3} castShadow receiveShadow>
        <meshStandardMaterial color={plastic} roughness={0.55} />
      </RoundedBox>
      {/* Floppy drive */}
      <mesh position={[0.11, 0.015, 0.221]}>
        <boxGeometry args={[0.16, 0.035, 0.004]} />
        <meshStandardMaterial color={plasticDark} roughness={0.6} />
      </mesh>
      <mesh position={[0.11, 0.02, 0.2235]}>
        <boxGeometry args={[0.12, 0.006, 0.002]} />
        <meshStandardMaterial color="#1c1a16" />
      </mesh>
      {/* Vent grille */}
      {Array.from({ length: 7 }, (_, i) => (
        <mesh key={i} position={[-0.17 + i * 0.016, 0, 0.2225]}>
          <boxGeometry args={[0.007, 0.06, 0.002]} />
          <meshStandardMaterial color="#8f8672" />
        </mesh>
      ))}
      {/* Power button + LEDs */}
      <mesh position={[-0.02, -0.025, 0.223]}>
        <boxGeometry args={[0.03, 0.02, 0.006]} />
        <meshStandardMaterial color={plasticDark} />
      </mesh>
      <mesh position={[0.02, -0.03, 0.222]}>
        <sphereGeometry args={[0.004, 10, 10]} />
        <meshStandardMaterial color="#7cfc9a" emissive="#7cfc9a" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.035, -0.03, 0.222]}>
        <sphereGeometry args={[0.004, 10, 10]} />
        <meshStandardMaterial ref={ledRef} color="#ffb347" emissive="#ffb347" emissiveIntensity={1} />
      </mesh>
    </group>
  );
}

type Portal = { portal: RefObject<HTMLDivElement> };

function Monitor({ portal }: Portal) {
  const view = useScene((st) => st.view);
  const booted = useScene((st) => st.booted);
  const [hover, setHover] = useState(false);
  const note = useMemo(() => noteTexture(), []);
  const interactive = booted && view !== "screen";

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (!interactive) return;
    e.stopPropagation();
    sfx.click();
    useScene.getState().setView("screen");
  };

  const pointer = (on: boolean) => (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHover(on && interactive);
    document.body.style.cursor = on && interactive ? "pointer" : "";
  };

  return (
    <group position={MONITOR_POS} onClick={onClick} onPointerOver={pointer(true)} onPointerOut={pointer(false)}>
      {/* Front bezel */}
      <RoundedBox args={[0.44, 0.36, 0.05]} radius={0.018} smoothness={4} castShadow receiveShadow>
        <meshStandardMaterial color={plastic} roughness={0.5} emissive="#ffffff" emissiveIntensity={hover ? 0.04 : 0} />
      </RoundedBox>
      {/* Tube housing */}
      <RoundedBox args={[0.4, 0.32, 0.22]} radius={0.03} smoothness={4} position={[0, -0.005, -0.13]} castShadow>
        <meshStandardMaterial color={plastic} roughness={0.55} />
      </RoundedBox>
      <RoundedBox args={[0.27, 0.22, 0.14]} radius={0.03} smoothness={4} position={[0, 0, -0.3]} castShadow>
        <meshStandardMaterial color={plasticDark} roughness={0.6} />
      </RoundedBox>
      {/* Glass recess */}
      <mesh position={[0, SCREEN_OFFSET_Y, 0.0255]}>
        <planeGeometry args={[SCREEN_W + 0.02, SCREEN_H + 0.02]} />
        <meshStandardMaterial color="#3d3a33" roughness={0.7} />
      </mesh>
      <mesh position={[0, SCREEN_OFFSET_Y, SCREEN_Z - 0.0004]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial color="#07110c" />
      </mesh>
      {/* Badge, knobs, power LED */}
      <mesh position={[-0.15, -0.155, 0.026]}>
        <boxGeometry args={[0.06, 0.012, 0.002]} />
        <meshStandardMaterial color="#8f8672" metalness={0.4} roughness={0.4} />
      </mesh>
      {[0.09, 0.115, 0.14].map((x) => (
        <mesh key={x} position={[x, -0.155, 0.028]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.007, 0.007, 0.008, 14]} />
          <meshStandardMaterial color={plasticDark} roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0.17, -0.155, 0.027]}>
        <sphereGeometry args={[0.005, 12, 12]} />
        <meshStandardMaterial color="#7cfc9a" emissive="#7cfc9a" emissiveIntensity={booted ? 3 : 0.3} />
      </mesh>
      {/* Sticky note on the bezel corner → Resume */}
      <Clickable
        label={s.room.note}
        onActivate={() => useScene.getState().openFromRoom("resume")}
        position={[0.205, 0.15, 0.027]}
        rotation={[0, 0, -0.18]}
      >
        <mesh>
          <planeGeometry args={[0.055, 0.055]} />
          <meshStandardMaterial map={note} roughness={0.9} />
        </mesh>
      </Clickable>

      {/* The OS lives on the glass as real DOM. */}
      <Html
        transform
        portal={portal}
        distanceFactor={HTML_DISTANCE_FACTOR}
        position={[0, SCREEN_OFFSET_Y, SCREEN_Z]}
        zIndexRange={[10, 0]}
        className="screen-html"
      >
        <OS mode="embedded" />
      </Html>

      {/* Stand */}
      <mesh position={[0, -0.2, -0.1]} castShadow>
        <boxGeometry args={[0.12, 0.04, 0.12]} />
        <meshStandardMaterial color={plasticDark} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.222, -0.1]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.14, 0.012, 32]} />
        <meshStandardMaterial color={plastic} roughness={0.55} />
      </mesh>
    </group>
  );
}

export function Computer({ portal }: Portal) {
  return (
    <group>
      <SystemUnit />
      <Monitor portal={portal} />
    </group>
  );
}
