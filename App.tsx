/* eslint-disable no-restricted-exports */ //enabled export default
/* eslint-disable react/jsx-max-depth */ //For depth>15
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Messages, setupI18n } from "@lingui/core";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from "@expo-google-fonts/open-sans";
import { useFonts } from "expo-font";

// providers
import LocalesProvider from "./localization/localization.provider";
import { ThemeProvider } from "./src/providers/ThemeProvider/ThemeProvider";
import { BiometricProvider } from "./src/providers/BiometricProvider/BiometricProvider";
import { LoadingProvider } from "./src/providers/LoadingProvider/LoadingProvider";
import { UserProvider } from "./src/providers/UserProvider/UserProvider";
import { MapProvider } from "./src/providers/MapProvider/MapProvider";
import { WorkshopsProvider } from "./src/providers/WorkshopsProvider/WorkshopsProvider";
import { WebSocketProvider } from "./src/providers/WebSocketProvider/WebSocketProvider";
import { ApiProvider } from "./src/providers/ApiProvider/ApiProvider";
import { EventsProvider } from "./src/providers/EventsProvider/EventsProvider";
import { PlacesProvider } from "./src/providers/PlacesProvider/PlacesProvider";
import { MarketProvider } from "./src/providers/MarketProvider/MarketProvider";
import { PaymentProvider } from "./src/providers/PaymentProvider/PaymentProvider";

// components
import { Navigators } from "./src/navigators/Navigators";

// constants
import {
  defaultLanguage,
  languagesLinguiAlias,
} from "./localization/localization.const";

// locales
import { messages as translationsUk } from "./localization/uk/messages";
import { messages as translationsEn } from "./localization/en/messages";

// styles
import { styles } from "./App.styles";

const CATALOGS_LANGUAGES = {
  uk: translationsUk as Messages,
  en: translationsEn as Messages,
};

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "openid",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS = process.env
  .EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS as string;
const EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB = process.env
  .EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB as string;

GoogleSignin.configure({
  scopes: GOOGLE_SCOPES,
  webClientId: EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB || "",
  offlineAccess: true,
  iosClientId: EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS,
});

SplashScreen.preventAutoHideAsync();

function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  const i18n = setupI18n({
    messages: CATALOGS_LANGUAGES,
    locale: languagesLinguiAlias[defaultLanguage],
  });

  useEffect(() => {
    if (appIsReady)
      (async () => {
        setAppIsReady(false);
        await SplashScreen.hideAsync();
      })();
  }, [appIsReady]);

  useEffect(() => {
    setAppIsReady(true);
  }, []);

  return (
    <WebSocketProvider>
      <ThemeProvider>
        <LoadingProvider isLoadingProps={fontsLoaded}>
          <LocalesProvider i18n={i18n}>
            <ApiProvider>
              <PlacesProvider>
                <BiometricProvider>
                  <UserProvider i18n={i18n}>
                    <NavigationContainer>
                      <EventsProvider>
                        <SafeAreaProvider>
                          <MapProvider>
                            <GestureHandlerRootView
                              style={styles.gestureHandlerRootView}
                            >
                              <PaymentProvider>
                                <WorkshopsProvider>
                                  <MarketProvider>
                                    <Navigators />
                                  </MarketProvider>
                                </WorkshopsProvider>
                              </PaymentProvider>
                            </GestureHandlerRootView>
                          </MapProvider>
                        </SafeAreaProvider>
                      </EventsProvider>
                    </NavigationContainer>
                  </UserProvider>
                </BiometricProvider>
              </PlacesProvider>
            </ApiProvider>
          </LocalesProvider>
        </LoadingProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default App;
