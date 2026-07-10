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
  "be",
  "cs",
  "da",
  "de",
  "el",
  "en",
  "es",
  "fi",
  "fr",
  "hu",
  "it",
  "lt",
  "lv",
  "pl",
  "ro",
  "sk",
  "sv",
  "uk",
] as const;
export const languageKey = "language";

export const languages: Languages = [
  {
    title: "Беларуская",
    key: "be",
    icon: imageCountryBe,
    native: "Belarusian",
  },
  {
    title: "Čeština",
    key: "cs",
    icon: imageCountryCs,
    native: "Czech",
  },
  {
    title: "Dansk",
    key: "da",
    icon: imageCountryDa,
    native: "Danish",
  },
  {
    title: "Deutsch",
    key: "de",
    icon: imageCountryDe,
    native: "German",
  },
  {
    title: "Ελληνικά",
    key: "el",
    icon: imageCountryEl,
    native: "Greek",
  },
  {
    title: "English",
    key: "en",
    icon: imageCountryUs,
    native: "English",
  },
  {
    title: "Español",
    key: "es",
    icon: imageCountryEs,
    native: "Spanish",
  },
  {
    title: "Suomi",
    key: "fi",
    icon: imageCountryFi,
    native: "Finnish",
  },
  {
    title: "Français",
    key: "fr",
    icon: imageCountryFr,
    native: "French",
  },
  {
    title: "Magyar",
    key: "hu",
    icon: imageCountryHu,
    native: "Hungarian",
  },
  {
    title: "Italiano",
    key: "it",
    icon: imageCountryIt,
    native: "Italian",
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
    title: "Polski",
    key: "pl",
    icon: imageCountryPl,
    native: "Polish",
  },
  {
    title: "Română",
    key: "ro",
    icon: imageCountryRo,
    native: "Romanian",
  },
  {
    title: "Slovenský",
    key: "sk",
    icon: imageCountrySk,
    native: "Slovak",
  },
  {
    title: "Svenska",
    key: "sv",
    icon: imageCountrySv,
    native: "Swedish",
  },
  {
    title: "Українська",
    key: "uk",
    icon: imageCountryUk,
    native: "Ukrainian",
  },
];

export const languages_short = {
  be: "be-BY",
  cs: "cs-CS",
  da: "da-DK",
  de: "de-DE",
  el: "el-GR",
  en: "en-US",
  es: "es-ES",
  fi: "fi-FI",
  fr: "fr-FR",
  hu: "hu-HU",
  it: "it-IT",
  lt: "lt-LT",
  lv: "lv-LV",
  pl: "pl-PL",
  ro: "ro-RO",
  sk: "sk-SK",
  sv: "sv-SE",
  uk: "uk-UA",
} as const;

export const languagesLinguiAlias = {
  be: "be",
  cs: "cs",
  da: "da",
  de: "de",
  el: "el",
  en: "en",
  es: "es",
  fi: "fi",
  fr: "fr",
  hu: "hu",
  it: "it",
  lt: "lt",
  lv: "lv",
  pl: "pl",
  ro: "ro",
  sk: "sk",
  sv: "sv",
  uk: "uk",
} as const;

export const LANGUAGE_BE = "be";
export const LANGUAGE_CS = "cs";
export const LANGUAGE_DA = "da";
export const LANGUAGE_DE = "de";
export const LANGUAGE_EL = "el";
export const LANGUAGE_EN = "en";
export const LANGUAGE_ES = "es";
export const LANGUAGE_FI = "fi";
export const LANGUAGE_FR = "fr";
export const LANGUAGE_HU = "hu";
export const LANGUAGE_IT = "it";
export const LANGUAGE_LT = "lt";
export const LANGUAGE_LV = "lv";
export const LANGUAGE_PL = "pl";
export const LANGUAGE_RO = "ro";
export const LANGUAGE_SK = "sk";
export const LANGUAGE_SV = "sv";
export const LANGUAGE_UK = "uk";

export const languagePattern =
  /\b(be|cs|da|de|el|en|es|fi|fr|hu|it|lt|lv|pl|ro|sk|sv|uk)\b/;
