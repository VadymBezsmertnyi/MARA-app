import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

// providers
import { localesContext } from "../../../localization/localization.provider";

// components
import { ImageCache } from "../ImageCache/ImageCache";

// images
import imageCountryUk from "../../../images/icon-country-uk.png";
import imageCountryUs from "../../../images/icon-country-us.png";

// styles
import { styles } from "./ChangeLanguage.styles";

export const ChangeLanguage: FunctionComponent = () => {
  const { language, setLanguage } = useContext(localesContext);
  const iconLanguage = useMemo(
    () => (language === "en" ? imageCountryUs : imageCountryUk),
    [language]
  );
  const showLanguage = useMemo(
    () => (language === "uk" ? "ua" : language),
    [language]
  );

  const onChangeLanguage = () => {
    if (language === "uk") setLanguage("en");
    else setLanguage("uk");
  };
  return (
    <TouchableOpacity onPress={onChangeLanguage} style={styles.buttonLanguage}>
      <ImageCache imageSrc={iconLanguage} style={styles.iconLanguage} />
      <Text style={styles.titleLanguage}>{showLanguage}</Text>
    </TouchableOpacity>
  );
};
