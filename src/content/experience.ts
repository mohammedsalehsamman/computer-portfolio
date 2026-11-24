import type { Experience } from "./types";

export const experience: Experience[] = [
  {
    id: "belle",
    role: { en: "Freelance Full-Stack Engineer", ar: "مهندس برمجيات متكاملة (عمل حر)" },
    org: { en: "Belle Biens (flower, cake & coffee shop)", ar: "Belle Biens (متجر ورد وكيك وقهوة)" },
    location: { en: "Damascus", ar: "دمشق" },
    period: { en: "2026 – Present", ar: "2026 – حتى الآن" },
    cvOrder: { backend: 1, ai: 1 },
    bullets: [
      {
        cv: ["ai", "backend"],
        text: {
          en: "Architected a pnpm monorepo for a paying client: a NestJS 12 + Prisma/PostgreSQL API (125 operations, 36 tables), a Flutter customer app (31 screens) and a Next.js 16 staff dashboard (31 pages), all bilingual Arabic/English with RTL.",
          ar: "صمّمت مستودعاً موحّداً (pnpm monorepo) لعميل حقيقي يضم واجهة برمجية NestJS 12 مع Prisma وPostgreSQL (125 عملية، 36 جدولاً)، وتطبيق Flutter للزبائن (31 شاشة)، ولوحة تحكم Next.js 16 للموظفين (31 صفحة)، وجميعها ثنائية اللغة مع دعم RTL.",
        },
      },
      {
        cv: ["backend"],
        text: {
          en: "Adopted contract-first development: CI fails when the OpenAPI spec drifts from the running API, and the dashboard types and Flutter client are generated from it, so breaking changes surface at build time.",
          ar: "اعتمدت نهج Contract-First: يفشل CI عند اختلاف مواصفة OpenAPI عن الواجهة الفعلية، وتُولَّد منها أنواع لوحة التحكم وعميل Flutter تلقائياً، فتظهر أي تغييرات كاسرة أثناء البناء.",
        },
      },
      {
        cv: ["backend"],
        text: {
          en: "Made the server the single pricing authority while keeping instant in-app estimates: shared TypeScript and Dart rule implementations are verified against common JSON test vectors.",
          ar: "جعلت الخادم المرجع الوحيد للتسعير مع الإبقاء على تقديرات فورية داخل التطبيق، عبر تنفيذين متطابقين للقواعد بـ TypeScript وDart يُتحقق منهما بمتجهات اختبار JSON مشتركة.",
        },
      },
      {
        cv: ["ai", "backend"],
        text: {
          en: "Engineered a safe checkout: idempotent order requests, stock decremented inside the order transaction, locked delivery slots to prevent overbooking, and automatic cancellation of unpaid orders.",
          ar: "بنيت عملية دفع آمنة: طلبات Idempotent، وخصم المخزون داخل معاملة الطلب نفسها، وقفل مواعيد التوصيل لمنع الحجز المزدوج، وإلغاء تلقائي للطلبات غير المدفوعة.",
        },
      },
      {
        cv: ["backend"],
        text: {
          en: "Implemented authentication end to end: phone OTP and Google sign-in, rotating refresh tokens, role-based access, and TOTP 2FA for managers with AES-256-GCM-encrypted secrets, lockouts and recovery codes; OWASP ZAP scan (122 rules) passes clean.",
          ar: "نفّذت منظومة المصادقة كاملة: رمز تحقق عبر الهاتف وتسجيل دخول Google، وRefresh Tokens متجددة، وصلاحيات حسب الدور، وتحقق ثنائي TOTP للمدراء مع تشفير AES-256-GCM وقفل بعد المحاولات الفاشلة ورموز استرداد؛ وفحص OWASP ZAP (122 قاعدة) دون أي إخفاق.",
        },
      },
      {
        cv: ["ai", "backend"],
        text: {
          en: "Wrote 800+ automated tests (423 API, 267 Flutter including golden tests, 116 dashboard including Playwright) and load-tested with k6: ~180 req/s per process, p95 of 23 ms for browsing and 113 ms for checkout.",
          ar: "كتبت أكثر من 800 اختبار آلي (423 للواجهة البرمجية، 267 لتطبيق Flutter مع Golden Tests، 116 للوحة التحكم مع Playwright)، واختبرت الحمل بـ k6: نحو 180 طلباً/ثانية لكل عملية، وp95 بحدود 23ms للتصفح و113ms لإتمام الطلب.",
        },
      },
      {
        cv: ["backend"],
        text: {
          en: "Set up delivery: 5 GitHub Actions workflows, Codemagic mobile builds to the Play internal track and TestFlight, Docker Compose infrastructure, and encrypted daily backups with a tested restore.",
          ar: "جهّزت خط التسليم: 5 مسارات GitHub Actions، وبناء تطبيقات الجوال عبر Codemagic إلى Play Internal وTestFlight، وبنية Docker Compose، ونسخ احتياطي يومي مشفّر مع استعادة مُختبرة.",
        },
      },
    ],
  },
  {
    id: "sada",
    role: { en: "Freelance Web Developer", ar: "مطوّر ويب (عمل حر)" },
    org: { en: "Sada Al-Masar Construction", ar: "صدى المسار للمقاولات" },
    period: { en: "2026", ar: "2026" },
    cvOrder: { backend: 2, ai: 2 },
    links: [{ label: { en: "sada-almasar.com", ar: "sada-almasar.com" }, href: "https://sada-almasar.com" }],
    bullets: [
      {
        cv: ["ai", "backend"],
        text: {
          en: "Delivered a bilingual (Arabic/English) corporate website, live at sada-almasar.com, using TanStack Start (SSR), React 19, Tailwind CSS and Supabase.",
          ar: "سلّمت موقعاً مؤسسياً ثنائي اللغة يعمل حالياً على sada-almasar.com، باستخدام TanStack Start (SSR) وReact 19 وTailwind CSS وSupabase.",
        },
      },
      {
        cv: ["ai", "backend"],
        text: {
          en: "Built a custom admin CMS that lets the owner manage projects, gallery, clients, news, statistics and site settings (6 content tables) and upload images without a developer.",
          ar: "بنيت نظام إدارة محتوى مخصّصاً يتيح للمالك إدارة المشاريع والمعرض والعملاء والأخبار والإحصائيات وإعدادات الموقع (6 جداول) ورفع الصور دون الحاجة لمطوّر.",
        },
      },
      {
        cv: ["backend"],
        text: {
          en: "Configured the custom domain through Cloudflare and consent-gated analytics (GA/GTM); maintain the site under a one-year support agreement.",
          ar: "ضبطت النطاق عبر Cloudflare والتحليلات (GA/GTM) المشروطة بموافقة الزائر، وأتولى الصيانة ضمن عقد دعم لمدة عام.",
        },
      },
    ],
  },
  {
    id: "directways",
    role: { en: "Freelance Front-End Developer", ar: "مطوّر واجهات (عمل حر)" },
    org: { en: "Direct Ways Travel & Tourism (UAE)", ar: "Direct Ways للسفر والسياحة (الإمارات)" },
    period: { en: "2026", ar: "2026" },
    cvOrder: { backend: 3, ai: 3 },
    links: [{ label: { en: "directways.ae", ar: "directways.ae" }, href: "https://directways.ae" }],
    bullets: [
      {
        cv: ["ai", "backend"],
        text: {
          en: "Designed and built the website of a UAE travel agency (flights, hotels, Umrah, visas), live at directways.ae, with TanStack Start, React 19 and Tailwind CSS, and handed over the full source code.",
          ar: "صمّمت وبنيت موقع وكالة سفر إماراتية (طيران، فنادق، عمرة، تأشيرات) يعمل على directways.ae باستخدام TanStack Start وReact 19 وTailwind CSS، وسلّمت الشيفرة المصدرية كاملة.",
        },
      },
      {
        cv: ["backend"],
        text: {
          en: "Built destination, offer and package pages with a WhatsApp lead form that routes inquiries straight to the sales team.",
          ar: "بنيت صفحات الوجهات والعروض والباقات مع نموذج تواصل عبر واتساب يوصل الاستفسارات مباشرة إلى فريق المبيعات.",
        },
      },
    ],
  },
];
