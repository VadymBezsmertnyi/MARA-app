import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";

// types
import { EventType, EventsType } from "./EventsProvider.types";

// providers
import { userContext } from "../user/user.provider";
import { apiContext } from "../ApiProvider/ApiProvider";

// constants
import { PATHS } from "../paths.constants";

// schemas
import { eventSchema, resultEventsSchema } from "./EventsProvider.schemas";

type EventsContext = {
  eventsList: EventsType;
  addEvent: (newEvent: EventType) => Promise<void>;
};

type EventsProviderType = {
  children: JSX.Element;
};

export const eventsContext = React.createContext({} as EventsContext);

export const EventsProvider: FunctionComponent<EventsProviderType> = ({
  children,
}) => {
  const { userData } = useContext(userContext);
  const { api } = useContext(apiContext);
  const [eventsList, setEventsLest] = useState<EventsType>([]);
  console.log("eventsList", eventsList);

  const getEvents = async () => {
    const result = await api(PATHS.eventsGet, null, resultEventsSchema);
    if (result?.events) setEventsLest(result.events);
  };

  const addEvent = async (newEvent: EventType) => {
    if (userData?.id) {
      const result = await api(
        PATHS.eventAdd,
        {
          method: "POST",
          data: { ...newEvent, userId: userData.id },
        },
        z.object({ event: eventSchema })
      );
      if (result?.event) setEventsLest((state) => [...state, result.event]);
    }
  };

  const contextValue: EventsContext = useMemo(
    () => ({ eventsList, addEvent }),
    [eventsList]
  );

  useEffect(() => {
    if (userData?.id) getEvents();
  }, [userData?.id]);

  return (
    <eventsContext.Provider value={contextValue}>
      {children}
    </eventsContext.Provider>
  );
};
