export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export const isLocale = (v: string): v is Locale =>
  (locales as readonly string[]).includes(v);

/** Which tailored CV a piece of content belongs to. */
export const cvVariants = ["ai", "backend"] as const;
export type CvVariant = (typeof cvVariants)[number];
export const isCvVariant = (v: string): v is CvVariant =>
  (cvVariants as readonly string[]).includes(v);

/** CV versions that are actually published (routes, PDFs, download links). */
export const publishedCvVariants = ["backend"] as const satisfies readonly CvVariant[];
export const isPublishedCv = (v: string): v is (typeof publishedCvVariants)[number] =>
  (publishedCvVariants as readonly string[]).includes(v);

export type L = { en: string; ar: string };

export type Bullet = {
  text: L;
  /** CV versions that include this bullet. */
  cv: CvVariant[];
};

export type Metric = { value: string; label: L };

export type Link = { label: L; href: string };

export type Experience = {
  id: string;
  role: L;
  org: L;
  location?: L;
  period: L;
  bullets: Bullet[];
  links?: Link[];
  /** Order in each CV version (lower first). Omit to exclude. */
  cvOrder: Partial<Record<CvVariant, number>>;
};

export type ProjectImage = { src: string; alt: L; frame: "phone" | "browser" | "plain" };

export type CaseStudy = {
  problem: L;
  /** Architecture as an ordered flow of stages. */
  flow: { label: L; detail: L }[];
  decisions: { title: L; body: L }[];
};

export type Project = {
  slug: string;
  /** Graduation project gets its own CV section. */
  kind?: "graduation";
  name: L;
  tagline: L;
  period: string;
  role?: L;
  stack: string[];
  bullets: Bullet[];
  metrics: Metric[];
  links?: Link[];
  /** Order in each CV version as a full entry (lower first). */
  cvOrder: Partial<Record<CvVariant, number>>;
  /** One-line entry under "Additional projects" in these versions. */
  cvOneLine?: { text: L; cv: CvVariant[] };
  /** Featured on the portfolio home, in this order. */
  featured?: number;
  /** Client work shown in the "client sites" chapter. */
  client?: boolean;
  live?: string;
  images?: ProjectImage[];
};

export type SkillGroup = {
  title: L;
  items: string[];
  cvOrder: Partial<Record<CvVariant, number>>;
};
