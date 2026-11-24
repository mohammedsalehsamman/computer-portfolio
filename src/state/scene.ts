import { create } from "zustand";
import type { L } from "@/content/types";
import type { AppId } from "@/os/registry";
import { useWindows } from "@/os/windowStore";

export type View = "intro" | "wide" | "screen";

type SceneState = {
  /** The visitor dismissed the boot screen. */
  booted: boolean;
  /** The 3D scene rendered its first frame (2D mode marks this right away). */
  ready: boolean;
  view: View;
  /** Bumped to restart the OS (splash + welcome window). */
  osSession: number;
  /** Label of the room object under the pointer, shown in the HUD. */
  hovered: L | null;
  lampOn: boolean;
  /** Screensaver showing on the OS. */
  saver: boolean;
  boot: () => void;
  setReady: () => void;
  setView: (v: View) => void;
  restartOS: () => void;
  setHovered: (l: L | null) => void;
  toggleLamp: () => void;
  setSaver: (on: boolean) => void;
  /** Click on a room object: sit down at the computer and open the matching app. */
  openFromRoom: (app: AppId) => void;
};

export const useScene = create<SceneState>((set) => ({
  booted: false,
  ready: false,
  view: "intro",
  osSession: 0,
  hovered: null,
  lampOn: true,
  saver: false,
  boot: () => set({ booted: true, view: "wide" }),
  setReady: () => set({ ready: true }),
  setView: (view) => set({ view, hovered: null }),
  restartOS: () => set((st) => ({ osSession: st.osSession + 1 })),
  setHovered: (hovered) => set({ hovered }),
  toggleLamp: () => set((st) => ({ lampOn: !st.lampOn })),
  setSaver: (saver) => set({ saver }),
  openFromRoom: (app) => {
    set({ view: "screen", hovered: null, saver: false });
    useWindows.getState().open(app);
  },
}));
