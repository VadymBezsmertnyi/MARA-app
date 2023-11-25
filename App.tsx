import React, { useContext, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Messages, setupI18n } from '@lingui/core';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

// providers
import LocalesProvider from './localization/localization.provider';
import { ThemeProvider } from './src/providers/theme/theme.provider';
import { BiometricAuthenticatorProvider } from './src/providers/biometricAuthenticator/biometricAuthenticator.provider';
import { LoadingProvider } from './src/providers/loading/loading.provider';
import { UserProvider, userContext } from './src/providers/user/user.provider';
import { AppProvider } from './src/providers/app/app.provider';
import { MapProvider } from './src/providers/map/map.provider';
import { WorkshopsProvider } from './src/providers/workshops/workshops.provider';

// components
import { Navigators } from './src/navigators/Navigators';

// constants
import { defaultLanguage, languagesLinguiAlias } from './localization/localization.const';

// locales
import { messages as translationsUk } from './localization/uk/messages';
import { messages as translationsEn } from './localization/en/messages';

const CATALOGS_LANGUAGES = { uk: translationsUk as Messages, en: translationsEn as Messages };

function App() {
  const { userData } = useContext(userContext);
  const language = userData?.locale || defaultLanguage;
  const i18n = setupI18n({
    messages: CATALOGS_LANGUAGES,
    locale: languagesLinguiAlias[language],
  });
  const storeAppProvider = useMemo(() => ({ i18n }), [i18n]);
  const techStoreAppProvider = useMemo(() => ({}), []);

  return (
    <ThemeProvider>
      <LoadingProvider>
        <LocalesProvider i18n={i18n} language={language}>
          <AppProvider
            store={storeAppProvider}
            language={language}
            techStore={techStoreAppProvider}
          >
            <UserProvider i18n={i18n}>
              <NavigationContainer>
                <SafeAreaProvider>
                  <WorkshopsProvider>
                    <BiometricAuthenticatorProvider>
                      <MapProvider>
                        <Navigators />
                      </MapProvider>
                    </BiometricAuthenticatorProvider>
                  </WorkshopsProvider>
                </SafeAreaProvider>
              </NavigationContainer>
            </UserProvider>
          </AppProvider>
        </LocalesProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
