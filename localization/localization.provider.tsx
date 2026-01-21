import React, { useState, useEffect, useMemo, useContext } from "react";
import { I18nProvider } from "@lingui/react";
import { Messages, setupI18n } from "@lingui/core";

// types
import { Language, LocalesContext, Props } from "./localization.types";

// providers
import {
  DropdownAlertType,
  useDropDownAlertProvider,
} from "../src/providers/DropDownAlertProvider/DropDownAlertProvider";

// helps
import {
  dynamicActivateLanguage,
  getDeviceLanguage,
} from "./localization.helpers";
import { setDeviceStorage } from "../src/helps/storage.help";
import { updateGlobalI18nLanguage } from "./i18n.global";

// constants
import {
  defaultLanguage,
  languageKey,
  languagesLinguiAlias,
} from "./localization.const";

// messages
import { CATALOGS_LANGUAGES } from "./localization.messages";

export const localesContext = React.createContext({} as LocalesContext);

const LocalesProvider: React.FC<Props> = ({ children }) => {
  const { messageFromServer } = useDropDownAlertProvider();
  const [languageUser, setLanguage] = useState<Language>(defaultLanguage);
  const language = languageUser || defaultLanguage;
  const i18n = setupI18n({
    messages: CATALOGS_LANGUAGES,
    locale: languagesLinguiAlias[language],
  });

  const setLanguageAsync = async (language: Language): Promise<void> => {
    try {
      await dynamicActivateLanguage(language, i18n);
      await updateGlobalI18nLanguage(language); // Update global i18n for middleware
      await setDeviceStorage(languageKey, language);
      setLanguage(language);
    } catch (error: any) {
      messageFromServer(
        error.toString(),
        "Error set language",
        DropdownAlertType.Warn
      );
    }
  };

  const getLanguageStorage = async () => {
    try {
      const language = await getDeviceLanguage();
      await setLanguageAsync(language);
      setLanguage(language);
    } catch (error: any) {
      messageFromServer(
        error.toString(),
        "Error get language",
        DropdownAlertType.Warn
      );
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

export const useLocalesProvider = () => useContext(localesContext);

export default LocalesProvider;
