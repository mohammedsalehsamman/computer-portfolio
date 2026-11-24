import { skills } from "@/content/profile";
import { useT } from "@/i18n/locale";

export default function Skills() {
  const { t } = useT();
  return (
    <article className="doc">
      {skills.map((g) => (
        <fieldset className="group" key={g.title.en}>
          <legend>{t(g.title)}</legend>
          <ul className="chips" role="list">
            {g.items.map((x) => (
              <li key={x} className="chip" dir="ltr">
                {x}
              </li>
            ))}
          </ul>
        </fieldset>
      ))}
    </article>
  );
}
