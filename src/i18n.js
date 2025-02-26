import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslation from "./locales/en/translation.json";
import kzTranslation from "./locales/kz/translation.json";
import ruTranslation from "./locales/ru/translation.json";

// Define translations
const resources = {
  en: { translation: enTranslation },
  kz: { translation: kzTranslation },
  ru: { translation: ruTranslation },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources, // Load translations from JSON files
    supportedLngs: ["en", "kz", "ru"],
    fallbackLng: "en",
    debug: true,
    detection: {
      order: ["localStorage", "cookie", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
