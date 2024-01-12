import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ImageBackground } from "expo-image";
import { BlurView } from "expo-blur";
import { Trans } from "@lingui/macro";

// providers
import { themeContext } from "../../providers/theme/theme.provider";
import { localesContext } from "../../../localization/localization.provider";

// components
import { Logo } from "../../components/Logo/Logo";
import { ImageCache } from "../../components/ImageCache/ImageCache";
import { Socials } from "../../components/Socials/Socials";

// images
import imageSplash from "../../../assets/splash.png";
import imageCountryUk from "../../../images/icon-country-uk.png";
import imageCountryUs from "../../../images/icon-country-us.png";

// styles
import { styles } from "./Welcome.styles";

export const Welcome: FunctionComponent = () => {
  const { language, setLanguage } = useContext(localesContext);
  const { setIsSplash } = useContext(themeContext);
  const iconLanguage = useMemo(
    () => (language === "en" ? imageCountryUs : imageCountryUk),
    [language]
  );
  const showLanguage = useMemo(
    () => (language === "uk" ? "ua" : language),
    [language]
  );

  useEffect(() => {
    setIsSplash(true);
  }, []);

  const onChangeLanguage = () => {
    if (language === "uk") setLanguage("en");
    else setLanguage("uk");
  };

  return (
    <ImageBackground style={styles.container} source={imageSplash}>
      <BlurView intensity={8} style={styles.containerBlur}>
        <View style={styles.containerLanguage}>
          <TouchableOpacity
            onPress={onChangeLanguage}
            style={styles.buttonLanguage}
          >
            <ImageCache imageSrc={iconLanguage} style={styles.iconLanguage} />
            <Text style={styles.titleLanguage}>{showLanguage}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerLogo}>
          <Logo />
        </View>
        <View style={styles.containerTitles}>
          <Text style={styles.title}>
            <Trans>Hello!</Trans>
          </Text>
          <Text style={styles.subTitle}>
            <Trans>We're glad to see you on our service.</Trans>{" "}
          </Text>
          <Text style={styles.subTitle}>
            <Trans>Authorize using:</Trans>
          </Text>
          <Socials styleContainer={styles.containerSocials} />
        </View>
      </BlurView>
    </ImageBackground>
  );
};
