// providers
import { useLocalesProvider } from "../../../localization/localization.provider";

// constants
import { PATHS_EVENTS_SCREENS } from "../useNavigator.constants";

// News and events
import { EventsMain } from "../../screens/eventsScreens/EventsMain/EventsMain";
import { EventsList } from "../../screens/eventsScreens/EventsList/EventsList";
import { EventDetailsScreen } from "../../screens/eventsScreens/EventItem/EventItem";
import { AddEvent } from "../../screens/eventsScreens/EventAdd/EventAdd";

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
      title: i18n._("Events"),
      headerShown: false,
      component: EventsList,
    },
    {
      id: PATHS_EVENTS_SCREENS.eventItem,
      name: PATHS_EVENTS_SCREENS.eventItem,
      title: i18n._("Event"),
      headerShown: false,
      component: EventDetailsScreen,
    },
    {
      id: PATHS_EVENTS_SCREENS.eventAdd,
      name: PATHS_EVENTS_SCREENS.eventAdd,
      title: i18n._("Create event"),
      headerShown: false,
      component: AddEvent,
    },
  ] as const;

  return { eventsScreens };
};
