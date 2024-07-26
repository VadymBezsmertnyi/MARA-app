import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Appearance,
  Platform,
  StatusBar,
  StatusBarStyle,
  View,
} from "react-native";
import StatusBarHeight from "@expo/status-bar-height";

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
  const [theme, setTheme] = useState<ThemeT>(THEME_LIGHT);
  const [heightStatusBar, setHeightStatusBar] = useState(0);
  const [heightTabBar, setHeightTabBar] = useState<number | null>(null);

  const setBarStyle = useMemo((): StatusBarStyle => {
    if (theme === THEME_LIGHT) return "dark-content";
    if (theme === THEME_DARK) return "light-content";
    return "default";
  }, [theme]);

  const styleContainer = useMemo(
    () => ({
      ...styles.container,
      backgroundColor: theme === THEME_LIGHT ? colors.white : colors.blackRich,
    }),
    [theme]
  );

  const getHeightStatusBar = async () => {
    if (Platform.OS !== "android") {
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

    // TODO later ON
    /* if (themeStorage && isTheme) setTheme(themeStorage);
    else if (themeDevice) setTheme(themeDevice);
    else setTheme(THEME_LIGHT); */

    setTheme(THEME_LIGHT);
  };

  const contextValue: ThemeContext = useMemo(
    () => ({
      theme,
      heightStatusBar,
      heightTabBar,
      selectTheme,
      getTheme,
      setHeightTabBar,
    }),
    [theme, heightStatusBar, heightTabBar]
  );

  useEffect(() => {
    getTheme();
    getHeightStatusBar();
  }, []);

  return (
    <themeContext.Provider value={contextValue}>
      <StatusBar
        barStyle={setBarStyle}
        showHideTransition={"slide"}
        backgroundColor={
          theme === THEME_LIGHT ? colors.white : colors.blackRich
        }
      />
      <View style={styleContainer}>{children}</View>
    </themeContext.Provider>
  );
};

export const useThemeProvider = () => useContext(themeContext);

export default ThemeProvider;
