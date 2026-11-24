import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { ACESFilmicToneMapping } from "three";
import { useScene } from "@/state/scene";
import { CameraRig } from "./CameraRig";
import { Computer } from "./Computer";
import { PHASES, usePhase, type Phase } from "./daylight";
import { Desk } from "./Desk";
import { CAMERA_FOV, INTRO_POS, SCREEN_CENTER } from "./layout";
import { Props } from "./Props";
import { Room } from "./Room";

function Lights({ phase }: { phase: Phase }) {
  const p = PHASES[phase];
  return (
    <>
      <ambientLight intensity={p.ambient.intensity} color={p.ambient.color} />
      <hemisphereLight args={[p.hemi.sky, p.hemi.ground, p.hemi.intensity]} />
      {/* Moonlight or sunlight from the window */}
      <directionalLight position={[-2.5, 3, 1.5]} intensity={p.dir.intensity} color={p.dir.color} />
      {/* Glow spilling from the CRT */}
      <pointLight position={[SCREEN_CENTER.x, SCREEN_CENTER.y, SCREEN_CENTER.z + 0.2]} intensity={0.9} distance={1.6} decay={1.8} color="#8fd8ff" />
    </>
  );
}

export default function Scene() {
  // A stable container for the on-screen OS. Without it drei's <Html> re-targets once
  // R3F's events connect, and the remount race leaves the OS root empty.
  const portal = useRef<HTMLDivElement>(null!);
  const phase = usePhase();
  return (
    <>
      <Canvas
        className="scene-canvas"
        shadows
        dpr={[1, 1.75]}
        camera={{ fov: CAMERA_FOV, near: 0.02, far: 30, position: INTRO_POS.toArray() }}
        gl={{ antialias: true, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        onCreated={() => requestAnimationFrame(() => useScene.getState().setReady())}
        onPointerMissed={() => useScene.getState().setHovered(null)}
      >
        <color attach="background" args={["#0d0b12"]} />
        <fog attach="fog" args={["#0d0b12", 3.5, 9]} />
        <Lights phase={phase} />
        <Room phase={phase} />
        <Desk />
        <Computer portal={portal} />
        <Props />
        <CameraRig />
      </Canvas>
      <div ref={portal} className="html-layer" />
    </>
  );
}
