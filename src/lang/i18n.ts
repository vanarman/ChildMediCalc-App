import { getLocales } from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import fr from "./fr.json";

const resources = {
  en: { translation: en },
  fr: { translation: fr },
};

const expoLocale = getLocales();

i18n
  .createInstance()
  .use(initReactI18next)
  .init({
    load: "languageOnly",
    compatibilityJSON: "v3",
    resources,
    // debug: true,
    lng: expoLocale[0].languageCode === "fr" ? "fr" : "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((e) => {
    console.error("Error i18n: ", e);
  });

export default i18n;
