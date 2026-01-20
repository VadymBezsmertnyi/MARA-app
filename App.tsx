/* eslint-disable no-restricted-exports */ //enabled export default
/* eslint-disable react/jsx-max-depth */ //For depth>15
import React, { useEffect, useRef, useState } from "react";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Settings } from "react-native-fbsdk-next";
import { setCustomText, setCustomTextInput } from "react-native-global-props";
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

// types
import { RootAllScreensParamList } from "./src/navigators/Navigators.types";

// providers
import LocalesProvider from "./localization/localization.provider";
import ThemeProvider from "./src/providers/ThemeProvider/ThemeProvider";
import BiometricProvider from "./src/providers/BiometricProvider/BiometricProvider";
import LoadingProvider from "./src/providers/LoadingProvider/LoadingProvider";
import UserProvider from "./src/providers/UserProvider/UserProvider";
import MapProvider from "./src/providers/MapProvider/MapProvider";
import WorkshopsProvider from "./src/providers/WorkshopsProvider/WorkshopsProvider";
import WebSocketProvider from "./src/providers/WebSocketProvider/WebSocketProvider";
import ApiProvider from "./src/providers/ApiProvider/ApiProvider";
import EventsProvider from "./src/providers/EventsProvider/EventsProvider";
import PlacesProvider from "./src/providers/PlacesProvider/PlacesProvider";
import MarketProvider from "./src/providers/MarketProvider/MarketProvider";
import PaymentProvider from "./src/providers/PaymentProvider/PaymentProvider";
import PushNotificationProvider from "./src/providers/PushNotificationProvider/PushNotificationProvider";
import AnalyticsProvider from "./src/providers/AnalyticsProvider/AnalyticsProvider";
import SharingProvider from "./src/providers/SharingProvider/SharingProvider";
import BusinessProvider from "./src/providers/BusinessProvider/BusinessProvider";
import PermissionsProvider from "./src/providers/PermissionsProvider/PermissionsProvider";
import DropDownAlertProvider from "./src/providers/DropDownAlertProvider/DropDownAlertProvider";
import SubscriptionProvider from "./src/providers/SubscriptionProvider/SubscriptionProvider";

// components
import { Navigators } from "./src/navigators/Navigators";

// styles
import { styles } from "./App.styles";

if (__DEV__) import("./ReactotronConfig");

const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "openid",
  "https://www.googleapis.com/auth/userinfo.profile",
];

const EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS = process.env
  .EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS as string;
const EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB = process.env
  .EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB as string;

SplashScreen.preventAutoHideAsync();
Settings.initializeSDK();

function App() {
  const [currentRouteName, setCurrentRouteName] = useState<string | null>(null);
  const navigationRef =
    useRef<NavigationContainerRef<RootAllScreensParamList>>(null);
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  const hideSplashScreen = async () => {
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    if (appIsReady) hideSplashScreen();
  }, [appIsReady]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: GOOGLE_SCOPES,
      webClientId: EXPO_PUBLIC_CLIENT_ID_GOOGLE_WEB || "",
      offlineAccess: true,
      iosClientId: EXPO_PUBLIC_CLIENT_ID_GOOGLE_IOS,
    });
    const customTextProps = {
      allowFontScaling: false,
    };
    setCustomText(customTextProps);
    setCustomTextInput(customTextProps);
    setAppIsReady(true);
  }, []);

  return (
    <DropDownAlertProvider>
      <WebSocketProvider>
        <ThemeProvider>
          <LoadingProvider isLoadingProps={fontsLoaded}>
            <LocalesProvider>
              <ApiProvider>
                <AnalyticsProvider currentRouteName={currentRouteName}>
                  <PlacesProvider>
                    <BiometricProvider>
                      <UserProvider>
                        <SubscriptionProvider>
                          <NavigationContainer
                            ref={navigationRef}
                            onStateChange={() => {
                              const nameRoute =
                                navigationRef.current?.getCurrentRoute()?.name;
                              if (nameRoute) setCurrentRouteName(nameRoute);
                            }}
                          >
                            <EventsProvider>
                              <SafeAreaProvider>
                                <PermissionsProvider>
                                  <MapProvider>
                                    <GestureHandlerRootView
                                      style={styles.gestureHandlerRootView}
                                    >
                                      <PushNotificationProvider
                                        currentRouteName={currentRouteName}
                                      >
                                        <PaymentProvider>
                                          <WorkshopsProvider>
                                            <MarketProvider>
                                              <SharingProvider>
                                                <BusinessProvider>
                                                  <Navigators
                                                    currentRouteName={
                                                      currentRouteName
                                                    }
                                                    navigation={
                                                      navigationRef.current
                                                    }
                                                  />
                                                </BusinessProvider>
                                              </SharingProvider>
                                            </MarketProvider>
                                          </WorkshopsProvider>
                                        </PaymentProvider>
                                      </PushNotificationProvider>
                                    </GestureHandlerRootView>
                                  </MapProvider>
                                </PermissionsProvider>
                              </SafeAreaProvider>
                            </EventsProvider>
                          </NavigationContainer>
                        </SubscriptionProvider>
                      </UserProvider>
                    </BiometricProvider>
                  </PlacesProvider>
                </AnalyticsProvider>
              </ApiProvider>
            </LocalesProvider>
          </LoadingProvider>
        </ThemeProvider>
      </WebSocketProvider>
    </DropDownAlertProvider>
  );
}

export default App;
