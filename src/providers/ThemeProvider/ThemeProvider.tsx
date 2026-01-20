import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { StatusBar } from "expo-status-bar";
import { Appearance, View } from "react-native";

// helps
import { getDeviceStorage, setDeviceStorage } from "../../helps/storage.help";

// constants
import {
  KEY_STORAGE_THEME,
  THEME_DARK,
  THEME_LIGHT,
} from "./ThemeProvider.const";

// helpers
import { styles } from "./ThemeProvider.styles";
import colors from "../../../styles/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ThemeT = "light" | "dark";

export type ThemeContext = {
  theme: ThemeT;
  heightStatusBar: number;
  selectTheme: (newTheme: ThemeT) => Promise<void>;
  getTheme: () => Promise<void>;
  heightTabBar: number | null;
  setHeightTabBar: (height: number | null) => void;
};

export type ThemeProviderProps = {
  children: React.ReactNode;
};

export const themeContext = React.createContext({} as ThemeContext);

const ThemeProvider: FunctionComponent<ThemeProviderProps> = (props) => {
  const { children } = props;
  const { top } = useSafeAreaInsets();
  const [theme, setTheme] = useState<ThemeT>(THEME_LIGHT);
  const [heightTabBar, setHeightTabBar] = useState<number | null>(null);

  const styleContainer = useMemo(
    () => ({
      ...styles.container,
      backgroundColor: theme === THEME_LIGHT ? colors.white : colors.blackRich,
    }),
    [theme]
  );

  const selectTheme = async (newTheme: ThemeT) => {
    setTheme(newTheme);
    await setDeviceStorage(KEY_STORAGE_THEME, newTheme);
  };

  const getTheme = async () => {
    const themeDevice = Appearance.getColorScheme();
    const themeStorage = await getDeviceStorage(KEY_STORAGE_THEME);
    const isTheme = themeStorage === THEME_LIGHT || themeStorage === THEME_DARK;

    // TODO later ON
    /* if (themeStorage && isTheme) setTheme(themeStorage);
    else if (themeDevice) setTheme(themeDevice);
    else setTheme(THEME_LIGHT); */

    setTheme(THEME_LIGHT);
  };

  const contextValue: ThemeContext = useMemo(
    () => ({
      theme,
      heightStatusBar: top,
      heightTabBar,
      selectTheme,
      getTheme,
      setHeightTabBar,
    }),
    [theme, top, heightTabBar]
  );

  useEffect(() => {
    getTheme();
  }, []);

  return (
    <themeContext.Provider value={contextValue}>
      <StatusBar style={theme === THEME_DARK ? "light" : "dark"} translucent />
      <View style={styleContainer}>{children}</View>
    </themeContext.Provider>
  );
};

export const useThemeProvider = () => useContext(themeContext);

export default ThemeProvider;
