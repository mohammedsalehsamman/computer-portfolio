import type { CvVariant, L, SkillGroup } from "./types";

export const profile = {
  name: { en: "Mohammed Saleh Samman", ar: "محمد صالح سمّان" } satisfies L,
  location: { en: "Damascus, Syria", ar: "دمشق، سوريا" } satisfies L,
  email: "mohammedsalehsamman@gmail.com",
  phone: "+963 985 911 577",
  links: {
    // Update `portfolio` once the new site is deployed to its own domain.
    portfolio: "https://mssportfolio.vercel.app",
    github: "https://github.com/mohammedsalehsamman",
    linkedin: "https://www.linkedin.com/in/mohammed-samman-221210448",
  },
  headline: {
    ai: {
      en: "AI Engineer · NLP & Machine Learning · Python",
      ar: "مهندس ذكاء اصطناعي · معالجة لغات طبيعية وتعلّم آلي · Python",
    },
    backend: {
      en: "Backend Engineer · Django · NestJS · PostgreSQL",
      ar: "مهندس أنظمة خلفية · Django · NestJS · PostgreSQL",
    },
  } satisfies Record<CvVariant, L>,
  /** Short role line for the portfolio hero. */
  role: {
    en: "AI & Backend Engineer",
    ar: "مهندس ذكاء اصطناعي وأنظمة خلفية",
  } satisfies L,
  summary: {
    ai: {
      en: "AI Engineering graduate who takes models to production. Fine-tuned a multilingual sentence-transformer for Arabic/English plagiarism detection inside ASPU Insight, a research platform adopted by Alsham Private University (852 tests, 89% coverage). Builds leakage-safe ML pipelines — purged walk-forward validation, meta-labeling, causal backtesting — and the Django, Celery and PostgreSQL backends that serve them.",
      ar: "خريج هندسة ذكاء اصطناعي ينقل النماذج إلى بيئة الإنتاج. درّب نموذج Sentence-Transformer متعدد اللغات لكشف الانتحال بالعربية والإنجليزية ضمن منصة ASPU Insight التي اعتمدتها جامعة الشام الخاصة (852 اختباراً، تغطية 89%). يبني خطوط تعلّم آلي خالية من تسرّب البيانات — تحقق Walk-Forward مع Purging، وMeta-Labeling، واختبار رجعي سببي — إلى جانب الأنظمة الخلفية التي تخدمها بـ Django وCelery وPostgreSQL.",
    },
    backend: {
      en: "Backend engineer and AI Engineering graduate shipping production systems for paying clients. Built Belle Biens, a contract-first NestJS/PostgreSQL commerce platform with Flutter and Next.js clients (125 API operations, 800+ automated tests, p95 23 ms), and the Django backend of ASPU Insight, a research platform adopted by Alsham Private University. Focused on API design, data integrity, asynchronous processing and security.",
      ar: "مهندس أنظمة خلفية وخريج هندسة ذكاء اصطناعي يسلّم أنظمة إنتاجية لعملاء حقيقيين. بنى منصة Belle Biens للتجارة الإلكترونية بنهج Contract-First عبر NestJS وPostgreSQL مع تطبيق Flutter ولوحة Next.js (125 عملية API، أكثر من 800 اختبار آلي، زمن استجابة p95 بحدود 23ms)، والنظام الخلفي لمنصة ASPU Insight التي اعتمدتها جامعة الشام الخاصة. يركّز على تصميم الواجهات البرمجية، وسلامة البيانات، والمعالجة غير المتزامنة، والأمان.",
    },
  } satisfies Record<CvVariant, L>,
  about: [
    {
      en: "I graduated in Information Engineering, majoring in Artificial Intelligence, from Alsham Private University in 2026. My graduation project, ASPU Insight, was adopted by the university — a Django platform with a fine-tuned plagiarism model at its core.",
      ar: "تخرّجت في هندسة المعلوماتية باختصاص الذكاء الاصطناعي من جامعة الشام الخاصة عام 2026. مشروع تخرّجي ASPU Insight اعتمدته الجامعة — منصة Django في قلبها نموذج مدرّب لكشف الانتحال.",
    },
    {
      en: "Alongside it I ship for clients: a full commerce platform for a Damascus shop and live sites for companies in Saudi Arabia and the UAE. I care about the unglamorous parts that make systems trustworthy — contracts, transactions, tests and honest evaluation.",
      ar: "وإلى جانب ذلك أسلّم مشاريع لعملاء: منصة تجارة متكاملة لمتجر في دمشق، ومواقع تعمل الآن لشركات في السعودية والإمارات. يهمّني ما لا يلفت النظر لكنه يصنع الثقة بالأنظمة — العقود البرمجية، والمعاملات، والاختبارات، والتقييم الصادق.",
    },
  ] satisfies L[],
  education: {
    degree: {
      en: "B.Eng. Information Engineering — Artificial Intelligence",
      ar: "بكالوريوس هندسة المعلوماتية — اختصاص الذكاء الاصطناعي",
    } satisfies L,
    school: {
      en: "Alsham Private University (ASPU), Damascus",
      ar: "جامعة الشام الخاصة (ASPU)، دمشق",
    } satisfies L,
    period: { en: "Graduated August 2026", ar: "تخرّج آب 2026" } satisfies L,
  },
  languages: [
    { en: "Arabic — native", ar: "العربية — اللغة الأم" },
    { en: "English — advanced", ar: "الإنجليزية — متقدّم" },
  ] satisfies L[],
};

export const skills: SkillGroup[] = [
  {
    title: { en: "AI / ML", ar: "الذكاء الاصطناعي / التعلّم الآلي" },
    items: [
      "PyTorch",
      "Hugging Face Transformers",
      "Sentence-Transformers",
      "scikit-learn",
      "XGBoost",
      "LightGBM",
      "CatBoost",
      "imbalanced-learn",
      "SHAP",
      "KeyBERT",
      "Pandas",
      "NumPy",
      "OpenCV",
      "TA-Lib",
      "NLP",
      "Embeddings & semantic search",
      "Time-series validation",
    ],
    cvOrder: { ai: 1, backend: 4 },
  },
  {
    title: { en: "Backend", ar: "الأنظمة الخلفية" },
    items: [
      "Django",
      "Django REST Framework",
      "Django Channels",
      "Celery",
      "NestJS",
      "Prisma",
      "Laravel",
      "REST",
      "OpenAPI",
      "JWT / OAuth",
      "WebSockets / SSE",
      "Stripe",
    ],
    cvOrder: { ai: 2, backend: 1 },
  },
  {
    title: { en: "Languages", ar: "لغات البرمجة" },
    items: ["Python", "TypeScript", "JavaScript", "SQL", "PHP", "Dart", "Java", "C++"],
    cvOrder: { ai: 3, backend: 2 },
  },
  {
    title: { en: "Data & Infrastructure", ar: "البيانات والبنية التحتية" },
    items: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Supabase",
      "Docker",
      "Linux",
      "GitHub Actions",
      "Vercel",
      "Cloudflare",
      "Oracle Cloud",
    ],
    cvOrder: { ai: 4, backend: 3 },
  },
  {
    title: { en: "Frontend & Mobile", ar: "الواجهات والتطبيقات" },
    items: ["React", "Next.js", "TanStack Start", "Tailwind CSS", "Flutter", "React Native / Expo"],
    cvOrder: { ai: 6, backend: 5 },
  },
  {
    title: { en: "Testing & Quality", ar: "الاختبار والجودة" },
    items: ["pytest", "Jest / Vitest", "Playwright", "k6", "Locust", "OWASP ZAP"],
    cvOrder: { ai: 5, backend: 6 },
  },
];
