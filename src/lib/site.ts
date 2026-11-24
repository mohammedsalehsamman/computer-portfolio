import { caseStudies } from "@/content/case-studies";
import { projects } from "@/content/projects";
import type { Locale, Project } from "@/content/types";

/** Adapted from portfolio-v2/src/lib/site.ts, without the Next.js and particle-scene parts. */
export const cvFiles = {
  en: "/cv/Mohammed_Saleh_Samman_CV_Backend_Engineer.pdf",
  ar: "/cv/Mohammed_Saleh_Samman_CV_Backend_Engineer_AR.pdf",
} satisfies Record<Locale, string>;

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);

const flagshipSlugs = ["belle-biens", "momentum-signal-system", "aspu-insight"];
export const flagship: Project[] = flagshipSlugs
  .map((slug) => projectBySlug(slug))
  .filter((p): p is Project => !!p);
export const clientSites = projects.filter((p) => p.client);
export const moreWork = projects
  .filter((p) => !p.client && !flagshipSlugs.includes(p.slug))
  .sort((a, b) => (a.featured ?? 99) - (b.featured ?? 99));

export const caseStudyFor = (slug: string) => caseStudies[slug];
