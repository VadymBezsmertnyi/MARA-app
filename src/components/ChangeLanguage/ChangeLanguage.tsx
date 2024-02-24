import React, { FunctionComponent, useContext, useMemo } from "react";
import { Text, TouchableOpacity } from "react-native";

// providers
import { localesContext } from "../../../localization/localization.provider";
import { userContext } from "../../providers/UserProvider/UserProvider";
import { pushNotificationContext } from "../../providers/PushNotificationProvider/PushNotificationProvider";

// components
import { ImageCache } from "../ImageCache/ImageCache";

// images
import imageCountryUk from "../../../images/icon-country-uk.png";
import imageCountryUs from "../../../images/icon-country-us.png";

// styles
import { styles } from "./ChangeLanguage.styles";

export const ChangeLanguage: FunctionComponent = () => {
  const { language, setLanguage } = useContext(localesContext);
  const { userData, editUser } = useContext(userContext);
  const { setLanguageNotification } = useContext(pushNotificationContext);
  const iconLanguage = useMemo(
    () => (language === "en" ? imageCountryUs : imageCountryUk),
    [language]
  );
  const showLanguage = useMemo(
    () => (language === "uk" ? "ua" : language),
    [language]
  );

  const onChangeLanguage = async () => {
    if (language === "uk") {
      setLanguage("en");
      setLanguageNotification("en");
      if (userData) await editUser({ ...userData, languageLocal: "en" });
    } else {
      setLanguage("uk");
      setLanguageNotification("uk");
      if (userData) await editUser({ ...userData, languageLocal: "uk" });
    }
  };
  return (
    <TouchableOpacity onPress={onChangeLanguage} style={styles.buttonLanguage}>
      <ImageCache imageSrc={iconLanguage} style={styles.iconLanguage} />
      <Text style={styles.titleLanguage}>{showLanguage}</Text>
    </TouchableOpacity>
  );
};
