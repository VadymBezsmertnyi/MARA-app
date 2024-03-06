import type { Language, Languages } from "./localization.types";

// images
import imageCountryUk from "../images/countries/icon-country-uk.png";
import imageCountryUs from "../images/countries/icon-country-us.png";
import imageCountryFr from "../images/countries/icon-country-fr.png";
import imageCountryDe from "../images/countries/icon-country-de.png";
import imageCountryEs from "../images/countries/icon-country-es.png";

export const defaultLanguage: Language = "en";
export const languagesKeys = ["en", "uk", "fr", "de", "es"] as const;
export const languageKey = "language";

export const languages: Languages = [
  {
    title: "Українська",
    key: "uk",
    icon: imageCountryUk,
    native: "Ukrainian",
  },
  {
    title: "English",
    key: "en",
    icon: imageCountryUs,
    native: "English",
  },
  {
    title: "Français",
    key: "fr",
    icon: imageCountryFr,
    native: "French",
  },
  {
    title: "Deutsch",
    key: "de",
    icon: imageCountryDe,
    native: "German",
  },
  {
    title: "Español",
    key: "es",
    icon: imageCountryEs,
    native: "Spanish",
  },
];

export const languages_short = {
  en: "en-EN",
  uk: "uk-UA",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
};

export const languagesLinguiAlias = {
  en: "en",
  uk: "uk",
  fr: "fr",
  de: "de",
  es: "es",
} as const;

export const LANGUAGE_EN = "en";
export const LANGUAGE_UK = "uk";
export const LANGUAGE_FR = "fr";
export const LANGUAGE_DE = "de";
export const LANGUAGE_ES = "es";

export const languagePattern = /\b(en|uk|fr|de|es)\b/;
