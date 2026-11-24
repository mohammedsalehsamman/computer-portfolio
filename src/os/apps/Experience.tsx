import { experience } from "@/content/experience";
import { useT } from "@/i18n/locale";

export default function Experience() {
  const { t } = useT();
  return (
    <article className="doc">
      {experience.map((e) => (
        <fieldset className="group" key={e.id}>
          <legend>{t(e.period)}</legend>
          <h2>{t(e.role)}</h2>
          <p className="lead-sm">
            {t(e.org)}
            {e.location && <span className="muted"> · {t(e.location)}</span>}
          </p>
          <ul className="bullets">
            {e.bullets.map((b, i) => (
              <li key={i}>{t(b.text)}</li>
            ))}
          </ul>
          {e.links && (
            <div className="btn-row">
              {e.links.map((l) => (
                <a key={l.href} className="btn" href={l.href} target="_blank" rel="noreferrer">
                  {t(l.label)} ↗
                </a>
              ))}
            </div>
          )}
        </fieldset>
      ))}
    </article>
  );
}
