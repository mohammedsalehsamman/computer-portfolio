/**
 * On-screen pixels per OS pixel. On the 3D monitor the OS is scaled by a CSS3D transform,
 * so pointer deltas (screen px) must be divided by this to get OS px.
 */
export function scaleOf(el: Element) {
  const root = el.closest<HTMLElement>(".os-root");
  if (!root || !root.offsetWidth) return 1;
  return root.getBoundingClientRect().width / root.offsetWidth || 1;
}
