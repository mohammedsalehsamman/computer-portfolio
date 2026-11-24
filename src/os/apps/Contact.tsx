import { useState } from "react";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { Icon, type IconName } from "../Icon";

export default function Contact() {
  const { t } = useT();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const rows: { icon: IconName; label: string; value: string; href: string }[] = [
    { icon: "contact", label: t(s.email), value: profile.email, href: `mailto:${profile.email}` },
    { icon: "phone", label: t(s.phone), value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: "github", label: "GitHub", value: profile.links.github.replace("https://", ""), href: profile.links.github },
    { icon: "linkedin", label: "LinkedIn", value: "mohammed-samman", href: profile.links.linkedin },
  ];

  return (
    <article className="doc">
      <h1>{t(ui.contact.title)}</h1>
      <p className="intro">{t(ui.contact.body)}</p>

      <ul className="contact-list" role="list">
        {rows.map((r) => (
          <li key={r.label}>
            <a className="contact-row bevel-out" href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              <Icon name={r.icon} size={28} />
              <span className="contact-label">{r.label}</span>
              <span className="contact-value" dir="ltr">
                {r.value}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="btn-row">
        <a className="btn btn-primary" href={`mailto:${profile.email}`}>
          {t(s.sendEmail)}
        </a>
        <button className="btn" onClick={copy}>
          {copied ? `✓ ${t(ui.contact.copied)}` : t(ui.contact.copy)}
        </button>
      </div>
      <p className="muted">
        {t(s.location)}: {t(profile.location)}
      </p>
    </article>
  );
}
