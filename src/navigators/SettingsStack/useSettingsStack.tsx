import { useContext } from "react";

// providers
import { localesContext } from "../../../localization/localization.provider";

// constants
import { PATHS_SETTINGS_SCREENS } from "../useNavigator.constants";

// News and events
import { SettingsMain } from "../../screens/settingsScreens/SettingsMain/SettingsMain";
import { SettingsProfile } from "../../screens/settingsScreens/SettingsProfile/SettingsProfile";
import { SettingsEvents } from "../../screens/settingsScreens/SettingsEvents/SettingsEvents";
import { AddEvent } from "../../screens/newsScreens/AddEvent/AddEvent";

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
    {
      id: PATHS_SETTINGS_SCREENS.settingsEvents,
      name: PATHS_SETTINGS_SCREENS.settingsEvents,
      title: null,
      headerShown: false,
      component: SettingsEvents,
    },
    {
      id: PATHS_SETTINGS_SCREENS.settingsAddEvent,
      name: PATHS_SETTINGS_SCREENS.settingsAddEvent,
      title: i18n._("Create event"),
      headerShown: true,
      component: AddEvent,
    },
    {
      id: PATHS_SETTINGS_SCREENS.settingsChangeEvent,
      name: PATHS_SETTINGS_SCREENS.settingsChangeEvent,
      title: i18n._("Event"),
      headerShown: true,
      component: AddEvent,
    },
  ] as const;

  return { settingsScreens };
};
