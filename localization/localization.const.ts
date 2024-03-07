import type { Language, Languages } from "./localization.types";

// images
import imageCountryUk from "../images/countries/icon-country-uk.png";
import imageCountryUs from "../images/countries/icon-country-us.png";
import imageCountryFr from "../images/countries/icon-country-fr.png";
import imageCountryDe from "../images/countries/icon-country-de.png";
import imageCountryEs from "../images/countries/icon-country-es.png";
import imageCountryIt from "../images/countries/icon-country-it.png";
import imageCountrySv from "../images/countries/icon-country-sv.png";
import imageCountryDa from "../images/countries/icon-country-da.png";
import imageCountryFi from "../images/countries/icon-country-fi.png";
import imageCountryPl from "../images/countries/icon-country-pl.png";
import imageCountryCs from "../images/countries/icon-country-cs.png";
import imageCountryHu from "../images/countries/icon-country-hu.png";
import imageCountryEl from "../images/countries/icon-country-el.png";
import imageCountryRo from "../images/countries/icon-country-ro.png";
import imageCountryLt from "../images/countries/icon-country-lt.png";
import imageCountryLv from "../images/countries/icon-country-lt.png";
import imageCountryBe from "../images/countries/icon-country-be.png";
import imageCountrySk from "../images/countries/icon-country-sk.png";

export const defaultLanguage: Language = "en";
export const languagesKeys = [
  "en",
  "uk",
  "fr",
  "de",
  "es",
  "it",
  "sk",
  "sv",
  "da",
  "fi",
  "pl",
  "cs",
  "hu",
  "el",
  "ro",
  "lt",
  "lv",
  "be",
] as const;
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
  {
    title: "Italiano",
    key: "it",
    icon: imageCountryIt,
    native: "Italian",
  },
  {
    title: "Svenska",
    key: "sv",
    icon: imageCountrySv,
    native: "Swedish",
  },
  {
    title: "Dansk",
    key: "da",
    icon: imageCountryDa,
    native: "Danish",
  },
  {
    title: "Suomi",
    key: "fi",
    icon: imageCountryFi,
    native: "Finnish",
  },
  {
    title: "Polski",
    key: "pl",
    icon: imageCountryPl,
    native: "Polish",
  },
  {
    title: "Čeština",
    key: "cs",
    icon: imageCountryCs,
    native: "Czech",
  },
  {
    title: "Magyar",
    key: "hu",
    icon: imageCountryHu,
    native: "Hungarian",
  },
  {
    title: "Ελληνικά",
    key: "el",
    icon: imageCountryEl,
    native: "Greek",
  },
  {
    title: "Română",
    key: "ro",
    icon: imageCountryRo,
    native: "Romanian",
  },
  {
    title: "Lietuvių",
    key: "lt",
    icon: imageCountryLt,
    native: "Lithuanian",
  },
  {
    title: "Latviešu",
    key: "lv",
    icon: imageCountryLv,
    native: "Latvian",
  },
  {
    title: "Беларуская",
    key: "be",
    icon: imageCountryBe,
    native: "Belarusian",
  },
  {
    title: "Slovenský",
    key: "sk",
    icon: imageCountrySk,
    native: "Slovak",
  },
];

export const languages_short = {
  en: "en-US",
  uk: "uk-UA",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
  it: "it-IT",
  sv: "sv-SE",
  da: "da-DK",
  fi: "fi-FI",
  pl: "pl-PL",
  cs: "cs-CS",
  hu: "hu-HU",
  el: "el-GR",
  ro: "ro-RO",
  lt: "lt-LT",
  lv: "lv-LV",
  be: "be-BY",
  sk: "sk-SK",
};

export const languagesLinguiAlias = {
  en: "en",
  uk: "uk",
  fr: "fr",
  de: "de",
  es: "es",
  it: "it",
  sv: "sv",
  da: "da",
  fi: "fi",
  pl: "pl",
  cs: "cs",
  hu: "hu",
  el: "el",
  ro: "ro",
  lt: "lt",
  lv: "lv",
  be: "be",
  sk: "sk",
} as const;

export const LANGUAGE_EN = "en";
export const LANGUAGE_UK = "uk";
export const LANGUAGE_FR = "fr";
export const LANGUAGE_DE = "de";
export const LANGUAGE_ES = "es";
export const LANGUAGE_IT = "it";
export const LANGUAGE_SV = "sv";
export const LANGUAGE_DA = "da";
export const LANGUAGE_FI = "fi";
export const LANGUAGE_PL = "pl";
export const LANGUAGE_CS = "cs";
export const LANGUAGE_HU = "hu";
export const LANGUAGE_EL = "el";
export const LANGUAGE_RO = "ro";
export const LANGUAGE_LT = "lt";
export const LANGUAGE_LV = "lv";
export const LANGUAGE_BE = "be";
export const LANGUAGE_SK = "sk";

export const languagePattern =
  /\b(en|uk|fr|de|es|it|sv|da|fi|pl|cs|hu|el|ro|lt|lv|be|sk)\b/;
