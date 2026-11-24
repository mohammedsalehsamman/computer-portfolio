import { create } from "zustand";
import type { L, Locale } from "@/content/types";

const KEY = "mss-locale";

function initialLocale(): Locale {
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q === "ar" || q === "en") return q;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "ar" || saved === "en") return saved;
  } catch {
    /* storage blocked */
  }
  return navigator.language?.toLowerCase().startsWith("ar") ? "ar" : "en";
}

type LocaleState = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
};

export const useLocale = create<LocaleState>((set, get) => ({
  locale: initialLocale(),
  setLocale: (locale) => {
    try {
      localStorage.setItem(KEY, locale);
    } catch {
      /* storage blocked */
    }
    document.documentElement.lang = locale;
    set({ locale });
  },
  toggle: () => get().setLocale(get().locale === "ar" ? "en" : "ar"),
}));

export function useT() {
  const locale = useLocale((st) => st.locale);
  const dir: "rtl" | "ltr" = locale === "ar" ? "rtl" : "ltr";
  const t = (l: L) => l[locale];
  return { locale, dir, t };
}
