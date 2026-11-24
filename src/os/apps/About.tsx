import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { sfx } from "@/sound/sfx";
import { useWindows } from "../windowStore";

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((w) => w[0])
    .join("");
}

export default function About() {
  const { t } = useT();
  const open = useWindows((st) => st.open);
  const go = (app: "projects" | "contact" | "resume") => () => {
    sfx.open();
    open(app);
  };

  return (
    <article className="doc">
      <header className="about-head">
        <div className="avatar" aria-hidden="true">
          {initials(profile.name.en)}
        </div>
        <div>
          <p className="eyebrow">{t(ui.hero.eyebrow)}</p>
          <h1>{t(profile.name)}</h1>
          <p className="lead">{t(profile.role)}</p>
        </div>
      </header>

      <p className="intro">{t(ui.hero.intro)}</p>

      <div className="btn-row">
        <button className="btn btn-primary" onClick={go("projects")}>
          {t(ui.hero.viewWork)}
        </button>
        <button className="btn" onClick={go("resume")}>
          {t(ui.cv.title)}
        </button>
        <button className="btn" onClick={go("contact")}>
          {t(ui.nav.contact)}
        </button>
      </div>

      <fieldset className="group">
        <legend>{t(ui.about.title)}</legend>
        {profile.about.map((p, i) => (
          <p key={i}>{t(p)}</p>
        ))}
      </fieldset>

      <fieldset className="group">
        <legend>{t(s.profile)}</legend>
        <p>{t(profile.summary.ai)}</p>
      </fieldset>

      <div className="two-col">
        <fieldset className="group">
          <legend>{t(ui.about.education)}</legend>
          <p>
            <strong>{t(profile.education.degree)}</strong>
          </p>
          <p>{t(profile.education.school)}</p>
          <p className="muted">{t(profile.education.period)}</p>
        </fieldset>
        <fieldset className="group">
          <legend>{t(ui.about.languages)}</legend>
          <ul className="plain">
            {profile.languages.map((l, i) => (
              <li key={i}>{t(l)}</li>
            ))}
          </ul>
          <p className="muted">{t(profile.location)}</p>
        </fieldset>
      </div>
    </article>
  );
}
