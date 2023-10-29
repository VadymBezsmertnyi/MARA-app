import { useContext } from 'react';
import { t } from '@lingui/macro';

// providers
import { localesContext } from '../../../localization/localization.provider';

// screens
import { Workshops } from '../../screens/mainScreens/Workshops/Workshops';

// stacks
import { NewsStack } from '../NewsStack/newsStack';

// screens
import { Map } from '../../screens/mainScreens/Map/Map';
import { Market } from '../../screens/mainScreens/Market/Market';
import { Settings } from '../../screens/mainScreens/Settings/Settings';

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
} from '../../icons/components';

// constants
import { PATHS_MAIN_TABS } from '../useNavigator.constants';

export const useMainTabs = () => {
  const { i18n } = useContext(localesContext);

  const mainTabs = [
    {
      id: PATHS_MAIN_TABS.workshops,
      name: PATHS_MAIN_TABS.workshops,
      title: t(i18n)`Workshops`,
      component: Workshops,
      headerShown: false,
      tabBarIcon: IconTabWorkshops,
      tabBarIconSelect: IconTabWorkshopsSelect,
    },
    {
      id: PATHS_MAIN_TABS.map,
      name: PATHS_MAIN_TABS.map,
      title: t(i18n)`Map`,
      component: Map,
      headerShown: false,
      tabBarIcon: IconTabMap,
      tabBarIconSelect: IconTabMapSelect,
    },
    {
      id: PATHS_MAIN_TABS.news,
      name: PATHS_MAIN_TABS.news,
      title: t(i18n)`Events and news`,
      component: NewsStack,
      headerShown: true,
      tabBarIcon: IconTabNews,
      tabBarIconSelect: IconTabNewsSelect,
    },
    {
      id: PATHS_MAIN_TABS.market,
      name: PATHS_MAIN_TABS.market,
      title: t(i18n)`Market`,
      component: Market,
      headerShown: false,
      tabBarIcon: IconTabMarket,
      tabBarIconSelect: IconTabMarketSelect,
    },
    {
      id: PATHS_MAIN_TABS.settings,
      name: PATHS_MAIN_TABS.settings,
      title: t(i18n)`Settings`,
      component: Settings,
      headerShown: false,
      tabBarIcon: IconTabSettings,
      tabBarIconSelect: IconTabSettingsSelect,
    },
  ] as const;

  return { mainTabs };
};
