import { useContext } from "react";

// providers
import { localesContext } from "../../../localization/localization.provider";

// constants
import { PATHS_SETTINGS_SCREENS } from "../useNavigator.constants";

// News and events
import { SettingsMain } from "../../screens/settingsScreens/SettingsMain/SettingsMain";
import { SettingsProfile } from "../../screens/settingsScreens/SettingsProfile/SettingsProfile";
import { SettingsEvents } from "../../screens/settingsScreens/SettingsEvents/SettingsEvents";
import { AddEvent } from "../../screens/newsScreens/EventAdd/EventAdd";

// Workshops
import { SettingsWorkshops } from "../../screens/settingsScreens/SettingsWorkshops/SettingsWorkshops";
import { WorkshopAdd } from "../../screens/workshopsScreens/WorkshopAdd/WorkshopAdd";

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
      id: PATHS_SETTINGS_SCREENS.settingsEventAdd,
      name: PATHS_SETTINGS_SCREENS.settingsEventAdd,
      title: i18n._("Create event"),
      headerShown: true,
      component: AddEvent,
    },
    {
      id: PATHS_SETTINGS_SCREENS.settingsEventChange,
      name: PATHS_SETTINGS_SCREENS.settingsEventChange,
      title: i18n._("Change event"),
      headerShown: true,
      component: AddEvent,
    },
    {
      id: PATHS_SETTINGS_SCREENS.settingsWorkshops,
      name: PATHS_SETTINGS_SCREENS.settingsWorkshops,
      title: null,
      headerShown: false,
      component: SettingsWorkshops,
    },
    {
      id: PATHS_SETTINGS_SCREENS.settingsWorkshopAdd,
      name: PATHS_SETTINGS_SCREENS.settingsWorkshopAdd,
      title: i18n._("Create workshop"),
      headerShown: false,
      component: WorkshopAdd,
    },
    {
      id: PATHS_SETTINGS_SCREENS.settingsWorkshopChange,
      name: PATHS_SETTINGS_SCREENS.settingsWorkshopChange,
      title: i18n._("Change workshop"),
      headerShown: false,
      component: WorkshopAdd,
    },
  ] as const;

  return { settingsScreens };
};
