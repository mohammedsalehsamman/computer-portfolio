import { profile } from "@/content/profile";
import { useLocale, useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { sfx } from "@/sound/sfx";
import { useScene } from "@/state/scene";
import { Icon } from "./Icon";
import { appMeta, desktopApps } from "./registry";
import { useWindows } from "./windowStore";

export function StartMenu({ embedded, onClose }: { embedded: boolean; onClose: () => void }) {
  const { t } = useT();
  const toggleLocale = useLocale((st) => st.toggle);
  const open = useWindows((st) => st.open);

  const item = (key: string, icon: Parameters<typeof Icon>[0]["name"], label: string, action: () => void) => (
    <li key={key}>
      <button
        className="start-item"
        onClick={() => {
          action();
          onClose();
        }}
      >
        <Icon name={icon} size={24} />
        <span>{label}</span>
      </button>
    </li>
  );

  return (
    <>
      <div className="start-backdrop" onPointerDown={onClose} />
      <nav className="start-menu" aria-label={t(s.start)}>
        <div className="start-banner">
          <span>{t(s.osName)}</span>
        </div>
        <div className="start-main">
          <div className="start-head">
            <strong>{t(profile.name)}</strong>
            <small>{t(profile.role)}</small>
          </div>
          <ul>
            {desktopApps.map((app) =>
              item(app, appMeta[app].icon, t(appMeta[app].title), () => {
                sfx.open();
                open(app);
              }),
            )}
          </ul>
          <hr />
          <ul>
            {item("lang", "globe", t(s.switchLang), toggleLocale)}
            {item("restart", "restart", t(s.restart), () => {
              useWindows.getState().closeAll();
              useScene.getState().restartOS();
            })}
            {embedded && item("leave", "power", t(s.leave), () => useScene.getState().setView("wide"))}
          </ul>
        </div>
      </nav>
    </>
  );
}
