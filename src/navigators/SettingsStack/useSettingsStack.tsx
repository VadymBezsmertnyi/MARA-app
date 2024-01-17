import { useContext } from "react";

// providers
import { localesContext } from "../../../localization/localization.provider";

// constants
import { PATHS_SETTINGS_SCREEN } from "../useNavigator.constants";

// News and events
import { SettingsMain } from "../../screens/settingsScreens/SettingsMain/SettingsMain";
import { SettingsProfile } from "../../screens/settingsScreens/SettingsProfile/SettingsProfile";

export const useSettingsStack = () => {
  const { i18n } = useContext(localesContext);

  const settingsScreens = [
    {
      id: PATHS_SETTINGS_SCREEN.settingsMain,
      name: PATHS_SETTINGS_SCREEN.settingsMain,
      title: null,
      headerShown: false,
      component: SettingsMain,
    },
    {
      id: PATHS_SETTINGS_SCREEN.settingsProfile,
      name: PATHS_SETTINGS_SCREEN.settingsProfile,
      title: null,
      headerShown: false,
      component: SettingsProfile,
    },
  ] as const;

  return { settingsScreens };
};
