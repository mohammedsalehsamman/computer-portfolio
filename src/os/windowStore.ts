import { create } from "zustand";
import { appMeta, type AppId } from "./registry";

export type Win = {
  id: string;
  app: AppId;
  param?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

type WindowState = {
  wins: Win[];
  zTop: number;
  /** Size of the desktop area (above the taskbar), in OS pixels. */
  desk: { w: number; h: number };
  /** Phone layout: windows open maximized. */
  compact: boolean;
  rtl: boolean;
  /** Width taken by the desktop icon columns; new windows open beside it. */
  iconArea: number;
  setIconArea: (w: number) => void;
  setDesk: (w: number, h: number) => void;
  setLayout: (compact: boolean, rtl: boolean) => void;
  open: (app: AppId, param?: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMax: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, w: number, h: number) => void;
  closeAll: () => void;
};

let seq = 0;
const ICON_COLUMN = 104;

export const useWindows = create<WindowState>((set, get) => ({
  wins: [],
  zTop: 1,
  desk: { w: 1024, h: 732 },
  compact: false,
  rtl: false,
  iconArea: ICON_COLUMN,
  setIconArea: (iconArea) => set({ iconArea }),
  setDesk: (w, h) => set({ desk: { w, h } }),
  setLayout: (compact, rtl) => set({ compact, rtl }),

  open: (app, param) => {
    const { wins, zTop, desk, compact, rtl } = get();
    const icons = Math.min(get().iconArea, desk.w / 2);
    const z = zTop + 1;
    const existing = wins.find((w) => w.app === app && w.param === param);
    if (existing) {
      set({ zTop: z, wins: wins.map((w) => (w.id === existing.id ? { ...w, z, minimized: false } : w)) });
      return;
    }
    const meta = appMeta[app];
    const w = Math.min(meta.w, desk.w - icons - 12);
    const h = Math.min(meta.h, desk.h - 16);
    const n = wins.filter((x) => !x.minimized).length % 6;
    const off = 18 + n * 28;
    const x = rtl ? Math.max(0, desk.w - icons - w - off + 18) : Math.min(icons + off - 18, desk.w - w);
    const y = Math.max(0, Math.min(12 + n * 24, desk.h - h));
    seq += 1;
    set({
      zTop: z,
      wins: [...wins, { id: `${app}-${seq}`, app, param, x, y, w, h, z, minimized: false, maximized: compact }],
    });
  },

  close: (id) => set({ wins: get().wins.filter((w) => w.id !== id) }),

  focus: (id) => {
    const { wins, zTop } = get();
    const target = wins.find((w) => w.id === id);
    if (!target || (target.z === zTop && !target.minimized)) return;
    const z = zTop + 1;
    set({ zTop: z, wins: wins.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)) });
  },

  minimize: (id) => set({ wins: get().wins.map((w) => (w.id === id ? { ...w, minimized: true } : w)) }),

  toggleMax: (id) => {
    if (get().compact) return;
    set({ wins: get().wins.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)) });
  },

  move: (id, x, y) => set({ wins: get().wins.map((w) => (w.id === id ? { ...w, x, y } : w)) }),
  resize: (id, w, h) => set({ wins: get().wins.map((win) => (win.id === id ? { ...win, w, h } : win)) }),
  closeAll: () => set({ wins: [], zTop: 1 }),
}));

/** The focused window: the highest one that is not minimized. */
export function activeWindowId(wins: Win[]) {
  let top: Win | null = null;
  for (const w of wins) if (!w.minimized && (!top || w.z > top.z)) top = w;
  return top?.id ?? null;
}
