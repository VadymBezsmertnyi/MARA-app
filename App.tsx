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
  OpenSans_400Regular,
  OpenSans_600SemiBold,
} from "@expo-google-fonts/open-sans";
import { useFonts } from "expo-font";

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
import { ModalDeleteProvider } from "./src/providers/ModalDeleteProvider/ModalDeleteProvider";

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

function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
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
                                  <ModalDeleteProvider>
                                    <Navigators />
                                  </ModalDeleteProvider>
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
