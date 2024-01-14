import React, { useState, useEffect, useMemo } from "react";
import { I18nProvider } from "@lingui/react";

// types
import { Language, LocalesContext, Props } from "./localization.types";

// helps
import {
  dynamicActivateLanguage,
  getDeviceLanguage,
} from "./localization.helpers";
import { setDeviceStorage } from "../src/helps/storage.help";
import showErrors from "../src/helps/errors/showError";

// constants
import { defaultLanguage, languageKey } from "./localization.const";
import { languagesKeys } from "./localization.const";

export const localesContext = React.createContext({} as LocalesContext);

const LocalesProvider: React.FC<Props> = ({ i18n, children }) => {
  const defaultLanguageState = useMemo(
    () => i18n?.locale || languagesKeys[1] || defaultLanguage,
    [i18n]
  ) as Language;
  const [language, setLanguage] = useState<Language>(defaultLanguageState);
  const { bug } = showErrors;

  const getLanguageStorage = async () => {
    try {
      const language = await getDeviceLanguage();
      await dynamicActivateLanguage(language, i18n);
      setLanguage(language);
    } catch (error) {
      bug(error);
    }
  };

  const setLanguageAsync = async (language: Language): Promise<void> => {
    try {
      await dynamicActivateLanguage(language, i18n);
      await setDeviceStorage(languageKey, language);
      setLanguage(language);
    } catch (error) {
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

  useEffect(() => {
    if (language !== i18n.locale) setLanguageAsync(language);
  }, [language, i18n.locale]);

  return (
    <I18nProvider i18n={i18n}>
      <localesContext.Provider value={contextValue}>
        {children}
      </localesContext.Provider>
    </I18nProvider>
  );
};

export default LocalesProvider;
