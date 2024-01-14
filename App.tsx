import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Messages, setupI18n } from "@lingui/core";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  Montserrat_100Thin_Italic,
  Montserrat_200ExtraLight_Italic,
  Montserrat_300Light_Italic,
  Montserrat_400Regular_Italic,
  Montserrat_500Medium_Italic,
  Montserrat_600SemiBold_Italic,
  Montserrat_700Bold_Italic,
  Montserrat_800ExtraBold_Italic,
  Montserrat_900Black_Italic,
} from "@expo-google-fonts/montserrat";

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

const CATALOGS_LANGUAGES = {
  uk: translationsUk as Messages,
  en: translationsEn as Messages,
};

function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
    Montserrat_100Thin_Italic,
    Montserrat_200ExtraLight_Italic,
    Montserrat_300Light_Italic,
    Montserrat_400Regular_Italic,
    Montserrat_500Medium_Italic,
    Montserrat_600SemiBold_Italic,
    Montserrat_700Bold_Italic,
    Montserrat_800ExtraBold_Italic,
    Montserrat_900Black_Italic,
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
