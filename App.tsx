import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Messages, setupI18n } from "@lingui/core";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
  OpenSans_800ExtraBold,
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_500Medium_Italic,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold_Italic,
  OpenSans_800ExtraBold_Italic,
} from "@expo-google-fonts/open-sans";

// providers
import LocalesProvider from "./localization/localization.provider";
import { ThemeProvider } from "./src/providers/ThemeProvider/ThemeProvider";
import { BiometricAuthenticatorProvider } from "./src/providers/biometricAuthenticator/biometricAuthenticator.provider";
import { LoadingProvider } from "./src/providers/LoadingProvider/LoadingProvider";
import { UserProvider } from "./src/providers/user/user.provider";
import { MapProvider } from "./src/providers/MapProvider/MapProvider";
import { WorkshopsProvider } from "./src/providers/workshops/workshops.provider";
import { WebSocketProvider } from "./src/providers/WebSocketProvider/WebSocketProvider";
import { ApiProvider } from "./src/providers/ApiProvider/ApiProvider";
import { EventsProvider } from "./src/providers/EventsProvider/EventsProvider";
import { ModalsSheetProvider } from "./src/providers/ModalsSheetProvider/ModalsSheetProvider";
import { ModalsProvider } from "./src/providers/ModalsProvider/ModalsProvider";

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
import { useFonts } from "expo-font";

const CATALOGS_LANGUAGES = {
  uk: translationsUk as Messages,
  en: translationsEn as Messages,
};

function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    OpenSans_300Light,
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    OpenSans_800ExtraBold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_500Medium_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    OpenSans_800ExtraBold_Italic,
  });

  const i18n = setupI18n({
    messages: CATALOGS_LANGUAGES,
    locale: languagesLinguiAlias[defaultLanguage],
  });

  return (
    <WebSocketProvider>
      <ThemeProvider>
        <LoadingProvider isLoadingProps={fontsLoaded}>
          <LocalesProvider i18n={i18n}>
            <ApiProvider>
              <BiometricAuthenticatorProvider>
                <UserProvider i18n={i18n}>
                  <EventsProvider>
                    <NavigationContainer>
                      <SafeAreaProvider>
                        <WorkshopsProvider>
                          <MapProvider>
                            <GestureHandlerRootView
                              style={styles.gestureHandlerRootView}
                            >
                              <ModalsSheetProvider>
                                <ModalsProvider>
                                  <Navigators />
                                </ModalsProvider>
                              </ModalsSheetProvider>
                            </GestureHandlerRootView>
                          </MapProvider>
                        </WorkshopsProvider>
                      </SafeAreaProvider>
                    </NavigationContainer>
                  </EventsProvider>
                </UserProvider>
              </BiometricAuthenticatorProvider>
            </ApiProvider>
          </LocalesProvider>
        </LoadingProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default App;
