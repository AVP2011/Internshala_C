import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import hi from "./locales/hi.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";
import zh from "./locales/zh.json";

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  i18n.use(LanguageDetector);
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    hi: { translation: hi },
    es: { translation: es },
    pt: { translation: pt },
    zh: { translation: zh }
  },
  fallbackLng: "en",
  lng: "en", // default language for SSR
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"]
  },
  react: {
    useSuspense: false
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;

