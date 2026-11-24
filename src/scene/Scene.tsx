import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import { ACESFilmicToneMapping } from "three";
import { useScene } from "@/state/scene";
import { CameraRig } from "./CameraRig";
import { Computer } from "./Computer";
import { Desk } from "./Desk";
import { CAMERA_FOV, INTRO_POS, SCREEN_CENTER } from "./layout";
import { Props } from "./Props";
import { Room } from "./Room";

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#7d7fb0" />
      <hemisphereLight args={["#9aa6ff", "#2a1d14", 0.45]} />
      {/* Cool moonlight from the window */}
      <directionalLight position={[-2.5, 3, 1.5]} intensity={0.5} color="#a9b8ff" />
      {/* Glow spilling from the CRT */}
      <pointLight position={[SCREEN_CENTER.x, SCREEN_CENTER.y, SCREEN_CENTER.z + 0.2]} intensity={0.9} distance={1.6} decay={1.8} color="#8fd8ff" />
    </>
  );
}

export default function Scene() {
  // A stable container for the on-screen OS. Without it drei's <Html> re-targets once
  // R3F's events connect, and the remount race leaves the OS root empty.
  const portal = useRef<HTMLDivElement>(null!);
  return (
    <>
    <Canvas
      className="scene-canvas"
      shadows
      dpr={[1, 1.75]}
      camera={{ fov: CAMERA_FOV, near: 0.02, far: 30, position: INTRO_POS.toArray() }}
      gl={{ antialias: true, toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
      onCreated={() => requestAnimationFrame(() => useScene.getState().setReady())}
    >
      <color attach="background" args={["#0d0b12"]} />
      <fog attach="fog" args={["#0d0b12", 3.5, 9]} />
      <Lights />
      <Room />
      <Desk />
      <Computer portal={portal} />
      <Props />
      <CameraRig />
    </Canvas>
    <div ref={portal} className="html-layer" />
    </>
  );
}
