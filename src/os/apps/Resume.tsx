import { useState } from "react";
import { ui } from "@/content/ui";
import type { Locale } from "@/content/types";
import { useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { cvFiles } from "@/lib/site";

export default function Resume() {
  const { t, locale } = useT();
  const [lang, setLang] = useState<Locale>(locale);
  const file = cvFiles[lang];

  return (
    <div className="resume">
      <div className="toolbar">
        <div className="seg" role="tablist">
          {(["en", "ar"] as const).map((l) => (
            <button key={l} role="tab" aria-selected={lang === l} className={`btn btn-sm${lang === l ? " is-pressed" : ""}`} onClick={() => setLang(l)}>
              {t(l === "en" ? ui.cv.english : ui.cv.arabic)}
            </button>
          ))}
        </div>
        <span className="muted grow">{t(s.resumeNote)}</span>
        <a className="btn btn-sm" href={file} target="_blank" rel="noreferrer">
          {t(s.openTab)} ↗
        </a>
        <a className="btn btn-sm btn-primary" href={file} download>
          {t(s.download)}
        </a>
      </div>
      <iframe key={file} className="resume-frame bevel-in" src={`${file}#view=FitH`} title={t(s.apps.resume)} />
    </div>
  );
}
