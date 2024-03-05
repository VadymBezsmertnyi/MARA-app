import type { Language, Languages } from "./localization.types";

// images
import imageCountryUk from "../images/icon-country-uk.png";
import imageCountryUs from "../images/icon-country-us.png";

export const defaultLanguage: Language = "en";
export const languagesKeys = ["en", "uk"] as const;
export const languageKey = "language";

export const languages: Languages = [
  {
    title: "Українська",
    key: "uk",
    icon: imageCountryUk,
  },
  {
    title: "English",
    key: "en",
    icon: imageCountryUs,
  },
];

export const languages_short = {
  en: "en-EN",
  uk: "uk-UA",
};

export const languagesLinguiAlias = {
  en: "en",
  uk: "uk",
} as const;

export const normalizeLanguages = {
  en: "en",
  uk: "uk",
};

export const LANGUAGE_EN = "en";
export const LANGUAGE_UK = "uk";

export const languagePattern = /\b(en|uk)\b/;
