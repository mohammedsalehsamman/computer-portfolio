import { useLayoutEffect, useRef, useState } from "react";
import { profile } from "@/content/profile";
import { useT } from "@/i18n/locale";
import { sfx } from "@/sound/sfx";
import { Icon } from "./Icon";
import { appMeta, desktopApps, type AppId } from "./registry";
import { useWindows } from "./windowStore";

export function Desktop() {
  const { t } = useT();
  const compact = useWindows((st) => st.compact);
  const open = useWindows((st) => st.open);
  const [selected, setSelected] = useState<AppId | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Tell the window manager how wide the icon columns are, so new windows don't cover them.
  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const report = () => useWindows.getState().setIconArea(el.offsetWidth + 6);
    const ro = new ResizeObserver(report);
    ro.observe(el);
    report();
    return () => ro.disconnect();
  }, []);

  const launch = (app: AppId) => {
    sfx.open();
    open(app);
  };

  return (
    <div className="desk-bg" onPointerDown={(e) => e.target === e.currentTarget && setSelected(null)}>
      <div className="desk-watermark" aria-hidden="true">
        <div className="wm-name">{t(profile.name)}</div>
        <div className="wm-role">{t(profile.role)}</div>
      </div>
      <ul className="desk-icons" role="list" ref={listRef}>
        {desktopApps.map((app) => (
          <li key={app}>
            <button
              className={`desk-icon${selected === app ? " is-selected" : ""}`}
              onClick={() => {
                sfx.click();
                setSelected(app);
                if (compact) launch(app);
              }}
              onDoubleClick={() => launch(app)}
              onKeyDown={(e) => e.key === "Enter" && launch(app)}
            >
              <Icon name={appMeta[app].icon} size={36} />
              <span>{t(appMeta[app].title)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
