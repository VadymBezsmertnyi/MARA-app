import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Localization from "expo-localization";

// constants
import {
  languages_short,
  LANGUAGE_EN,
  LANGUAGE_UK,
  defaultLanguage,
  languageKey,
  LANGUAGE_FR,
  LANGUAGE_DE,
  LANGUAGE_ES,
  LANGUAGE_IT,
  LANGUAGE_SV,
  LANGUAGE_DA,
  LANGUAGE_FI,
  LANGUAGE_PL,
  LANGUAGE_CS,
  LANGUAGE_HU,
  LANGUAGE_EL,
  LANGUAGE_RO,
  LANGUAGE_LT,
  LANGUAGE_LV,
  LANGUAGE_BE,
  LANGUAGE_SK,
} from "./localization.const";
import { Language } from "./localization.types";

// locales
import { messages as translationsUk } from "./uk/messages";
import { messages as translationsEn } from "./en/messages";
import { messages as translationsFr } from "./fr/messages";
import { messages as translationsDe } from "./de/messages";
import { messages as translationsEs } from "./es/messages";
import { messages as translationsIt } from "./it/messages";
import { messages as translationsSv } from "./sv/messages";
import { messages as translationsDa } from "./da/messages";
import { messages as translationsFi } from "./fi/messages";
import { messages as translationsPl } from "./pl/messages";
import { messages as translationsCs } from "./cs/messages";
import { messages as translationsHu } from "./hu/messages";
import { messages as translationsEl } from "./el/messages";
import { messages as translationsRo } from "./ro/messages";
import { messages as translationsLt } from "./lt/messages";
import { messages as translationsLv } from "./lv/messages";
import { messages as translationsBe } from "./be/messages";
import { messages as translationsSk } from "./sk/messages";

// types
import type { I18n as i18Type } from "@lingui/core";

export const languagesRegexGroup = `${Object.keys(languages_short).join("|")}`;

export function getPathWithoutLanguage(path: string): string {
  const languagesRegex = new RegExp(`^/(${languagesRegexGroup})/`);
  const match = languagesRegex.exec(path);
  if (!match) return path;
  return path.slice(match.index + match[0].length - 1);
}
export async function dynamicActivateLanguage(
  locale: Language,
  i18n: i18Type
): Promise<void> {
  const messages = getMessagesByLocale(locale);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
const getMessagesByLocale = (locale: Language) => {
  switch (locale) {
    case LANGUAGE_EN:
      return translationsEn;
    case LANGUAGE_UK:
      return translationsUk;
    case LANGUAGE_FR:
      return translationsFr;
    case LANGUAGE_DE:
      return translationsDe;
    case LANGUAGE_ES:
      return translationsEs;
    case LANGUAGE_IT:
      return translationsIt;
    case LANGUAGE_SV:
      return translationsSv;
    case LANGUAGE_DA:
      return translationsDa;
    case LANGUAGE_FI:
      return translationsFi;
    case LANGUAGE_PL:
      return translationsPl;
    case LANGUAGE_CS:
      return translationsCs;
    case LANGUAGE_HU:
      return translationsHu;
    case LANGUAGE_EL:
      return translationsEl;
    case LANGUAGE_RO:
      return translationsRo;
    case LANGUAGE_LT:
      return translationsLt;
    case LANGUAGE_LV:
      return translationsLv;
    case LANGUAGE_BE:
      return translationsBe;
    case LANGUAGE_SK:
      return translationsSk;

    default:
      return translationsEn;
  }
};

export const isLanguage = (value: string): value is Language => {
  return value in languages_short;
};

export const getDeviceLanguage = async (): Promise<Language> => {
  const deviceLanguage = Localization.getLocales()[0].languageCode;
  let localizationLanguage = defaultLanguage;
  if (Platform.OS === "web") {
    const languageLocalStorage = localStorage.getItem(languageKey);
    if (languageLocalStorage && isLanguage(languageLocalStorage))
      localizationLanguage = languageLocalStorage;
    else if (deviceLanguage && isLanguage(deviceLanguage))
      localizationLanguage = deviceLanguage;
  } else {
    const languageAsyncStorage = await AsyncStorage.getItem(languageKey);
    if (languageAsyncStorage && isLanguage(languageAsyncStorage))
      localizationLanguage = languageAsyncStorage;
    else if (deviceLanguage && isLanguage(deviceLanguage))
      localizationLanguage = deviceLanguage;
  }

  return localizationLanguage;
};
