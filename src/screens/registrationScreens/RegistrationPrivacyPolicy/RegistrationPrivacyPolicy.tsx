import React, { FunctionComponent, useMemo, useState } from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

// providers
import { useLocalesProvider } from "../../../../localization/localization.provider";

// components
import { Header } from "../../../components/Header/Header";
import { Loader } from "../../../providers/LoadingProvider/components/Loader/Loader";

// styles
import { styles } from "./RegistrationPrivacyPolicy.styles";

export const RegistrationPrivacyPolicy: FunctionComponent = () => {
  const { i18n, language } = useLocalesProvider();
  const [loading, setLoading] = useState(true);
  const EXPO_PUBLIC_WEB_SITE_URL =
    process.env.EXPO_PUBLIC_WEB_SITE_URL || "https://m-a-r-a.netlify.app";

  const source = useMemo(
    () => ({
      uri: `${EXPO_PUBLIC_WEB_SITE_URL}/mobile/privacy-policy?language=${language}`,
    }),
    []
  );

  return (
    <View style={styles.container}>
      <Header
        title={i18n._("Privacy Policy")}
        isShowRight={false}
        containerStyle={styles.containerHeader}
      />
      <WebView
        source={source}
        onLoad={(event) => {
          setLoading(event.nativeEvent.loading);
        }}
        cacheEnabled
      />
      {loading ? <Loader /> : null}
    </View>
  );
};
