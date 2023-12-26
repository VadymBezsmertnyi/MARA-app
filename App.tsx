import React, { useContext, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Messages, setupI18n } from "@lingui/core";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// providers
import LocalesProvider from "./localization/localization.provider";
import { ThemeProvider } from "./src/providers/theme/theme.provider";
import { BiometricAuthenticatorProvider } from "./src/providers/biometricAuthenticator/biometricAuthenticator.provider";
import { LoadingProvider } from "./src/providers/loading/loading.provider";
import { UserProvider, userContext } from "./src/providers/user/user.provider";
import { MapProvider } from "./src/providers/MapProvider/MapProvider";
import { WorkshopsProvider } from "./src/providers/workshops/workshops.provider";
import { WebSocketProvider } from "./src/providers/WebSocketProvider/WebSocketProvider";
import { ApiProvider } from "./src/providers/ApiProvider/ApiProvider";
import { EventsProvider } from "./src/providers/EventsProvider/EventsProvider";
import { ModalsSheetProvider } from "./src/providers/ModalsSheetProvider/ModalsSheetProvider";

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
  const { userData } = useContext(userContext);
  const language = userData?.locale || defaultLanguage;
  const i18n = setupI18n({
    messages: CATALOGS_LANGUAGES,
    locale: languagesLinguiAlias[language],
  });

  return (
    <WebSocketProvider>
      <ThemeProvider>
        <LoadingProvider>
          <LocalesProvider i18n={i18n} language={language}>
            <ApiProvider>
              <UserProvider i18n={i18n}>
                <EventsProvider>
                  <NavigationContainer>
                    <SafeAreaProvider>
                      <WorkshopsProvider>
                        <BiometricAuthenticatorProvider>
                          <MapProvider>
                            <GestureHandlerRootView
                              style={styles.gestureHandlerRootView}
                            >
                              <ModalsSheetProvider>
                                <Navigators />
                              </ModalsSheetProvider>
                            </GestureHandlerRootView>
                          </MapProvider>
                        </BiometricAuthenticatorProvider>
                      </WorkshopsProvider>
                    </SafeAreaProvider>
                  </NavigationContainer>
                </EventsProvider>
              </UserProvider>
            </ApiProvider>
          </LocalesProvider>
        </LoadingProvider>
      </ThemeProvider>
    </WebSocketProvider>
  );
}

export default App;
