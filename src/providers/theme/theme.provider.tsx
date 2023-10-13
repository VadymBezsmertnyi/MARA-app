import React, { useEffect, useMemo, useState } from 'react';
import { Appearance, Platform, StatusBar, StatusBarStyle, View } from 'react-native';
import StatusBarHeight from '@expo/status-bar-height';

// helps
import { getDeviceStorage, setDeviceStorage } from '../../helps/storage.help';

// constants
import { KEY_STORAGE_THEME, THEME_DARK, THEME_LIGHT } from './theme.const';

// types
import { PropsT, ThemeContext, ThemeT } from './theme.types';

// helpers
import { styles } from './theme.styles';
import colors from '../../../styles/colors';

export const themeContext = React.createContext({} as ThemeContext);

export const ThemeProvider: React.FC<PropsT> = props => {
  const { children } = props;
  const [theme, setTheme] = useState<ThemeT>(THEME_LIGHT);
  const [heightStatusBar, setHeightStatusBar] = useState(0);

  const setBarStyle = useMemo((): StatusBarStyle => {
    if (theme === THEME_LIGHT) return 'dark-content';
    if (theme === THEME_DARK) return 'light-content';
    return 'default';
  }, [theme]);

  const styleContainer = useMemo(
    () => ({
      ...styles.container,
      paddingTop: heightStatusBar,
      backgroundColor: theme === THEME_LIGHT ? colors.white : colors.blackRich,
    }),
    [heightStatusBar, theme],
  );

  const getHeightStatusBar = async () => {
    if (Platform.OS !== 'android') {
      const getAsyncHeight = await StatusBarHeight.getAsync();
      setHeightStatusBar(StatusBar.currentHeight || getAsyncHeight);
    }
  };

  const selectTheme = async (newTheme: ThemeT) => {
    setTheme(newTheme);
    await setDeviceStorage(KEY_STORAGE_THEME, newTheme);
  };

  const getTheme = async () => {
    const themeDevice = Appearance.getColorScheme();
    const themeStorage = await getDeviceStorage(KEY_STORAGE_THEME);
    const isTheme = themeStorage === THEME_LIGHT || themeStorage === THEME_DARK;

    if (themeStorage && isTheme) setTheme(themeStorage);
    else if (themeDevice) setTheme(themeDevice);
    else setTheme(THEME_LIGHT);
  };

  const contextValue: ThemeContext = useMemo(() => ({ theme, selectTheme, getTheme }), [theme]);

  useEffect(() => {
    getTheme();
    getHeightStatusBar();
  }, []);

  return (
    <themeContext.Provider value={contextValue}>
      <StatusBar
        barStyle={setBarStyle}
        showHideTransition={'slide'}
        backgroundColor={theme === THEME_LIGHT ? colors.white : colors.blackRich}
      />
      <View style={styleContainer}>{children}</View>
    </themeContext.Provider>
  );
};
