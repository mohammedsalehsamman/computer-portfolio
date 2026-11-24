import { create } from "zustand";

export type View = "intro" | "wide" | "screen";

type SceneState = {
  /** The visitor dismissed the boot screen. */
  booted: boolean;
  /** The 3D scene rendered its first frame (2D mode marks this right away). */
  ready: boolean;
  view: View;
  /** Bumped to restart the OS (splash + welcome window). */
  osSession: number;
  boot: () => void;
  setReady: () => void;
  setView: (v: View) => void;
  restartOS: () => void;
};

export const useScene = create<SceneState>((set) => ({
  booted: false,
  ready: false,
  view: "intro",
  osSession: 0,
  boot: () => set({ booted: true, view: "wide" }),
  setReady: () => set({ ready: true }),
  setView: (view) => set({ view }),
  restartOS: () => set((st) => ({ osSession: st.osSession + 1 })),
}));
