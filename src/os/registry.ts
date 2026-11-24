import type { L } from "@/content/types";
import { s } from "@/i18n/strings";
import type { IconName } from "./Icon";

export type AppId =
  | "about"
  | "experience"
  | "projects"
  | "project"
  | "skills"
  | "contact"
  | "resume"
  | "terminal"
  | "solitaire"
  | "mail";

export const appMeta: Record<AppId, { title: L; icon: IconName; w: number; h: number }> = {
  about: { title: s.apps.about, icon: "about", w: 620, h: 560 },
  experience: { title: s.apps.experience, icon: "experience", w: 660, h: 580 },
  projects: { title: s.apps.projects, icon: "projects", w: 640, h: 520 },
  project: { title: s.apps.project, icon: "file", w: 700, h: 600 },
  skills: { title: s.apps.skills, icon: "skills", w: 600, h: 540 },
  contact: { title: s.apps.contact, icon: "contact", w: 520, h: 470 },
  resume: { title: s.apps.resume, icon: "resume", w: 720, h: 640 },
  terminal: { title: s.apps.terminal, icon: "terminal", w: 600, h: 400 },
  solitaire: { title: s.apps.solitaire, icon: "cards", w: 760, h: 600 },
  mail: { title: s.apps.mail, icon: "mail", w: 560, h: 560 },
};

/** Icons shown on the desktop and in the Start menu, in order. */
export const desktopApps: AppId[] = [
  "about",
  "experience",
  "projects",
  "skills",
  "contact",
  "mail",
  "resume",
  "terminal",
  "solitaire",
];
