import { useLocale, useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { SHOW_SIMPLE_LINK, simpleHref } from "@/lib/site";
import { useScene } from "@/state/scene";

/** Overlay controls for the 3D room: hint (or hovered object) in the wide view, way back in the screen view. */
export function Hud() {
  const { t, dir, locale } = useT();
  const view = useScene((st) => st.view);
  const booted = useScene((st) => st.booted);
  const hovered = useScene((st) => st.hovered);
  const toggle = useLocale((st) => st.toggle);
  if (!booted) return null;

  return (
    <div className="hud" dir={dir}>
      {view === "wide" && (
        <>
          <button
            className={`hud-hint${hovered ? " is-object" : ""}`}
            onClick={() => useScene.getState().setView("screen")}
            aria-live="polite"
          >
            {hovered ? t(hovered) : t(s.clickComputer)}
          </button>
          {SHOW_SIMPLE_LINK && (
            <a className="hud-btn hud-simple" href={simpleHref(locale)}>
              {t(s.simpleVersion)}
            </a>
          )}
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
