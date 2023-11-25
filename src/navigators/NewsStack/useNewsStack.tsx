import { useContext } from 'react';
import { t } from '@lingui/macro';

// providers
import { localesContext } from '../../../localization/localization.provider';

// constants
import { PATHS_NEWS_SCREENS } from '../useNavigator.constants';

// News and events
import { NewsMain } from '../../screens/newsScreens/NewsMain/NewsMain';
import { NewsList } from '../../screens/newsScreens/NewsList/NewsList';
import { NewItem } from '../../screens/newsScreens/NewItem/NewItem';
import { EventsList } from '../../screens/newsScreens/EventsList/EventsList';
import { EventItem } from '../../screens/newsScreens/EventItem/EventItem';
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
      id: PATHS_NEWS_SCREENS.newItem,
      name: PATHS_NEWS_SCREENS.newItem,
      title: t(i18n)`New`,
      headerShown: false,
      component: NewItem,
    },
    {
      id: PATHS_NEWS_SCREENS.eventsList,
      name: PATHS_NEWS_SCREENS.eventsList,
      title: t(i18n)`Events`,
      headerShown: false,
      component: EventsList,
    },
    {
      id: PATHS_NEWS_SCREENS.eventItem,
      name: PATHS_NEWS_SCREENS.eventItem,
      title: t(i18n)`Event`,
      headerShown: false,
      component: EventItem,
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
