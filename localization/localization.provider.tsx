import React, { useState, useEffect, useMemo } from "react";
import { I18nProvider } from "@lingui/react";
import { Messages, setupI18n } from "@lingui/core";

// types
import { Language, LocalesContext, Props } from "./localization.types";

// helps
import {
  dynamicActivateLanguage,
  getDeviceLanguage,
} from "./localization.helpers";
import { setDeviceStorage } from "../src/helps/storage.help";
import showErrors from "../src/helps/errors/showError";

// locales
import { messages as translationsUk } from "../localization/uk/messages";
import { messages as translationsEn } from "../localization/en/messages";
import { messages as translationsFr } from "../localization/fr/messages";
import { messages as translationsDe } from "../localization/de/messages";
import { messages as translationsEs } from "../localization/es/messages";
import { messages as translationsIt } from "../localization/it/messages";
import { messages as translationsSv } from "../localization/sv/messages";
import { messages as translationsDa } from "../localization/da/messages";
import { messages as translationsFi } from "../localization/fi/messages";
import { messages as translationsPl } from "../localization/pl/messages";
import { messages as translationsCs } from "../localization/cs/messages";
import { messages as translationsHu } from "../localization/hu/messages";
import { messages as translationsEl } from "../localization/el/messages";

// constants
import {
  defaultLanguage,
  languageKey,
  languagesLinguiAlias,
} from "./localization.const";
const CATALOGS_LANGUAGES = {
  uk: translationsUk as Messages,
  en: translationsEn as Messages,
  fr: translationsFr as Messages,
  de: translationsDe as Messages,
  es: translationsEs as Messages,
  it: translationsIt as Messages,
  sv: translationsSv as Messages,
  da: translationsDa as Messages,
  fi: translationsFi as Messages,
  pl: translationsPl as Messages,
  cs: translationsCs as Messages,
  hu: translationsHu as Messages,
  el: translationsEl as Messages,
};

export const localesContext = React.createContext({} as LocalesContext);

const LocalesProvider: React.FC<Props> = ({ children }) => {
  const [languageUser, setLanguage] = useState<Language>(defaultLanguage);
  const language = languageUser || defaultLanguage;
  const { bug } = showErrors;
  const i18n = setupI18n({
    messages: CATALOGS_LANGUAGES,
    locale: languagesLinguiAlias[language],
  });

  const setLanguageAsync = async (language: Language): Promise<void> => {
    try {
      await dynamicActivateLanguage(language, i18n);
      await setDeviceStorage(languageKey, language);
      setLanguage(language);
    } catch (error: any) {
      bug(error);
    }
  };

  const getLanguageStorage = async () => {
    try {
      const language = await getDeviceLanguage();
      await setLanguageAsync(language);
      setLanguage(language);
    } catch (error: any) {
      bug(error);
    }
  };

  const contextValue: LocalesContext = useMemo(
    () => ({
      i18n,
      language,
      getLanguageStorage,
      setLanguage: setLanguageAsync,
    }),
    [i18n, language]
  );

  useEffect(() => {
    getLanguageStorage();
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <localesContext.Provider value={contextValue}>
        {children}
      </localesContext.Provider>
    </I18nProvider>
  );
};

export default LocalesProvider;
