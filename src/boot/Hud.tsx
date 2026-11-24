import { useLocale, useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { useScene } from "@/state/scene";

/** Overlay controls for the 3D room: hint in the wide view, way back in the screen view. */
export function Hud() {
  const { t, dir } = useT();
  const view = useScene((st) => st.view);
  const booted = useScene((st) => st.booted);
  const toggle = useLocale((st) => st.toggle);
  if (!booted) return null;

  return (
    <div className="hud" dir={dir}>
      {view === "wide" && (
        <>
          <button className="hud-hint" onClick={() => useScene.getState().setView("screen")}>
            {t(s.clickComputer)}
          </button>
          <button className="hud-btn hud-lang" onClick={toggle} aria-label={t(s.switchLangLabel)}>
            {t(s.switchLang)}
          </button>
        </>
      )}
      {view === "screen" && (
        <button className="hud-btn hud-back" onClick={() => useScene.getState().setView("wide")}>
          <span aria-hidden="true">{dir === "rtl" ? "→" : "←"}</span> {t(s.backToDesk)} <kbd>Esc</kbd>
        </button>
      )}
    </div>
  );
}
