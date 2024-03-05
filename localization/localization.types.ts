// types
import type { I18n as i18Type } from "@lingui/core";
import { ImageSource } from "expo-image";

export type Language = "uk" | "en" | "fr";

export type LocalesContext = {
  i18n: i18Type;
  language: Language;
  getLanguageStorage: () => Promise<void>;
  setLanguage: (language: Language) => Promise<void>;
  children?: React.ReactNode;
};
export type Props = {
  children?: React.ReactNode;
};
export type LanguageType = {
  title: string;
  key: Language;
  icon: ImageSource;
  native: string;
};
export type Languages = LanguageType[];
