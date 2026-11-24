import type { CaseStudy } from "./types";

/** Long-form content for /[lang]/work/[slug]. Facts verified against each repo. */
export const caseStudies: Record<string, CaseStudy> = {
  "belle-biens": {
    problem: {
      en: "A Damascus shop selling flowers, cakes and coffee wanted customers to design bouquets visually and order for delivery or pickup — in a market where push notifications are unreliable, Google Maps is unavailable and payment is cash on delivery or Sham Cash.",
      ar: "أراد متجر في دمشق يبيع الورد والكيك والقهوة أن يصمّم زبائنه باقاتهم بصرياً ويطلبوها للتوصيل أو الاستلام — في سوق لا يمكن فيه الاعتماد على الإشعارات الفورية، ولا تتوفر فيه خرائط Google، والدفع نقدي عند الاستلام أو عبر شام كاش.",
    },
    flow: [
      { label: { en: "Flutter app", ar: "تطبيق Flutter" }, detail: { en: "Bouquet designer with instant estimates, RTL-first, 31 screens", ar: "مصمّم باقات مع تقدير فوري للسعر، يدعم RTL أولاً، 31 شاشة" } },
      { label: { en: "OpenAPI contract", ar: "عقد OpenAPI" }, detail: { en: "Generates the Dart client and dashboard types; CI fails on drift", ar: "يولّد عميل Dart وأنواع لوحة التحكم؛ ويفشل CI عند أي اختلاف" } },
      { label: { en: "NestJS API", ar: "واجهة NestJS" }, detail: { en: "14 modules, 125 operations, pricing authority, 2FA", ar: "14 وحدة، 125 عملية، مرجع التسعير، تحقق ثنائي" } },
      { label: { en: "PostgreSQL + Prisma", ar: "PostgreSQL مع Prisma" }, detail: { en: "36 tables; stock and delivery slots locked inside order transactions", ar: "36 جدولاً؛ المخزون ومواعيد التوصيل تُقفل داخل معاملة الطلب" } },
      { label: { en: "Next.js dashboard", ar: "لوحة Next.js" }, detail: { en: "Token-holding server layer, live order stream over SSE", ar: "طبقة خادم تحتفظ بالرموز، وبث مباشر للطلبات عبر SSE" } },
    ],
    decisions: [
      {
        title: { en: "The server owns every price", ar: "الخادم يملك كل سعر" },
        body: {
          en: "The app shows an instant estimate using the same rules, then the server's quote replaces it 400 ms after the last change. The client never sends a price, so tampering is impossible and estimates still feel instant.",
          ar: "يعرض التطبيق تقديراً فورياً بالقواعد نفسها، ثم يستبدله عرض الخادم بعد 400ms من آخر تعديل. العميل لا يرسل أي سعر، فيستحيل التلاعب بينما يبقى الإحساس فورياً.",
        },
      },
      {
        title: { en: "One layout algorithm, two languages", ar: "خوارزمية تنسيق واحدة بلغتين" },
        body: {
          en: "The bouquet layout is a whole-number algorithm implemented in both TypeScript and Dart, and both must pass the same JSON test vectors — so the preview a customer sees is exactly what staff assemble.",
          ar: "تنسيق الباقة خوارزمية بأعداد صحيحة منفّذة بـ TypeScript وDart معاً، ويجب أن يجتاز التنفيذان متجهات اختبار JSON نفسها — فما يراه الزبون في المعاينة هو تماماً ما يجهّزه الموظفون.",
        },
      },
      {
        title: { en: "Built for local conditions", ar: "مبني لظروف السوق المحلي" },
        body: {
          en: "Maps without Google, bundled fonts, order tracking that polls every minute instead of trusting push, Arabic search normalisation, and a choice between Arabic and Western digits.",
          ar: "خرائط بدون Google، وخطوط مضمّنة في التطبيق، وتتبّع للطلب يتحقق كل دقيقة بدل الاعتماد على الإشعارات، وتطبيع للبحث العربي، وخيار بين الأرقام العربية والغربية.",
        },
      },
    ],
  },
  "momentum-signal-system": {
    problem: {
      en: "Trading signals that look excellent in a backtest often fail live because of look-ahead leakage and unrealistic fills. The goal: a platform that runs strategies on real MetaTrader 5 accounts only after they survive an honest test.",
      ar: "إشارات التداول التي تبدو ممتازة في الاختبار الرجعي تفشل غالباً في السوق الحقيقي بسبب تسرّب بيانات المستقبل وافتراضات تنفيذ غير واقعية. الهدف: منصة لا تشغّل الاستراتيجيات على حسابات MetaTrader 5 حقيقية إلا بعد أن تجتاز اختباراً صادقاً.",
    },
    flow: [
      { label: { en: "Market data", ar: "بيانات السوق" }, detail: { en: "MT5 bars and CSVs aligned to the broker clock, DST-aware", ar: "شموع MT5 وملفات CSV مضبوطة على توقيت الوسيط مع التوقيت الصيفي" } },
      { label: { en: "Features", ar: "الميزات" }, detail: { en: "25 ATR-normalised, multi-timeframe features", ar: "25 ميزة مطبّعة بـ ATR ومتعددة الأطر الزمنية" } },
      { label: { en: "Setups + ML gate", ar: "الإشارات وبوابة التعلّم الآلي" }, detail: { en: "Rule-based setups filtered by an XGBoost meta-label model", ar: "إشارات قائمة على قواعد يرشّحها نموذج Meta-Label بـ XGBoost" } },
      { label: { en: "Risk manager", ar: "مدير المخاطر" }, detail: { en: "Same code in the backtester and live", ar: "الشيفرة نفسها في الاختبار الرجعي والتشغيل الحي" } },
      { label: { en: "Execution nodes", ar: "عُقد التنفيذ" }, detail: { en: "Celery workers per Windows MT5 terminal, Redis locks", ar: "عامل Celery لكل منصة MT5 على Windows مع أقفال Redis" } },
      { label: { en: "Dashboards", ar: "لوحات التحكم" }, detail: { en: "React user and admin apps, live trades over WebSockets", ar: "تطبيقا React للمستخدم والإدارة مع بث مباشر للصفقات" } },
    ],
    decisions: [
      {
        title: { en: "Meta-labeling, not price prediction", ar: "Meta-Labeling بدل التنبؤ بالسعر" },
        body: {
          en: "The model doesn't guess where price goes; it decides whether a rule-based setup is worth taking. It is trained with purged expanding walk-forward validation and an embargo, calibrated with isotonic regression, and its threshold is chosen on validation data only.",
          ar: "لا يخمّن النموذج اتجاه السعر، بل يقرّر إن كانت الإشارة تستحق الدخول. يُدرَّب بتحقق Walk-Forward توسّعي مع Purging وEmbargo، ويُعاير بـ Isotonic، ويُختار عتبته على بيانات التحقق فقط.",
        },
      },
      {
        title: { en: "A backtester that can't cheat", ar: "اختبار رجعي لا يمكنه الغش" },
        body: {
          en: "Fills happen at bid/ask on one-minute bars, the stop is assumed hit first when a bar touches both levels, spread follows an hour-of-week model, and slippage, commission and Monte Carlo drawdown are included. Look-ahead tests guard 9 strategies.",
          ar: "التنفيذ على Bid/Ask بشموع الدقيقة، ويُفترض ضرب وقف الخسارة أولاً عند لمس المستويين، والسبريد يتبع نموذجاً حسب ساعة الأسبوع، مع احتساب الانزلاق والعمولة والسحب بـ Monte Carlo. واختبارات التسرّب تحمي 9 استراتيجيات.",
        },
      },
      {
        title: { en: "Gates before real money", ar: "بوابات قبل المال الحقيقي" },
        body: {
          en: "Every model passes readiness stages and stays demo-only until out-of-sample results remain positive after costs. Model files are SHA-256-pinned and refused if their feature list differs from the live code.",
          ar: "يمرّ كل نموذج بمراحل جاهزية ويبقى على الحساب التجريبي حتى تبقى نتائجه خارج العينة إيجابية بعد التكاليف. ملفات النماذج مثبّتة ببصمة SHA-256 وتُرفض إذا اختلفت قائمة ميزاتها عن الشيفرة الحية.",
        },
      },
    ],
  },
  "aspu-insight": {
    problem: {
      en: "A university research office needs to receive papers, check them for plagiarism and IEEE compliance, and route them through committees and reviewers — for papers written in Arabic and English.",
      ar: "يحتاج مكتب البحث العلمي في الجامعة إلى استقبال الأبحاث وفحصها من الانتحال والتوافق مع معيار IEEE، ثم تمريرها عبر اللجان والمحكّمين — لأبحاث مكتوبة بالعربية والإنجليزية.",
    },
    flow: [
      { label: { en: "Submission", ar: "التقديم" }, detail: { en: "PDF/DOCX upload through a JWT-secured DRF API", ar: "رفع PDF/DOCX عبر واجهة DRF مؤمّنة بـ JWT" } },
      { label: { en: "Async jobs", ar: "مهام غير متزامنة" }, detail: { en: "Celery + Redis run every heavy analysis", ar: "Celery وRedis ينفّذان كل تحليل ثقيل" } },
      { label: { en: "AI services", ar: "خدمات الذكاء الاصطناعي" }, detail: { en: "Fine-tuned MiniLM plagiarism, IEEE + Crossref checker, claim-evidence graph", ar: "كشف انتحال بـ MiniLM مدرّب، مدقّق IEEE مع Crossref، مخطط الادعاءات والأدلة" } },
      { label: { en: "Review workflow", ar: "مسار التحكيم" }, detail: { en: "Committees, editor and assistant reviewers, recommendations", ar: "لجان ومحرّر ومحكّمون مساعدون مع توصيات" } },
      { label: { en: "Live updates", ar: "تحديثات فورية" }, detail: { en: "Django Channels notifications when results land", ar: "إشعارات Django Channels عند جاهزية النتائج" } },
    ],
    decisions: [
      {
        title: { en: "Fine-tune a small model", ar: "تدريب نموذج صغير" },
        body: {
          en: "A multilingual MiniLM sentence-transformer, fine-tuned across 10 tracked experiments, handles Arabic/English paraphrase and is small enough to run on CPU next to the API.",
          ar: "نموذج MiniLM متعدد اللغات مدرّب عبر 10 تجارب موثّقة، يتعامل مع إعادة الصياغة بالعربية والإنجليزية، وصغير بما يكفي ليعمل على المعالج بجانب الواجهة البرمجية.",
        },
      },
      {
        title: { en: "Heavy work never blocks a request", ar: "العمل الثقيل لا يعطّل أي طلب" },
        body: {
          en: "Uploads return immediately; plagiarism, citation and embedding jobs run on Celery workers, and reviewers are notified over WebSockets when the analysis is ready.",
          ar: "يعود الرفع فوراً؛ وتعمل مهام الانتحال والاستشهادات والتضمينات على عمّال Celery، ويُبلَّغ المحكّمون عبر WebSockets عند جاهزية التحليل.",
        },
      },
      {
        title: { en: "Quality you can measure", ar: "جودة قابلة للقياس" },
        body: {
          en: "852 tests at 89% coverage, Locust load tests, OpenAPI docs, django-axes against brute force, and a 7-service Docker Compose deployment through GitHub Actions.",
          ar: "852 اختباراً بتغطية 89%، واختبارات حمل بـ Locust، وتوثيق OpenAPI، وحماية django-axes من التخمين، ونشر 7 خدمات عبر Docker Compose بواسطة GitHub Actions.",
        },
      },
    ],
  },
  "telecom-churn": {
    problem: {
      en: "Telecom operators lose revenue when customers leave. The goal: flag at-risk customers early and explain what drives them away.",
      ar: "تخسر شركات الاتصالات إيراداتها حين يغادر العملاء. الهدف: رصد العملاء المعرّضين للمغادرة مبكراً وتفسير أسباب ذلك.",
    },
    flow: [
      { label: { en: "Data", ar: "البيانات" }, detail: { en: "7,043 customers, 26.5% churn rate", ar: "7,043 عميلاً بنسبة تسرّب 26.5%" } },
      { label: { en: "Preparation", ar: "التجهيز" }, detail: { en: "Cleaning, encoding, feature engineering, EDA", ar: "تنظيف وترميز وهندسة ميزات وتحليل استكشافي" } },
      { label: { en: "20 experiments", ar: "20 تجربة" }, detail: { en: "10 models, each with and without SMOTE", ar: "10 نماذج، كل منها مع SMOTE وبدونه" } },
      { label: { en: "Explain & segment", ar: "التفسير والتقسيم" }, detail: { en: "SHAP drivers and K-Means customer segments", ar: "عوامل SHAP وشرائح العملاء بـ K-Means" } },
    ],
    decisions: [
      {
        title: { en: "Optimise for recall", ar: "الأولوية للـ Recall" },
        body: {
          en: "Missing a churner costs more than a false alarm, so SVM + SMOTE (recall 0.79, ROC-AUC 0.82) was chosen over the model with the highest ROC-AUC.",
          ar: "تفويت عميل سيغادر أغلى من إنذار خاطئ، لذا اختير SVM مع SMOTE (Recall 0.79، ROC-AUC 0.82) بدل النموذج صاحب أعلى ROC-AUC.",
        },
      },
      {
        title: { en: "Show the trade-off", ar: "عرض المفاضلة بوضوح" },
        body: {
          en: "Logistic Regression without SMOTE reaches the best ROC-AUC (0.85) but catches far fewer churners; both results are reported side by side.",
          ar: "يصل Logistic Regression بدون SMOTE إلى أفضل ROC-AUC (0.85) لكنه يلتقط عدداً أقل بكثير من المغادرين؛ وتُعرض النتيجتان جنباً إلى جنب.",
        },
      },
      {
        title: { en: "Make it actionable", ar: "نتائج قابلة للتنفيذ" },
        body: {
          en: "Month-to-month contracts churn at 42.7% and customers in their first year at 47.7%; a high-risk segment churns at 47% versus 12% for the lowest-risk one.",
          ar: "تبلغ نسبة التسرّب 42.7% في العقود الشهرية و47.7% لدى العملاء في سنتهم الأولى؛ وشريحة عالية الخطورة تبلغ 47% مقابل 12% للشريحة الأقل خطورة.",
        },
      },
    ],
  },
  "multi-chain-wallet": {
    problem: {
      en: "A self-custody wallet that works across EVM chains and TRON from one app, with security that doesn't depend on the user remembering to lock it.",
      ar: "محفظة ذاتية الحفظ تعمل على شبكات EVM وTRON من تطبيق واحد، بأمان لا يعتمد على تذكّر المستخدم قفلها.",
    },
    flow: [
      { label: { en: "Expo Router", ar: "Expo Router" }, detail: { en: "13 screens incl. a 4-step send flow and swaps", ar: "13 شاشة منها مسار إرسال من 4 خطوات وتبديل" } },
      { label: { en: "Chain services", ar: "خدمات الشبكات" }, detail: { en: "ethers.js for EVM chains, a dedicated TRON service", ar: "ethers.js لشبكات EVM وخدمة مخصّصة لـ TRON" } },
      { label: { en: "Secure storage", ar: "تخزين آمن" }, detail: { en: "Keys in SecureStore behind a biometric lock", ar: "المفاتيح في SecureStore خلف قفل بالبصمة" } },
      { label: { en: "8 networks", ar: "8 شبكات" }, detail: { en: "Sepolia, Polygon, Base, BNB, Arbitrum, Avalanche, Optimism, TRON", ar: "Sepolia وPolygon وBase وBNB وArbitrum وAvalanche وOptimism وTRON" } },
    ],
    decisions: [
      {
        title: { en: "Keys never leave the device", ar: "المفاتيح لا تغادر الجهاز" },
        body: {
          en: "Secrets live in the OS keystore through SecureStore, and the app locks itself behind biometric authentication.",
          ar: "تُحفظ الأسرار في مخزن النظام عبر SecureStore، ويُقفل التطبيق نفسه خلف التحقق بالبصمة.",
        },
      },
      {
        title: { en: "Many chains, one code path", ar: "شبكات كثيرة بمسار واحد" },
        body: {
          en: "Seven EVM networks share the same ethers.js code; TRON, which works differently, gets its own service.",
          ar: "تتشارك سبع شبكات EVM شيفرة ethers.js نفسها، بينما تحصل TRON — المختلفة في طريقة عملها — على خدمة خاصة.",
        },
      },
      {
        title: { en: "Security as a log, not a promise", ar: "الأمان سجلّ موثّق لا وعد" },
        body: {
          en: "Each hardening step is recorded in SECURITY.md and CHANGES.md, so reviewers can see what was fixed and why.",
          ar: "كل خطوة تحصين موثّقة في SECURITY.md وCHANGES.md، ليرى المراجع ما الذي أُصلح ولماذا.",
        },
      },
    ],
  },
  "sheda-online": {
    problem: {
      en: "Bring Sheda, a traditional 2v2 card game from Syria, online with its real rules — playable with friends in real time or against bots.",
      ar: "نقل لعبة الشدّة، لعبة الورق الشعبية السورية 2 ضد 2، إلى الإنترنت بقواعدها الحقيقية — للعب الفوري مع الأصدقاء أو ضد لاعبين آليين.",
    },
    flow: [
      { label: { en: "React client", ar: "واجهة React" }, detail: { en: "Rooms, friends, table and hand UI", ar: "غرف وأصدقاء وطاولة اللعب واليد" } },
      { label: { en: "Supabase Auth", ar: "مصادقة Supabase" }, detail: { en: "Google sign-in, profiles", ar: "تسجيل دخول Google وملفات شخصية" } },
      { label: { en: "Edge Function", ar: "Edge Function" }, detail: { en: "Deno game_action validates every move", ar: "دالة Deno تتحقق من كل حركة" } },
      { label: { en: "Postgres + RLS", ar: "Postgres مع RLS" }, detail: { en: "Rooms, profiles, friendships protected per row", ar: "غرف وملفات وصداقات محمية على مستوى الصف" } },
      { label: { en: "Realtime", ar: "التحديث الفوري" }, detail: { en: "postgres_changes pushes state to all four players", ar: "postgres_changes يدفع الحالة للاعبين الأربعة" } },
    ],
    decisions: [
      {
        title: { en: "The server decides every move", ar: "الخادم يقرّر كل حركة" },
        body: {
          en: "Clients send intents; an edge function checks them against the rules before the state changes, so no player can cheat from the browser.",
          ar: "يرسل اللاعب نيّته فقط، وتتحقق دالة الخادم منها وفق القواعد قبل تغيير الحالة، فلا يمكن لأي لاعب الغش من المتصفح.",
        },
      },
      {
        title: { en: "Rules engine first", ar: "محرك القواعد أولاً" },
        body: {
          en: "An 804-line rules engine with AI bots was built and played offline before the game went online.",
          ar: "بُني محرك قواعد من 804 أسطر مع لاعبين آليين وجُرّب بلا اتصال قبل نقل اللعبة إلى الإنترنت.",
        },
      },
      {
        title: { en: "Realtime straight from the database", ar: "تحديث فوري من قاعدة البيانات مباشرة" },
        body: {
          en: "State lives in Postgres and reaches every player through Supabase Realtime, with row-level security deciding who sees what.",
          ar: "تعيش الحالة في Postgres وتصل لكل لاعب عبر Supabase Realtime، بينما يحدّد أمان مستوى الصفوف من يرى ماذا.",
        },
      },
    ],
  },
};
