// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// stacks
import { EventsStack } from "../EventsStack/eventsStack";
import { WorkshopStack } from "../WorkshopStack/workshopStack";
import { SettingsStack } from "../SettingsStack/settingsStack";
import { HelpStack } from "../HelpStack/helpStack";

// screens
import { Map } from "../../screens/mainScreens/Map/Map";

// icons components
import {
  IconTabMap,
  IconTabMapSelect,
  IconTabNews,
  IconTabNewsSelect,
  IconTabSettings,
  IconTabSettingsSelect,
  IconTabWorkshops,
  IconTabWorkshopsSelect,
} from "../../icons/components";
import { MaterialIcons } from "@expo/vector-icons";

// constants
import {
  PATHS_MAIN_TABS,
  PATHS_EVENTS_SCREENS,
  PATHS_SETTINGS_SCREENS,
  PATHS_WORKSHOP_SCREENS,
  PATHS_HELP_SCREENS,
} from "../useNavigator.constants";

export const useMainTabs = () => {
  const { i18n } = useLocalesProvider();

  const mainTabs = [
    {
      id: PATHS_MAIN_TABS.workshops,
      name: PATHS_MAIN_TABS.workshops,
      mainScreen: PATHS_WORKSHOP_SCREENS.workshopMain,
      title: i18n._("Workshops"),
      component: WorkshopStack,
      headerShown: false,
      tabBarIcon: IconTabWorkshops,
      tabBarIconSelect: IconTabWorkshopsSelect,
    },
    {
      id: PATHS_MAIN_TABS.events,
      name: PATHS_MAIN_TABS.events,
      mainScreen: PATHS_EVENTS_SCREENS.eventsMain,
      title: i18n._("Events"),
      component: EventsStack,
      headerShown: false,
      tabBarIcon: IconTabNews,
      tabBarIconSelect: IconTabNewsSelect,
    },
    {
      id: PATHS_MAIN_TABS.map,
      name: PATHS_MAIN_TABS.map,
      mainScreen: null,
      title: i18n._("Map"),
      component: Map,
      headerShown: false,
      tabBarIcon: IconTabMap,
      tabBarIconSelect: IconTabMapSelect,
    },
    {
      id: PATHS_MAIN_TABS.help,
      name: PATHS_MAIN_TABS.help,
      mainScreen: PATHS_HELP_SCREENS.helpMain,
      title: i18n._("Help"),
      component: HelpStack,
      headerShown: false,
      tabBarIcon: MaterialIcons,
      tabBarIconSelect: MaterialIcons,
      tabBarIconName: "help-outline",
      tabBarIconNameSelect: "help",
    },
    {
      id: PATHS_MAIN_TABS.settings,
      name: PATHS_MAIN_TABS.settings,
      mainScreen: PATHS_SETTINGS_SCREENS.settingsMain,
      title: i18n._("Settings"),
      component: SettingsStack,
      headerShown: false,
      tabBarIcon: IconTabSettings,
      tabBarIconSelect: IconTabSettingsSelect,
    },
  ] as const;

  return { mainTabs };
};
