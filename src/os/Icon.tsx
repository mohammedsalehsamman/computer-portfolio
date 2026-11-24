/** Original chunky retro icons drawn on a 32×32 grid. */
export type IconName =
  | "about"
  | "experience"
  | "projects"
  | "file"
  | "skills"
  | "contact"
  | "resume"
  | "terminal"
  | "globe"
  | "power"
  | "restart"
  | "soundOn"
  | "soundOff"
  | "logo"
  | "github"
  | "linkedin"
  | "link"
  | "phone";

const O = "#1b1a17"; // outline

function Paths({ name }: { name: IconName }) {
  switch (name) {
    case "about":
      return (
        <>
          <rect x="3" y="6" width="26" height="20" rx="2" fill="#f4efe1" stroke={O} strokeWidth="2" />
          <rect x="3" y="6" width="26" height="5" fill="#6b4ea8" stroke={O} strokeWidth="2" />
          <circle cx="11" cy="17" r="3.2" fill="#e0783f" stroke={O} strokeWidth="1.5" />
          <path d="M6 24c0-3 2.4-4.6 5-4.6s5 1.6 5 4.6" fill="#e0783f" stroke={O} strokeWidth="1.5" />
          <rect x="18" y="14" width="8" height="2" fill={O} />
          <rect x="18" y="18" width="7" height="2" fill="#8c8574" />
          <rect x="18" y="22" width="5" height="2" fill="#8c8574" />
        </>
      );
    case "experience":
      return (
        <>
          <rect x="11" y="5" width="10" height="6" rx="1" fill="none" stroke={O} strokeWidth="2" />
          <rect x="3" y="10" width="26" height="17" rx="2" fill="#a8693a" stroke={O} strokeWidth="2" />
          <rect x="3" y="16" width="26" height="3" fill="#7d4a25" />
          <rect x="14" y="15" width="4" height="5" fill="#f2c14e" stroke={O} strokeWidth="1.5" />
        </>
      );
    case "projects":
      return (
        <>
          <path d="M3 8h10l3 3h13v16H3z" fill="#e8b44a" stroke={O} strokeWidth="2" strokeLinejoin="round" />
          <path d="M3 13h26v14H3z" fill="#f6cd6a" stroke={O} strokeWidth="2" strokeLinejoin="round" />
          <path d="M8 19l3 3-3 3M14 25h6" stroke="#7d4a25" strokeWidth="2" fill="none" />
        </>
      );
    case "file":
      return (
        <>
          <path d="M7 3h13l6 6v20H7z" fill="#f4efe1" stroke={O} strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 3v6h6" fill="#d6d0c2" stroke={O} strokeWidth="2" strokeLinejoin="round" />
          <rect x="11" y="14" width="11" height="7" fill="#3f7ca8" stroke={O} strokeWidth="1.5" />
          <rect x="11" y="24" width="8" height="2" fill="#8c8574" />
        </>
      );
    case "skills":
      return (
        <>
          <rect x="8" y="8" width="16" height="16" fill="#3e8e6a" stroke={O} strokeWidth="2" />
          <rect x="12" y="12" width="8" height="8" fill="#a6e3c4" stroke={O} strokeWidth="1.5" />
          {[11, 16, 21].map((p) => (
            <g key={p} fill={O}>
              <rect x={p - 1} y="3" width="2" height="5" />
              <rect x={p - 1} y="24" width="2" height="5" />
              <rect x="3" y={p - 1} width="5" height="2" />
              <rect x="24" y={p - 1} width="5" height="2" />
            </g>
          ))}
        </>
      );
    case "contact":
      return (
        <>
          <rect x="3" y="7" width="26" height="18" rx="2" fill="#f4efe1" stroke={O} strokeWidth="2" />
          <path d="M4 9l12 9 12-9" fill="none" stroke={O} strokeWidth="2" strokeLinejoin="round" />
          <circle cx="25" cy="8" r="4" fill="#e0783f" stroke={O} strokeWidth="1.5" />
        </>
      );
    case "resume":
      return (
        <>
          <path d="M6 3h14l6 6v20H6z" fill="#fff" stroke={O} strokeWidth="2" strokeLinejoin="round" />
          <path d="M20 3v6h6" fill="#d6d0c2" stroke={O} strokeWidth="2" strokeLinejoin="round" />
          <rect x="10" y="12" width="12" height="2" fill="#6b4ea8" />
          <rect x="10" y="16" width="12" height="2" fill="#8c8574" />
          <rect x="10" y="20" width="9" height="2" fill="#8c8574" />
          <rect x="4" y="22" width="13" height="7" rx="1" fill="#c0392b" stroke={O} strokeWidth="1.5" />
          <text x="10.5" y="27.5" fontSize="5.5" fontWeight="700" fill="#fff" textAnchor="middle" fontFamily="Inter, sans-serif">
            PDF
          </text>
        </>
      );
    case "terminal":
      return (
        <>
          <rect x="3" y="5" width="26" height="22" rx="2" fill="#16181d" stroke={O} strokeWidth="2" />
          <rect x="3" y="5" width="26" height="4" fill="#d6d0c2" stroke={O} strokeWidth="2" />
          <path d="M8 14l4 3-4 3" stroke="#7CFC9A" strokeWidth="2" fill="none" />
          <rect x="14" y="20" width="7" height="2" fill="#7CFC9A" />
        </>
      );
    case "globe":
      return (
        <>
          <circle cx="16" cy="16" r="12" fill="#5aa9d6" stroke={O} strokeWidth="2" />
          <path d="M4 16h24M16 4c-5 4-5 20 0 24M16 4c5 4 5 20 0 24" stroke={O} strokeWidth="1.5" fill="none" />
        </>
      );
    case "power":
      return (
        <>
          <path d="M10 9a10 10 0 1 0 12 0" fill="none" stroke="#c0392b" strokeWidth="3" strokeLinecap="round" />
          <path d="M16 4v11" stroke="#c0392b" strokeWidth="3" strokeLinecap="round" />
        </>
      );
    case "restart":
      return (
        <>
          <path d="M25 16a9 9 0 1 1-3-6.7" fill="none" stroke="#3e8e6a" strokeWidth="3" strokeLinecap="round" />
          <path d="M23 3v7h-7" fill="none" stroke="#3e8e6a" strokeWidth="3" strokeLinejoin="round" />
        </>
      );
    case "soundOn":
    case "soundOff":
      return (
        <>
          <path d="M4 12h6l8-6v20l-8-6H4z" fill="#f4efe1" stroke={O} strokeWidth="2" strokeLinejoin="round" />
          {name === "soundOn" ? (
            <path d="M22 11c2 3 2 7 0 10M25 8c4 5 4 11 0 16" stroke={O} strokeWidth="2" fill="none" />
          ) : (
            <path d="M21 12l8 8M29 12l-8 8" stroke="#c0392b" strokeWidth="2.5" />
          )}
        </>
      );
    case "logo":
      return (
        <>
          <rect x="3" y="3" width="12" height="12" fill="#e0783f" stroke={O} strokeWidth="1.5" />
          <rect x="17" y="3" width="12" height="12" fill="#6b4ea8" stroke={O} strokeWidth="1.5" />
          <rect x="3" y="17" width="12" height="12" fill="#3e8e6a" stroke={O} strokeWidth="1.5" />
          <rect x="17" y="17" width="12" height="12" fill="#f2c14e" stroke={O} strokeWidth="1.5" />
        </>
      );
    case "github":
      return (
        <path
          d="M16 3a13 13 0 0 0-4.1 25.3c.6.1.9-.3.9-.6v-2.3c-3.6.8-4.4-1.7-4.4-1.7-.6-1.5-1.4-1.9-1.4-1.9-1.2-.8.1-.8.1-.8 1.3.1 2 1.3 2 1.3 1.2 2 3.1 1.4 3.8 1.1.1-.8.5-1.4.8-1.7-2.9-.3-5.9-1.4-5.9-6.4 0-1.4.5-2.6 1.3-3.5-.1-.3-.6-1.6.1-3.4 0 0 1.1-.3 3.6 1.3a12.4 12.4 0 0 1 6.5 0c2.5-1.7 3.6-1.3 3.6-1.3.7 1.8.3 3.1.1 3.4.8.9 1.3 2.1 1.3 3.5 0 5-3 6.1-5.9 6.4.5.4.9 1.2.9 2.4v3.6c0 .3.2.7.9.6A13 13 0 0 0 16 3z"
          fill={O}
        />
      );
    case "linkedin":
      return (
        <>
          <rect x="3" y="3" width="26" height="26" rx="3" fill="#2f6fa8" stroke={O} strokeWidth="1.5" />
          <rect x="8" y="13" width="4" height="11" fill="#fff" />
          <circle cx="10" cy="9" r="2.2" fill="#fff" />
          <path d="M15 13h4v1.6c.8-1.2 2-1.9 3.5-1.9 2.6 0 3.5 1.7 3.5 4.4V24h-4v-6c0-1.3-.4-2.2-1.6-2.2s-1.4.9-1.4 2.2v6h-4z" fill="#fff" />
        </>
      );
    case "link":
      return (
        <>
          <circle cx="16" cy="16" r="12" fill="#f4efe1" stroke={O} strokeWidth="2" />
          <path d="M13 19l6-6M11 16l-2 2a3 3 0 0 0 4.2 4.2l2-2M21 16l2-2a3 3 0 0 0-4.2-4.2l-2 2" stroke={O} strokeWidth="2" fill="none" strokeLinecap="round" />
        </>
      );
    case "phone":
      return (
        <>
          <rect x="9" y="3" width="14" height="26" rx="2" fill="#2b2d42" stroke={O} strokeWidth="2" />
          <rect x="11" y="7" width="10" height="15" fill="#a6e3c4" />
          <circle cx="16" cy="25" r="1.5" fill="#f4efe1" />
        </>
      );
  }
}

export function Icon({ name, size = 32, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden="true" shapeRendering="geometricPrecision">
      <Paths name={name} />
    </svg>
  );
}
