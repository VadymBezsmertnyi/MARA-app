import { t } from "@lingui/macro";

// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// constants
import { PATHS_EVENTS_SCREENS } from "../useNavigator.constants";

// News and events
import { EventsMain } from "../../screens/newsScreens/EventsMain/EventsMain";
import { EventsList } from "../../screens/newsScreens/EventsList/EventsList";
import { EventItem } from "../../screens/newsScreens/EventItem/EventItem";
import { AddEvent } from "../../screens/newsScreens/EventAdd/EventAdd";

export const useNewsStack = () => {
  const { i18n } = useLocalesProvider();

  const eventsScreens = [
    {
      id: PATHS_EVENTS_SCREENS.eventsMain,
      name: PATHS_EVENTS_SCREENS.eventsMain,
      title: null,
      headerShown: false,
      component: EventsMain,
    },
    {
      id: PATHS_EVENTS_SCREENS.eventsList,
      name: PATHS_EVENTS_SCREENS.eventsList,
      title: t(i18n)`Events`,
      headerShown: false,
      component: EventsList,
    },
    {
      id: PATHS_EVENTS_SCREENS.eventItem,
      name: PATHS_EVENTS_SCREENS.eventItem,
      title: t(i18n)`Event`,
      headerShown: false,
      component: EventItem,
    },
    {
      id: PATHS_EVENTS_SCREENS.eventAdd,
      name: PATHS_EVENTS_SCREENS.eventAdd,
      title: t(i18n)`Create event`,
      headerShown: false,
      component: AddEvent,
    },
  ] as const;

  return { eventsScreens };
};
