/**
 * `seo` Vite plugin: makes the portfolio readable by search engines, link previews and
 * recruiters in a hurry. Everything is generated from src/content at build time:
 *   - Open Graph / Twitter / canonical / hreflang tags and a JSON-LD Person in index.html
 *   - /simple/ and /simple/ar/: fast, fully visible HTML versions of the portfolio
 *   - robots.txt and sitemap.xml
 * Relative imports only: the Vite config bundler does not know the "@/" alias.
 */
import type { Plugin } from "vite";
import { experience } from "../src/content/experience";
import { profile, skills } from "../src/content/profile";
import { projects } from "../src/content/projects";
import type { L, Locale } from "../src/content/types";
import { ui } from "../src/content/ui";

const CV: Record<Locale, string> = {
  en: "/cv/Mohammed_Saleh_Samman_CV_Backend_Engineer.pdf",
  ar: "/cv/Mohammed_Saleh_Samman_CV_Backend_Engineer_AR.pdf",
};
const FLAGSHIP = ["belle-biens", "momentum-signal-system", "aspu-insight"];
const PATHS: Record<Locale, string> = { en: "/simple/", ar: "/simple/ar/" };

const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const T = {
  title: { en: "Portfolio (simple version)", ar: "البورتفوليو (نسخة مبسطة)" },
  open3d: { en: "Open the interactive 3D version", ar: "افتح النسخة التفاعلية ثلاثية الأبعاد" },
  other: { en: "العربية", ar: "English" },
  projects: { en: "Projects", ar: "المشاريع" },
  experience: { en: "Experience", ar: "الخبرة العملية" },
  skills: { en: "Skills", ar: "المهارات" },
  contact: { en: "Contact", ar: "تواصل" },
  cv: { en: "Download CV (PDF)", ar: "تحميل السيرة الذاتية (PDF)" },
  stack: { en: "Stack", ar: "التقنيات" },
} satisfies Record<string, L>;

const orderedProjects = () => [
  ...FLAGSHIP.map((slug) => projects.find((p) => p.slug === slug)!).filter(Boolean),
  ...projects.filter((p) => !FLAGSHIP.includes(p.slug)).sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99)),
];

export function simplePage(locale: Locale, site: string) {
  const t = (l: L) => esc(l[locale]);
  const other: Locale = locale === "en" ? "ar" : "en";
  const desc = esc(`${profile.role[locale]} — ${ui.hero.intro[locale]}`);
  const links = (list: { label: L; href: string }[] = []) =>
    list.map((l) => `<a href="${esc(l.href)}" rel="noopener">${t(l.label)} ↗</a>`).join(" · ");

  const exp = experience
    .map(
      (e) => `<article>
  <h3>${t(e.role)}</h3>
  <p class="meta">${t(e.org)}${e.location ? ` · ${t(e.location)}` : ""} · ${t(e.period)}</p>
  <ul>${e.bullets.map((b) => `<li>${t(b.text)}</li>`).join("")}</ul>
  ${e.links?.length ? `<p>${links(e.links)}</p>` : ""}
</article>`,
    )
    .join("\n");

  const proj = orderedProjects()
    .map((p) => {
      const plinks = [...(p.live ? [{ label: ui.clients.visit, href: p.live }] : []), ...(p.links ?? [])];
      return `<article>
  <h3>${t(p.name)}</h3>
  <p class="meta">${esc(p.period)}${p.role ? ` · ${t(p.role)}` : ""}</p>
  <p>${t(p.tagline)}</p>
  ${p.metrics.length ? `<p class="metrics">${p.metrics.map((m) => `<span><b>${esc(m.value)}</b> ${t(m.label)}</span>`).join("")}</p>` : ""}
  ${p.bullets.length ? `<ul>${p.bullets.map((b) => `<li>${t(b.text)}</li>`).join("")}</ul>` : ""}
  <p class="stack" dir="ltr"><span>${t(T.stack)}:</span> ${p.stack.map(esc).join(", ")}</p>
  ${plinks.length ? `<p>${links(plinks)}</p>` : ""}
</article>`;
    })
    .join("\n");

  const skillHtml = skills.map((g) => `<p><b>${t(g.title)}:</b> <span dir="ltr">${g.items.map(esc).join(", ")}</span></p>`).join("\n");

  return `<!doctype html>
<html lang="${locale}" dir="${locale === "ar" ? "rtl" : "ltr"}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${t(profile.name)} — ${t(profile.role)} · ${t(T.title)}</title>
<meta name="description" content="${desc}" />
<link rel="canonical" href="${site}${PATHS[locale]}" />
<link rel="alternate" hreflang="en" href="${site}${PATHS.en}" />
<link rel="alternate" hreflang="ar" href="${site}${PATHS.ar}" />
<link rel="alternate" hreflang="x-default" href="${site}/" />
<meta property="og:type" content="profile" />
<meta property="og:title" content="${t(profile.name)} — ${t(profile.role)}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${site}/og.png" />
<meta property="og:url" content="${site}${PATHS[locale]}" />
<link rel="icon" href="/favicon.ico" />
<style>
  :root { --ink:#1d1b18; --muted:#6d675a; --accent:#e0783f; --plum:#4a2f78; --paper:#fbf8f1; --line:#d9d3c3; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--paper); color:var(--ink); font:16px/1.6 system-ui, "Segoe UI", "IBM Plex Sans Arabic", Tahoma, sans-serif; }
  main { max-width: 820px; margin: 0 auto; padding: 32px 20px 64px; }
  header { border-bottom: 3px solid var(--plum); padding-bottom: 18px; margin-bottom: 8px; }
  h1 { margin: 0; font-size: 2rem; line-height: 1.2; }
  h2 { margin: 36px 0 10px; color: var(--plum); font-size: 1.3rem; border-bottom: 1px solid var(--line); padding-bottom: 4px; }
  h3 { margin: 18px 0 2px; font-size: 1.08rem; }
  .role { margin: 2px 0 8px; font-size: 1.15rem; color: var(--muted); }
  .meta { margin: 0 0 6px; color: var(--muted); font-size: .92rem; }
  .eyebrow { color: #b4567a; font-weight: 700; font-size: .85rem; letter-spacing: .04em; margin: 0 0 6px; }
  .nav { display:flex; flex-wrap:wrap; gap: 10px 18px; margin-top: 12px; font-weight: 600; }
  a { color: var(--plum); }
  a.cta { background: var(--accent); color: var(--ink); padding: 6px 12px; text-decoration: none; border: 2px solid var(--ink); }
  ul { padding-inline-start: 20px; margin: 6px 0; }
  li { margin-bottom: 4px; }
  .metrics { display:flex; flex-wrap:wrap; gap: 6px 16px; font-size: .92rem; color: var(--muted); }
  .metrics b { color: var(--plum); }
  .stack { font-size: .88rem; color: var(--muted); }
  .stack span { font-weight: 600; }
  footer { margin-top: 48px; color: var(--muted); font-size: .85rem; }
</style>
</head>
<body>
<main>
<header>
  <p class="eyebrow">${t(ui.hero.eyebrow)}</p>
  <h1>${t(profile.name)}</h1>
  <p class="role">${t(profile.role)} · ${t(profile.location)}</p>
  <p>${t(ui.hero.intro)}</p>
  <nav class="nav">
    <a class="cta" href="/">${t(T.open3d)}</a>
    <a href="${CV[locale]}">${t(T.cv)}</a>
    <a href="${PATHS[other]}" hreflang="${other}" lang="${other}">${T.other[locale]}</a>
  </nav>
</header>

<section>
  <h2>${t(ui.about.eyebrow)}</h2>
  ${profile.about.map((p) => `<p>${t(p)}</p>`).join("\n  ")}
  <p><b>${t(ui.about.education)}:</b> ${t(profile.education.degree)} — ${t(profile.education.school)} (${t(profile.education.period)})</p>
  <p><b>${t(ui.about.languages)}:</b> ${profile.languages.map(t).join(" · ")}</p>
</section>

<section>
  <h2>${t(T.experience)}</h2>
  ${exp}
</section>

<section>
  <h2>${t(T.projects)}</h2>
  ${proj}
</section>

<section>
  <h2>${t(T.skills)}</h2>
  ${skillHtml}
</section>

<section>
  <h2>${t(T.contact)}</h2>
  <p>${t(ui.contact.body)}</p>
  <p dir="ltr" style="text-align:start">
    <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a> ·
    <a href="tel:${esc(profile.phone.replace(/\s/g, ""))}">${esc(profile.phone)}</a> ·
    <a href="${esc(profile.links.github)}" rel="me noopener">GitHub</a> ·
    <a href="${esc(profile.links.linkedin)}" rel="me noopener">LinkedIn</a>
  </p>
</section>

<footer>© ${new Date().getFullYear()} ${t(profile.name)}</footer>
</main>
</body>
</html>`;
}

export function personJsonLd(site: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name.en,
    alternateName: profile.name.ar,
    jobTitle: profile.role.en,
    url: site,
    image: `${site}/og.png`,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Damascus", addressCountry: "SY" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Alsham Private University (ASPU)" },
    knowsLanguage: ["ar", "en"],
    sameAs: [profile.links.github, profile.links.linkedin],
  };
}

const robots = (site: string) => `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`;
const sitemap = (site: string) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${["/", PATHS.en, PATHS.ar].map((p) => `  <url><loc>${site}${p}</loc></url>`).join("\n")}
</urlset>
`;

export function seo(siteUrl: string): Plugin {
  const site = siteUrl.replace(/\/$/, "");
  const files: Record<string, () => { body: string; type: string }> = {
    "simple/index.html": () => ({ body: simplePage("en", site), type: "text/html" }),
    "simple/ar/index.html": () => ({ body: simplePage("ar", site), type: "text/html" }),
    "robots.txt": () => ({ body: robots(site), type: "text/plain" }),
    "sitemap.xml": () => ({ body: sitemap(site), type: "application/xml" }),
  };
  const title = `${profile.name.en} — ${profile.role.en}`;
  const description = `${profile.role.en} in Damascus. ${ui.hero.intro.en}`;

  return {
    name: "seo",
    transformIndexHtml() {
      const meta = (attrs: Record<string, string>) => ({ tag: "meta", attrs, injectTo: "head" as const });
      return [
        { tag: "link", attrs: { rel: "canonical", href: `${site}/` }, injectTo: "head" },
        { tag: "link", attrs: { rel: "alternate", hreflang: "en", href: `${site}${PATHS.en}` }, injectTo: "head" },
        { tag: "link", attrs: { rel: "alternate", hreflang: "ar", href: `${site}${PATHS.ar}` }, injectTo: "head" },
        meta({ property: "og:type", content: "profile" }),
        meta({ property: "og:site_name", content: "Samman OS" }),
        meta({ property: "og:title", content: title }),
        meta({ property: "og:description", content: description }),
        meta({ property: "og:url", content: `${site}/` }),
        meta({ property: "og:image", content: `${site}/og.png` }),
        meta({ property: "og:image:width", content: "1200" }),
        meta({ property: "og:image:height", content: "630" }),
        meta({ property: "og:image:alt", content: `${profile.name.en}'s 3D desk with a retro computer` }),
        meta({ property: "og:locale", content: "en_US" }),
        meta({ property: "og:locale:alternate", content: "ar_SY" }),
        meta({ name: "twitter:card", content: "summary_large_image" }),
        meta({ name: "twitter:title", content: title }),
        meta({ name: "twitter:description", content: description }),
        meta({ name: "twitter:image", content: `${site}/og.png` }),
        {
          tag: "script",
          attrs: { type: "application/ld+json" },
          children: JSON.stringify(personJsonLd(site)),
          injectTo: "head",
        },
      ];
    },
    generateBundle() {
      for (const [fileName, make] of Object.entries(files)) this.emitFile({ type: "asset", fileName, source: make().body });
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = (req.url ?? "").split("?")[0].replace(/^\//, "");
        const key = path.endsWith("/") || path === "simple" || path === "simple/ar" ? `${path.replace(/\/?$/, "/")}index.html` : path;
        const file = files[key];
        if (!file) return next();
        const { body, type } = file();
        res.setHeader("content-type", `${type}; charset=utf-8`);
        res.end(body);
      });
    },
  };
}
