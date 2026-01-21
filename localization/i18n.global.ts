import { setupI18n } from "@lingui/core";
import { defaultLanguage, languagesLinguiAlias } from "./localization.const";
import { getDeviceLanguage } from "./localization.helpers";
import { CATALOGS_LANGUAGES } from "./localization.provider";

export const globalI18n = setupI18n({
  messages: CATALOGS_LANGUAGES,
  locale: languagesLinguiAlias[defaultLanguage],
});

getDeviceLanguage().then((language) => {
  const locale = languagesLinguiAlias[language];
  if (locale) globalI18n.activate(locale);
});

export const updateGlobalI18nLanguage = async (language: string) => {
  const locale =
    languagesLinguiAlias[language as keyof typeof languagesLinguiAlias];
  if (locale) globalI18n.activate(locale);
};
