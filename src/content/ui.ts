import type { L } from "./types";

export const cvLabels = {
  summary: { en: "Summary", ar: "نبذة مهنية" },
  experience: { en: "Experience", ar: "الخبرة العملية" },
  graduation: { en: "Graduation Project", ar: "مشروع التخرج" },
  projects: { en: "Projects", ar: "المشاريع" },
  additional: { en: "Additional Projects", ar: "مشاريع إضافية" },
  skills: { en: "Skills", ar: "المهارات" },
  education: { en: "Education", ar: "التعليم" },
  languages: { en: "Languages", ar: "اللغات" },
  stack: { en: "Stack", ar: "التقنيات" },
} satisfies Record<string, L>;

export const ui = {
  skip: { en: "Skip to content", ar: "تخطَّ إلى المحتوى" },
  nav: {
    work: { en: "Work", ar: "الأعمال" },
    about: { en: "About", ar: "نبذة" },
    contact: { en: "Contact", ar: "تواصل" },
    switchTo: { en: "عربي", ar: "English" },
    switchLabel: { en: "Switch to Arabic", ar: "التبديل إلى الإنجليزية" },
  },
  loader: { en: "Assembling particles", ar: "تجميع الجسيمات" },
  hero: {
    eyebrow: { en: "Damascus · Open to AI & backend roles", ar: "دمشق · متاح لوظائف الذكاء الاصطناعي والأنظمة الخلفية" },
    intro: {
      en: "I turn models and messy requirements into production systems — fine-tuned NLP, leakage-safe ML and backends with hundreds of tests behind them.",
      ar: "أحوّل النماذج والمتطلبات المعقّدة إلى أنظمة إنتاجية — معالجة لغات مدرّبة، وتعلّم آلي خالٍ من التسرّب، وأنظمة خلفية تحميها مئات الاختبارات.",
    },
    viewWork: { en: "View work", ar: "استعرض الأعمال" },
    scroll: { en: "Scroll", ar: "مرّر" },
  },
  cv: {
    title: { en: "Download CV", ar: "تحميل السيرة الذاتية" },
    ai: { en: "AI Engineer", ar: "مهندس ذكاء اصطناعي" },
    backend: { en: "Backend Engineer", ar: "مهندس أنظمة خلفية" },
    english: { en: "English", ar: "إنجليزي" },
    arabic: { en: "Arabic", ar: "عربي" },
  },
  chapter: {
    client: { en: "Client project", ar: "مشروع لعميل" },
    graduation: { en: "Graduation project", ar: "مشروع التخرج" },
    product: { en: "Product", ar: "منتج" },
    readCase: { en: "Read the case study", ar: "اقرأ دراسة الحالة" },
  },
  clients: {
    eyebrow: { en: "Shipped for clients", ar: "مسلَّم لعملاء" },
    title: { en: "Live sites, real businesses.", ar: "مواقع تعمل الآن، لأعمال حقيقية." },
    visit: { en: "Visit live site", ar: "زيارة الموقع" },
  },
  more: {
    eyebrow: { en: "More work", ar: "أعمال أخرى" },
    title: { en: "Bots, wallets, models and games.", ar: "بوتات ومحافظ ونماذج وألعاب." },
    caseStudy: { en: "Case study", ar: "دراسة حالة" },
    source: { en: "Source", ar: "الشيفرة" },
  },
  about: {
    eyebrow: { en: "About", ar: "نبذة" },
    title: { en: "AI engineer by degree, systems engineer by habit.", ar: "مهندس ذكاء اصطناعي بالشهادة، ومهندس أنظمة بالممارسة." },
    education: { en: "Education", ar: "التعليم" },
    languages: { en: "Languages", ar: "اللغات" },
  },
  contact: {
    eyebrow: { en: "Contact", ar: "تواصل" },
    title: { en: "Let's build something real.", ar: "لنبنِ شيئاً حقيقياً." },
    body: {
      en: "Hiring for an AI or backend role, or need a system built? Email is the fastest way to reach me.",
      ar: "تبحث عن مهندس ذكاء اصطناعي أو أنظمة خلفية، أو تحتاج نظاماً يُبنى؟ البريد الإلكتروني أسرع طريقة للتواصل.",
    },
    copy: { en: "Copy email", ar: "نسخ البريد" },
    copied: { en: "Copied", ar: "تم النسخ" },
    rights: { en: "Built with Next.js, React Three Fiber and GSAP.", ar: "بُني بـ Next.js وReact Three Fiber وGSAP." },
  },
  work: {
    back: { en: "All work", ar: "كل الأعمال" },
    problem: { en: "The problem", ar: "المشكلة" },
    architecture: { en: "Architecture", ar: "البنية" },
    decisions: { en: "Key decisions", ar: "قرارات أساسية" },
    gallery: { en: "Screens", ar: "لقطات" },
    stack: { en: "Stack", ar: "التقنيات" },
    next: { en: "Next project", ar: "المشروع التالي" },
  },
} as const;
