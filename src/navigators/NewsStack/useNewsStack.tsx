import { useContext } from "react";
import { t } from "@lingui/macro";

// providers
import { localesContext } from "../../../localization/localization.provider";

// constants
import { PATHS_NEWS_SCREENS } from "../useNavigator.constants";

// News and events
import { NewsMain } from "../../screens/newsScreens/NewsMain/NewsMain";
import { NewsList } from "../../screens/newsScreens/NewsList/NewsList";
import { NewItem } from "../../screens/newsScreens/NewItem/NewItem";
import { EventsList } from "../../screens/newsScreens/EventsList/EventsList";
import { EventItem } from "../../screens/newsScreens/EventItem/EventItem";
import { AddEvent } from "../../screens/newsScreens/AddEvent/AddEvent";

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
      headerShown: true,
      component: NewsList,
    },
    {
      id: PATHS_NEWS_SCREENS.newItem,
      name: PATHS_NEWS_SCREENS.newItem,
      title: t(i18n)`New`,
      headerShown: true,
      component: NewItem,
    },
    {
      id: PATHS_NEWS_SCREENS.eventsList,
      name: PATHS_NEWS_SCREENS.eventsList,
      title: t(i18n)`Events`,
      headerShown: true,
      component: EventsList,
    },
    {
      id: PATHS_NEWS_SCREENS.eventItem,
      name: PATHS_NEWS_SCREENS.eventItem,
      title: t(i18n)`Event`,
      headerShown: true,
      component: EventItem,
    },
    {
      id: PATHS_NEWS_SCREENS.addEvent,
      name: PATHS_NEWS_SCREENS.addEvent,
      title: t(i18n)`Create event`,
      headerShown: true,
      component: AddEvent,
    },
  ] as const;

  return { newsScreens };
};
