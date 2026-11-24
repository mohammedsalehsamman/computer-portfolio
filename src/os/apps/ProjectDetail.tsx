import type { ProjectImage } from "@/content/types";
import { ui } from "@/content/ui";
import { useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { caseStudyFor, projectBySlug } from "@/lib/site";

function Shot({ img, alt }: { img: ProjectImage; alt: string }) {
  if (img.frame === "browser")
    return (
      <figure className="shot shot-browser">
        <div className="shot-bar">
          <i />
          <i />
          <i />
        </div>
        <img src={img.src} alt={alt} loading="lazy" />
      </figure>
    );
  return (
    <figure className={`shot shot-${img.frame}`}>
      <img src={img.src} alt={alt} loading="lazy" />
    </figure>
  );
}

export default function ProjectDetail({ param }: { param?: string }) {
  const { t } = useT();
  const p = param ? projectBySlug(param) : undefined;
  if (!p) return <div className="doc">404</div>;
  const cs = caseStudyFor(p.slug);
  const links = [...(p.live ? [{ label: ui.clients.visit, href: p.live }] : []), ...(p.links ?? [])];

  return (
    <article className="doc">
      <p className="eyebrow">
        {p.period}
        {p.role && <> · {t(p.role)}</>}
      </p>
      <h1>{t(p.name)}</h1>
      <p className="lead">{t(p.tagline)}</p>

      {links.length > 0 && (
        <div className="btn-row">
          {links.map((l) => (
            <a key={l.href} className="btn" href={l.href} target="_blank" rel="noreferrer">
              {t(l.label)} ↗
            </a>
          ))}
        </div>
      )}

      {p.metrics.length > 0 && (
        <fieldset className="group">
          <legend>{t(s.highlights)}</legend>
          <div className="metrics">
            {p.metrics.map((m, i) => (
              <div className="metric bevel-in" key={i}>
                <strong>{m.value}</strong>
                <span>{t(m.label)}</span>
              </div>
            ))}
          </div>
        </fieldset>
      )}

      {p.images && p.images.length > 0 && (
        <fieldset className="group">
          <legend>{t(ui.work.gallery)}</legend>
          <div className="shots">
            {p.images.map((img) => (
              <Shot key={img.src} img={img} alt={t(img.alt)} />
            ))}
          </div>
        </fieldset>
      )}

      {cs && (
        <fieldset className="group">
          <legend>{t(ui.work.problem)}</legend>
          <p>{t(cs.problem)}</p>
        </fieldset>
      )}

      {p.bullets.length > 0 && (
        <fieldset className="group">
          <legend>{t(s.whatIDid)}</legend>
          <ul className="bullets">
            {p.bullets.map((b, i) => (
              <li key={i}>{t(b.text)}</li>
            ))}
          </ul>
        </fieldset>
      )}

      {cs && (
        <>
          <fieldset className="group">
            <legend>{t(ui.work.architecture)}</legend>
            <ol className="flow">
              {cs.flow.map((f, i) => (
                <li key={i}>
                  <strong>{t(f.label)}</strong>
                  <span>{t(f.detail)}</span>
                </li>
              ))}
            </ol>
          </fieldset>
          <fieldset className="group">
            <legend>{t(ui.work.decisions)}</legend>
            {cs.decisions.map((d, i) => (
              <div key={i} className="decision">
                <h3>{t(d.title)}</h3>
                <p>{t(d.body)}</p>
              </div>
            ))}
          </fieldset>
        </>
      )}

      <fieldset className="group">
        <legend>{t(ui.work.stack)}</legend>
        <ul className="chips" role="list">
          {p.stack.map((x) => (
            <li key={x} className="chip" dir="ltr">
              {x}
            </li>
          ))}
        </ul>
      </fieldset>
    </article>
  );
}
