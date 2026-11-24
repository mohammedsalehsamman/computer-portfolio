import { Vector3 } from "three";

/** Scene units are meters. The desk top sits at DESK_Y. */
export const DESK_Y = 0.76;

/** Monitor group origin (center of the front bezel). */
export const MONITOR_POS = new Vector3(0, 1.12, -0.05);
/** Visible glass: 4:3, offset upward inside the bezel to leave a chin. */
export const SCREEN_W = 0.32;
export const SCREEN_H = 0.24;
export const SCREEN_OFFSET_Y = 0.018;
export const SCREEN_Z = 0.0262;
export const SCREEN_CENTER = new Vector3(0, MONITOR_POS.y + SCREEN_OFFSET_Y, MONITOR_POS.z + SCREEN_Z);

/** drei <Html transform>: world units per CSS pixel = distanceFactor / 400. */
export const HTML_DISTANCE_FACTOR = (SCREEN_W / 1024) * 400;

export const CAMERA_FOV = 40;
export const INTRO_POS = new Vector3(2.4, 2.2, 3.6);
export const WIDE_POS = new Vector3(0.62, 1.42, 1.48);
export const WIDE_LOOK = new Vector3(0, 1.0, -0.08);
