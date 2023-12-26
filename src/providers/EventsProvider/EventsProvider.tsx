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
  deleteEvent: (idEvent: number) => Promise<boolean>;
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
  const [eventsList, setEventsList] = useState<EventsType>([]);
  console.log("eventsList", eventsList);

  const getEvents = async () => {
    const result = await api(PATHS.eventsGet, null, resultEventsSchema);
    if (result?.events) setEventsList(result.events);
  };

  const addEvent = async (newEvent: EventType) => {
    if (userData?.id) {
      const data = { ...newEvent, userId: userData.id };
      const result = await api(
        PATHS.eventAdd,
        {
          method: "POST",
          data,
        },
        z.object({ event: eventSchema })
      );
      if (result?.event) setEventsList((state) => [...state, result.event]);
    }
  };

  const deleteEvent = async (idEvent: number): Promise<boolean> => {
    try {
      const result = await api(
        PATHS.eventDelete,
        { method: "DELETE", data: { id: idEvent } },
        z.object({ result: z.boolean() })
      );
      if (result?.result)
        setEventsList((state) => state.filter((event) => event.id !== idEvent));

      return true;
    } catch (error) {
      return false;
    }
  };

  const contextValue: EventsContext = useMemo(
    () => ({ eventsList, addEvent, deleteEvent }),
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
