import type { Project } from "./types";

const gh = (repo: string) => `https://github.com/mohammedsalehsamman/${repo}`;

export const projects: Project[] = [
  {
    // CV shows Belle under Experience; this entry powers the portfolio case study.
    slug: "belle-biens",
    featured: 1,
    name: { en: "Belle Biens", ar: "Belle Biens" },
    tagline: {
      en: "Commerce platform for a flower, cake & coffee shop — API, mobile app, staff dashboard",
      ar: "منصة تجارة لمتجر ورد وكيك وقهوة — واجهة برمجية وتطبيق جوال ولوحة موظفين",
    },
    period: "2026",
    role: { en: "Freelance full-stack engineer — client project", ar: "مهندس برمجيات متكاملة — مشروع لعميل" },
    stack: ["NestJS 12", "Prisma", "PostgreSQL", "Redis", "Flutter", "Riverpod", "Next.js 16", "OpenAPI", "Docker", "k6"],
    metrics: [
      { value: "125", label: { en: "API operations", ar: "عملية API" } },
      { value: "806", label: { en: "automated tests", ar: "اختبار آلي" } },
      { value: "23 ms", label: { en: "p95 browsing latency", ar: "زمن استجابة p95" } },
      { value: "36", label: { en: "database tables", ar: "جدولاً" } },
    ],
    images: [
      { src: "/work/belle-biens/screen-home.png", frame: "phone", alt: { en: "Belle Biens app home screen in Arabic", ar: "الشاشة الرئيسية لتطبيق Belle Biens" } },
      { src: "/work/belle-biens/screen-dsg1.png", frame: "phone", alt: { en: "Bouquet designer, step 1 of 4", ar: "مصمّم الباقات، الخطوة 1 من 4" } },
      { src: "/work/belle-biens/preview_luxury-100-stems-three-colors.png", frame: "plain", alt: { en: "Rendered 100-stem bouquet preview from the shared layout engine", ar: "معاينة باقة من 100 وردة ناتجة عن محرك التنسيق المشترك" } },
    ],
    cvOrder: {},
    bullets: [],
  },
  {
    slug: "aspu-insight",
    kind: "graduation",
    featured: 3,
    name: { en: "ASPU Insight", ar: "ASPU Insight" },
    tagline: {
      en: "AI-powered research submission & peer-review platform",
      ar: "منصة لتقديم الأبحاث وتحكيمها مدعومة بالذكاء الاصطناعي",
    },
    period: "2026",
    role: { en: "Backend & AI lead — graduation project", ar: "مسؤول النظام الخلفي والذكاء الاصطناعي — مشروع التخرج" },
    stack: [
      "Django 5.2",
      "DRF",
      "PostgreSQL",
      "Celery",
      "Redis",
      "Django Channels",
      "PyTorch",
      "Sentence-Transformers",
      "KeyBERT",
      "Docker",
    ],
    metrics: [
      { value: "852", label: { en: "automated tests", ar: "اختبار آلي" } },
      { value: "89%", label: { en: "test coverage", ar: "تغطية الاختبارات" } },
      { value: "76", label: { en: "API routes", ar: "مسار API" } },
      { value: "10", label: { en: "model experiments", ar: "تجربة تدريب" } },
    ],
    links: [{ label: { en: "GitHub", ar: "GitHub" }, href: gh("aspu-insight") }],
    cvOrder: { ai: 1, backend: 1 },
    bullets: [
      {
        cv: ["ai", "backend"],
        text: {
          en: "Led the backend and AI of a research submission and peer-review platform adopted by Alsham Private University: Django 5.2, DRF, JWT and PostgreSQL, with 21 data models and 76 API routes covering submission, committee assignment and multi-role review.",
          ar: "قدت النظام الخلفي والذكاء الاصطناعي لمنصة تقديم الأبحاث وتحكيمها التي اعتمدتها جامعة الشام الخاصة: Django 5.2 وDRF وJWT وPostgreSQL، مع 21 نموذج بيانات و76 مساراً تغطي التقديم وتعيين اللجان والتحكيم متعدد الأدوار.",
        },
      },
      {
        cv: ["ai", "backend"],
        text: {
          en: "Fine-tuned a multilingual MiniLM sentence-transformer for Arabic/English plagiarism detection across 10 tracked experiments, combining internal embedding similarity search with external source verification.",
          ar: "درّبت نموذج MiniLM متعدد اللغات (Sentence-Transformer) لكشف الانتحال بالعربية والإنجليزية عبر 10 تجارب موثّقة، يجمع بين البحث بالتشابه الدلالي داخلياً والتحقق من المصادر الخارجية.",
        },
      },
      {
        cv: ["ai"],
        text: {
          en: "Built an IEEE citation compliance checker that parses PDF/DOCX papers, matches in-text citations to references and verifies DOIs through the Crossref API.",
          ar: "بنيت مدقّقاً لتوافق الاستشهادات مع معيار IEEE يحلّل ملفات PDF/DOCX ويطابق الاستشهادات بالمراجع ويتحقق من معرّفات DOI عبر Crossref API.",
        },
      },
      {
        cv: ["ai"],
        text: {
          en: "Developed an NLP claim-evidence graph extractor, metadata quality scoring, and an embedding-based paper and reviewer recommendation engine to support reviewers.",
          ar: "طوّرت مستخرجاً لمخطط الادعاءات والأدلة بمعالجة اللغات الطبيعية، وتقييماً لجودة البيانات الوصفية، ومحرك توصية بالأبحاث والمحكّمين قائماً على التضمينات الدلالية.",
        },
      },
      {
        cv: ["ai", "backend"],
        text: {
          en: "Moved plagiarism checks, citation analysis and embedding jobs to Celery/Redis workers, with real-time notifications over Django Channels and Daphne.",
          ar: "نقلت فحص الانتحال وتحليل الاستشهادات وتوليد التضمينات إلى عمّال Celery/Redis، مع إشعارات فورية عبر Django Channels وDaphne.",
        },
      },
      {
        cv: ["ai", "backend"],
        text: {
          en: "Reached 852 tests and 89% coverage, load-tested with Locust, documented the API with OpenAPI (drf-spectacular), hardened login with django-axes, and deployed a 7-service Docker Compose stack to Oracle Cloud ARM through GitHub Actions.",
          ar: "وصلت إلى 852 اختباراً وتغطية 89%، واختبرت الحمل بـ Locust، ووثّقت الواجهة بـ OpenAPI (drf-spectacular)، وحصّنت تسجيل الدخول بـ django-axes، ونشرت 7 خدمات عبر Docker Compose على Oracle Cloud ARM بواسطة GitHub Actions.",
        },
      },
    ],
  },
  {
    slug: "momentum-signal-system",
    featured: 2,
    name: { en: "Momentum Signal System", ar: "Momentum Signal System" },
    tagline: {
      en: "ML trading research & execution SaaS for XAU/USD",
      ar: "منصة SaaS لأبحاث وتنفيذ التداول بالتعلّم الآلي على الذهب",
    },
    period: "2025 – 2026",
    stack: [
      "Django 6",
      "DRF",
      "Celery",
      "Channels",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "XGBoost",
      "scikit-learn",
      "TA-Lib",
      "MetaTrader 5",
      "React",
    ],
    metrics: [
      { value: "25", label: { en: "ATR-normalised features", ar: "ميزة مطبّعة بـ ATR" } },
      { value: "9", label: { en: "strategies under look-ahead tests", ar: "استراتيجيات تحت اختبار التسرّب" } },
      { value: "~450", label: { en: "backend tests", ar: "اختبار للنظام الخلفي" } },
    ],
    links: [{ label: { en: "GitHub", ar: "GitHub" }, href: gh("momentum-signal-system-backend") }],
    cvOrder: { ai: 2, backend: 2 },
    bullets: [
      {
        cv: ["ai"],
        text: {
          en: "Built an XGBoost meta-labeling model (25 ATR-normalised features) that approves or rejects rule-based XAU/USD setups, trained with purged expanding walk-forward validation, an embargo, isotonic calibration and an untouched holdout.",
          ar: "بنيت نموذج Meta-Labeling بـ XGBoost (25 ميزة مطبّعة بـ ATR) يقبل أو يرفض إشارات الذهب الناتجة عن القواعد، مدرّباً بتحقق Walk-Forward توسّعي مع Purging وEmbargo ومعايرة Isotonic وفترة اختبار نهائية لم تُلمس.",
        },
      },
      {
        cv: ["ai"],
        text: {
          en: "Wrote a causal backtester that reuses the live risk manager: bid/ask fills on M1 bars, stop-first resolution, an hour-of-week spread model, slippage, commission and Monte Carlo drawdown, with look-ahead tests across 9 strategies.",
          ar: "كتبت محرك اختبار رجعي سببي يعيد استخدام مدير المخاطر الحي: تنفيذ على Bid/Ask بشموع دقيقة، وأولوية وقف الخسارة، ونموذج سبريد حسب ساعة الأسبوع، وانزلاق وعمولة، وتقدير السحب بـ Monte Carlo، مع اختبارات تسرّب لـ 9 استراتيجيات.",
        },
      },
      {
        cv: ["ai"],
        text: {
          en: "Audited earlier research for look-ahead leakage and gated every model behind readiness stages: demo-only until out-of-sample results stay positive after costs, with SHA-256-pinned model files that refuse feature-schema mismatches.",
          ar: "راجعت الأبحاث السابقة بحثاً عن تسرّب البيانات المستقبلية، وأخضعت كل نموذج لمراحل جاهزية: حساب تجريبي فقط حتى تبقى النتائج خارج العينة إيجابية بعد التكاليف، مع تثبيت ملفات النماذج ببصمة SHA-256 ورفض أي اختلاف في مخطط الميزات.",
        },
      },
      {
        cv: ["backend"],
        text: {
          en: "Built a subscription SaaS (Django 6, DRF, Celery, Channels, PostgreSQL, Stripe) that runs automated MetaTrader 5 strategies on users' own accounts, with KYC, an admin panel and live trade streaming over WebSockets.",
          ar: "بنيت منصة SaaS باشتراكات (Django 6 وDRF وCelery وChannels وPostgreSQL وStripe) تشغّل استراتيجيات MetaTrader 5 آلياً على حسابات المستخدمين، مع توثيق الهوية KYC ولوحة إدارة وبث مباشر للصفقات عبر WebSockets.",
        },
      },
      {
        cv: ["backend"],
        text: {
          en: "Designed a distributed execution gateway: Linux web servers dispatch orders to Windows MT5 terminal nodes through per-terminal Celery workers, with Redis locks and Fernet-encrypted broker credentials.",
          ar: "صمّمت بوابة تنفيذ موزّعة: خوادم Linux ترسل الأوامر إلى عُقد MT5 على Windows عبر عامل Celery لكل منصة، مع أقفال Redis وتشفير بيانات الوسيط بـ Fernet.",
        },
      },
      {
        cv: ["backend"],
        text: {
          en: "Added ~450 backend tests, look-ahead tests for 9 strategies, and SHA-256-verified model loading that refuses feature-schema mismatches.",
          ar: "أضفت نحو 450 اختباراً للنظام الخلفي، واختبارات تسرّب لـ 9 استراتيجيات، وتحميلاً للنماذج موثّقاً ببصمة SHA-256 يرفض اختلاف مخطط الميزات.",
        },
      },
    ],
  },
  {
    slug: "telecom-churn",
    featured: 6,
    name: { en: "Telecom Customer Churn Prediction", ar: "التنبؤ بتسرّب عملاء الاتصالات" },
    tagline: {
      en: "10-model comparison with SMOTE, SHAP and segmentation",
      ar: "مقارنة 10 نماذج مع SMOTE وSHAP وتقسيم العملاء",
    },
    period: "2025",
    stack: ["Python", "scikit-learn", "XGBoost", "LightGBM", "CatBoost", "imbalanced-learn", "SHAP", "Pandas"],
    metrics: [
      { value: "0.79", label: { en: "recall (SVM + SMOTE)", ar: "Recall (SVM + SMOTE)" } },
      { value: "0.85", label: { en: "best ROC-AUC", ar: "أفضل ROC-AUC" } },
      { value: "7,043", label: { en: "customers", ar: "عميل" } },
    ],
    links: [{ label: { en: "GitHub", ar: "GitHub" }, href: "https://github.com/Mohammedsamman18/telecom-churn-prediction" }],
    cvOrder: { ai: 3 },
    bullets: [
      {
        cv: ["ai"],
        text: {
          en: "Compared 10 classifiers (Logistic Regression, SVM, XGBoost, LightGBM, CatBoost and others) on 7,043 customers with and without SMOTE: best recall 0.79 (SVM + SMOTE, ROC-AUC 0.82) and best ROC-AUC 0.85 (Logistic Regression).",
          ar: "قارنت 10 مصنّفات (Logistic Regression وSVM وXGBoost وLightGBM وCatBoost وغيرها) على 7,043 عميلاً مع SMOTE وبدونه: أفضل Recall بلغ 0.79 (SVM + SMOTE، ROC-AUC 0.82) وأفضل ROC-AUC بلغ 0.85 (Logistic Regression).",
        },
      },
      {
        cv: ["ai"],
        text: {
          en: "Explained churn drivers with SHAP and segmented customers with K-Means, isolating a high-risk segment with 47% churn versus 12% in the lowest-risk segment.",
          ar: "فسّرت أسباب التسرّب بـ SHAP وقسّمت العملاء بـ K-Means، فحدّدت شريحة عالية الخطورة بنسبة تسرّب 47% مقابل 12% في الشريحة الأقل خطورة.",
        },
      },
    ],
  },
  {
    slug: "aspu-it-bot",
    featured: 5,
    name: { en: "ASPU IT Bot", ar: "بوت ASPU IT" },
    tagline: {
      en: "Telegram bot delivering lectures to IT students",
      ar: "بوت تيليغرام يوصل المحاضرات لطلاب المعلوماتية",
    },
    period: "2026",
    stack: ["Python", "aiogram 3", "SQLAlchemy (async)", "APScheduler", "Google Drive API", "Docker", "pytest"],
    metrics: [],
    links: [{ label: { en: "GitHub", ar: "GitHub" }, href: gh("ASPU_IT_BOT") }],
    cvOrder: { backend: 3 },
    cvOneLine: {
      cv: ["ai"],
      text: {
        en: "ASPU IT Bot — async Telegram bot (aiogram 3, SQLAlchemy) serving lectures synced from Google Drive, with exam reminders and PDF security scanning.",
        ar: "بوت ASPU IT — بوت تيليغرام غير متزامن (aiogram 3 وSQLAlchemy) يقدّم المحاضرات المتزامنة من Google Drive مع تذكير بالامتحانات وفحص أمني لملفات PDF.",
      },
    },
    bullets: [
      {
        cv: ["backend"],
        text: {
          en: "Built a Telegram bot (aiogram 3, async SQLAlchemy, APScheduler) that serves IT students their lectures synced from Google Drive, with exam reminders and an admin panel.",
          ar: "بنيت بوت تيليغرام (aiogram 3 وSQLAlchemy غير المتزامن وAPScheduler) يقدّم لطلاب المعلوماتية محاضراتهم المتزامنة من Google Drive مع تذكير بالامتحانات ولوحة إدارة.",
        },
      },
      {
        cv: ["backend"],
        text: {
          en: "Accepted student-contributed files safely through PDF security scanning; containerised with Docker and covered with pytest.",
          ar: "أتحت للطلاب رفع ملفات بأمان عبر فحص أمني لملفات PDF، مع حاويات Docker واختبارات pytest.",
        },
      },
    ],
  },
  {
    slug: "multi-chain-wallet",
    featured: 4,
    name: { en: "Multi-Chain Wallet", ar: "محفظة متعددة السلاسل" },
    tagline: {
      en: "Mobile crypto wallet for 8 chains",
      ar: "محفظة عملات رقمية للجوال تدعم 8 شبكات",
    },
    period: "2025",
    stack: ["React Native", "Expo", "TypeScript", "ethers.js", "Reanimated", "SecureStore"],
    metrics: [
      { value: "8", label: { en: "chains incl. TRON", ar: "شبكات منها TRON" } },
      { value: "13", label: { en: "screens", ar: "شاشة" } },
    ],
    cvOrder: {},
    cvOneLine: {
      cv: ["ai", "backend"],
      text: {
        en: "Multi-Chain Wallet — React Native/Expo wallet for 8 EVM and TRON chains: send flow, swaps, portfolio, biometric lock and SecureStore.",
        ar: "محفظة متعددة السلاسل — تطبيق React Native/Expo لـ 8 شبكات EVM وTRON: إرسال، تبديل، محفظة استثمارية، قفل بالبصمة وتخزين آمن.",
      },
    },
    bullets: [],
  },
  {
    slug: "sheda-online",
    featured: 7,
    name: { en: "Sheda Online", ar: "شدّة أونلاين" },
    tagline: {
      en: "Real-time multiplayer version of a traditional card game",
      ar: "نسخة جماعية فورية من لعبة ورق شعبية",
    },
    period: "2025",
    stack: ["React", "TypeScript", "Supabase Realtime", "Deno Edge Functions", "PostgreSQL RLS", "Tailwind"],
    metrics: [],
    cvOrder: {},
    cvOneLine: {
      cv: ["ai", "backend"],
      text: {
        en: "Sheda Online — real-time 2v2 card game: Supabase Realtime, an authoritative Deno Edge Function game server and row-level security; 800-line rules engine with AI bots.",
        ar: "شدّة أونلاين — لعبة ورق 2 ضد 2 فورية: Supabase Realtime وخادم لعب موثوق عبر Deno Edge Function وأمان على مستوى الصفوف؛ ومحرك قواعد من 800 سطر مع لاعبين آليين.",
      },
    },
    bullets: [],
  },
  {
    slug: "dscc-dis",
    name: { en: "DSCC Distributed System", ar: "نظام DSCC الموزّع" },
    tagline: {
      en: "SOAP + RMI distributed services in Java",
      ar: "خدمات موزّعة بـ SOAP وRMI بلغة Java",
    },
    period: "2026",
    stack: ["Java 17", "JAX-WS", "Java RMI", "Maven", "Swing"],
    metrics: [],
    links: [{ label: { en: "GitHub", ar: "GitHub" }, href: gh("dscc-dis") }],
    cvOrder: {},
    cvOneLine: {
      cv: ["backend"],
      text: {
        en: "DSCC Distributed System — Java 17 SOAP (JAX-WS) and RMI services with live callbacks, single sign-on and PBKDF2 password hashing.",
        ar: "نظام DSCC الموزّع — خدمات SOAP (JAX-WS) وRMI بـ Java 17 مع استدعاءات راجعة فورية وتسجيل دخول موحّد وتشفير كلمات المرور بـ PBKDF2.",
      },
    },
    bullets: [],
  },
  {
    slug: "sada-almasar",
    client: true,
    live: "https://sada-almasar.com",
    name: { en: "Sada Al-Masar", ar: "صدى المسار" },
    tagline: {
      en: "Bilingual construction company site with a custom CMS",
      ar: "موقع شركة مقاولات ثنائي اللغة مع نظام إدارة محتوى مخصّص",
    },
    period: "2026",
    role: { en: "Freelance — design, build, hosting & support", ar: "عمل حر — تصميم وتطوير واستضافة ودعم" },
    stack: ["TanStack Start", "React 19", "Tailwind 4", "Supabase", "Cloudflare"],
    metrics: [{ value: "6", label: { en: "CMS-managed tables", ar: "جداول يديرها المالك" } }],
    images: [
      { src: "/work/sada-almasar/hero.png", frame: "browser", alt: { en: "Sada Al-Masar home page", ar: "الصفحة الرئيسية لموقع صدى المسار" } },
      { src: "/work/sada-almasar/projects.png", frame: "browser", alt: { en: "Sada Al-Masar projects page", ar: "صفحة مشاريع صدى المسار" } },
    ],
    cvOrder: {},
    bullets: [],
  },
  {
    slug: "direct-ways",
    client: true,
    live: "https://directways.ae",
    name: { en: "Direct Ways", ar: "Direct Ways" },
    tagline: {
      en: "UAE travel agency site — flights, hotels, Umrah, visas",
      ar: "موقع وكالة سفر إماراتية — طيران وفنادق وعمرة وتأشيرات",
    },
    period: "2026",
    role: { en: "Freelance — design & front-end", ar: "عمل حر — تصميم وتطوير واجهات" },
    stack: ["TanStack Start", "React 19", "Tailwind 4", "Recharts"],
    metrics: [],
    images: [
      { src: "/work/direct-ways/hero.jpg", frame: "browser", alt: { en: "Direct Ways hero image of Maldives villas", ar: "صورة واجهة Direct Ways لفلل المالديف" } },
    ],
    cvOrder: {},
    bullets: [],
  },
];
