import { useContext } from "react";

// providers
import { localesContext } from "../../../localization/localization.provider";

// constants
import { PATHS_SETTINGS_SCREENS } from "../useNavigator.constants";

// News and events
import { SettingsMain } from "../../screens/settingsScreens/SettingsMain/SettingsMain";
import { SettingsProfile } from "../../screens/settingsScreens/SettingsProfile/SettingsProfile";

export const useSettingsStack = () => {
  const { i18n } = useContext(localesContext);

  const settingsScreens = [
    {
      id: PATHS_SETTINGS_SCREENS.settingsMain,
      name: PATHS_SETTINGS_SCREENS.settingsMain,
      title: null,
      headerShown: false,
      component: SettingsMain,
    },
    {
      id: PATHS_SETTINGS_SCREENS.settingsProfile,
      name: PATHS_SETTINGS_SCREENS.settingsProfile,
      title: null,
      headerShown: false,
      component: SettingsProfile,
    },
  ] as const;

  return { settingsScreens };
};
