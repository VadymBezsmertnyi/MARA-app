import { useContext } from 'react';
import { t } from '@lingui/macro';

// providers
import { localesContext } from '../../../localization/localization.provider';

// constants
import { PATHS_NEWS_SCREENS } from '../useNavigator.constants';

// News and events
import { NewsMain } from '../../screens/newsScreens/NewsMain/NewsMain';
import { NewsList } from '../../screens/newsScreens/NewsList/NewsList';
import { New } from '../../screens/newsScreens/New/New';
import { Events } from '../../screens/newsScreens/Events/Events';
import { Event } from '../../screens/newsScreens/Event/Event';
import { AddEvent } from '../../screens/newsScreens/AddEvent/AddEvent';
import { LocationEventInput } from '../../screens/newsScreens/LocationEventInput/LocationEventInput';
import { LocationEventMap } from '../../screens/newsScreens/LocationEventMap/LocationEventMap';

export const useNewsStack = () => {
  const { i18n } = useContext(localesContext);

  const newsScreens = [
    {
      id: PATHS_NEWS_SCREENS.newsMain,
      name: PATHS_NEWS_SCREENS.newsMain,
      title: null,
      headerShown: false,
      component: NewsMain,
    },
    {
      id: PATHS_NEWS_SCREENS.newsList,
      name: PATHS_NEWS_SCREENS.newsList,
      title: t(i18n)`News`,
      headerShown: false,
      component: NewsList,
    },
    {
      id: PATHS_NEWS_SCREENS.new,
      name: PATHS_NEWS_SCREENS.new,
      title: t(i18n)`New`,
      headerShown: false,
      component: New,
    },
    {
      id: PATHS_NEWS_SCREENS.events,
      name: PATHS_NEWS_SCREENS.events,
      title: t(i18n)`Events`,
      headerShown: false,
      component: Events,
    },
    {
      id: PATHS_NEWS_SCREENS.event,
      name: PATHS_NEWS_SCREENS.event,
      title: t(i18n)`Event`,
      headerShown: false,
      component: Event,
    },
    {
      id: PATHS_NEWS_SCREENS.addEvent,
      name: PATHS_NEWS_SCREENS.addEvent,
      title: t(i18n)`Create event`,
      headerShown: false,
      component: AddEvent,
    },
    {
      id: PATHS_NEWS_SCREENS.locationEventInput,
      name: PATHS_NEWS_SCREENS.locationEventInput,
      title: t(i18n)`Location event`,
      headerShown: false,
      component: LocationEventInput,
    },
    {
      id: PATHS_NEWS_SCREENS.locationEventMap,
      name: PATHS_NEWS_SCREENS.locationEventMap,
      title: t(i18n)`Location event`,
      headerShown: false,
      component: LocationEventMap,
    },
  ] as const;

  return { newsScreens };
};
