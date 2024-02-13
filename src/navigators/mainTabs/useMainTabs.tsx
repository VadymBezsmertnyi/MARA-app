import { useContext } from "react";
import { t } from "@lingui/macro";

// providers
import { localesContext } from "../../../localization/localization.provider";

// stacks
import { EventsStack } from "../EventsStack/eventsStack";
import { WorkshopStack } from "../WorkshopStack/workshopStack";
import { SettingsStack } from "../SettingsStack/settingsStack";
import { MarketStack } from "../MarketStack/MarketStack";

// screens
import { Map } from "../../screens/mainScreens/Map/Map";

// icons components
import {
  IconTabMap,
  IconTabMapSelect,
  IconTabMarket,
  IconTabMarketSelect,
  IconTabNews,
  IconTabNewsSelect,
  IconTabSettings,
  IconTabSettingsSelect,
  IconTabWorkshops,
  IconTabWorkshopsSelect,
} from "../../icons/components";

// constants
import {
  PATHS_MAIN_TABS,
  PATHS_EVENTS_SCREENS,
  PATHS_SETTINGS_SCREENS,
  PATHS_WORKSHOP_SCREENS,
  PATHS_MARKET_SCREENS,
} from "../useNavigator.constants";

export const useMainTabs = () => {
  const { i18n } = useContext(localesContext);

  const mainTabs = [
    {
      id: PATHS_MAIN_TABS.workshops,
      name: PATHS_MAIN_TABS.workshops,
      mainScreen: PATHS_WORKSHOP_SCREENS.workshopMain,
      title: t(i18n)`Workshops`,
      component: WorkshopStack,
      headerShown: false,
      tabBarIcon: IconTabWorkshops,
      tabBarIconSelect: IconTabWorkshopsSelect,
    },
    {
      id: PATHS_MAIN_TABS.map,
      name: PATHS_MAIN_TABS.map,
      mainScreen: null,
      title: t(i18n)`Map`,
      component: Map,
      headerShown: false,
      tabBarIcon: IconTabMap,
      tabBarIconSelect: IconTabMapSelect,
    },
    {
      id: PATHS_MAIN_TABS.news,
      name: PATHS_MAIN_TABS.news,
      mainScreen: PATHS_EVENTS_SCREENS.eventsMain,
      title: t(i18n)`Events and news`,
      component: EventsStack,
      headerShown: true,
      tabBarIcon: IconTabNews,
      tabBarIconSelect: IconTabNewsSelect,
    },
    {
      id: PATHS_MAIN_TABS.market,
      name: PATHS_MAIN_TABS.market,
      mainScreen: PATHS_MARKET_SCREENS.marketMain,
      title: t(i18n)`Market`,
      component: MarketStack,
      headerShown: false,
      tabBarIcon: IconTabMarket,
      tabBarIconSelect: IconTabMarketSelect,
    },
    {
      id: PATHS_MAIN_TABS.settings,
      name: PATHS_MAIN_TABS.settings,
      mainScreen: PATHS_SETTINGS_SCREENS.settingsMain,
      title: t(i18n)`Settings`,
      component: SettingsStack,
      headerShown: false,
      tabBarIcon: IconTabSettings,
      tabBarIconSelect: IconTabSettingsSelect,
    },
  ] as const;

  return { mainTabs };
};
