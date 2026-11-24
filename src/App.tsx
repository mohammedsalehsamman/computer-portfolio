import { lazy, Suspense, useEffect, useState } from "react";
import { BootScreen } from "./boot/BootScreen";
import { Hud } from "./boot/Hud";
import { detectMode } from "./hooks/useMode";
import { OS } from "./os/OS";
import { useScene } from "./state/scene";

const Scene = lazy(() => import("./scene/Scene"));

export default function App() {
  const [mode] = useState(detectMode);

  useEffect(() => {
    if (mode === "2d") useScene.getState().setReady();
  }, [mode]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && useScene.getState().view === "screen") useScene.getState().setView("wide");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {mode === "3d" ? (
        <main className="stage">
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <Hud />
        </main>
      ) : (
        <OS mode="fullscreen" />
      )}
      <BootScreen />
    </>
  );
}
