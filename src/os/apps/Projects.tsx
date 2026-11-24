import { useState } from "react";
import type { L, Project } from "@/content/types";
import { useT } from "@/i18n/locale";
import { s } from "@/i18n/strings";
import { clientSites, flagship, moreWork } from "@/lib/site";
import { sfx } from "@/sound/sfx";
import { Icon } from "../Icon";
import { useWindows } from "../windowStore";

const groups: { title: L; items: Project[] }[] = [
  { title: s.groups.flagship, items: flagship },
  { title: s.groups.client, items: clientSites },
  { title: s.groups.more, items: moreWork },
];

export default function Projects() {
  const { t } = useT();
  const open = useWindows((st) => st.open);
  const compact = useWindows((st) => st.compact);
  const [selected, setSelected] = useState<string | null>(null);
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const launch = (slug: string) => {
    sfx.open();
    open("project", slug);
  };
  const current = groups.flatMap((g) => g.items).find((p) => p.slug === selected);

  return (
    <div className="explorer">
      <div className="explorer-path bevel-in">C:\{t(s.apps.projects)}\</div>
      <div className="explorer-body">
        {groups.map((g) => (
          <section key={g.title.en}>
            <h3 className="explorer-group">
              {t(g.title)} <span className="muted">({g.items.length})</span>
            </h3>
            <ul className="file-grid" role="list">
              {g.items.map((p) => (
                <li key={p.slug}>
                  <button
                    className={`file-item${selected === p.slug ? " is-selected" : ""}`}
                    onClick={() => {
                      sfx.click();
                      setSelected(p.slug);
                      if (compact) launch(p.slug);
                    }}
                    onDoubleClick={() => launch(p.slug)}
                    onKeyDown={(e) => e.key === "Enter" && launch(p.slug)}
                  >
                    <Icon name={p.client ? "link" : p.kind === "graduation" ? "about" : "file"} size={32} />
                    <span>{t(p.name)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="statusbar">
        <span className="bevel-in">
          {total} {t(s.items)}
        </span>
        <span className="bevel-in grow">{current ? t(current.tagline) : t(s.hint)}</span>
      </div>
    </div>
  );
}
