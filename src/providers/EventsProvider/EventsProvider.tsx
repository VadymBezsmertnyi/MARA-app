import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { z } from "zod";
import qs from "qs";

// types
import { EventType, EventsType } from "./EventsProvider.types";

// providers
import { userContext } from "../user/user.provider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { loadingContext } from "../LoadingProvider/LoadingProvider";

// constants
import { PATHS } from "../paths.constants";

// schemas
import { eventSchema, resultEventsSchema } from "./EventsProvider.schemas";

type EventsContext = {
  eventsList: EventsType;
  eventsUserList: EventsType;
  addEvent: (newEvent: EventType) => Promise<void>;
  changeEvent: (changeEvent: EventType) => Promise<void>;
  deleteEvent: (idEvent: number, type?: "all" | "user") => Promise<boolean>;
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
  const { setLoading } = useContext(loadingContext);
  const [eventsList, setEventsList] = useState<EventsType>([]);
  const [eventsUserList, setEventsUserList] = useState<EventsType>([]);

  const getEvents = async () => {
    const result = await api(PATHS.eventsGet, null, resultEventsSchema);
    if (result?.events) setEventsList(result.events);
  };

  const getEventsUser = async () => {
    if (userData?.id) {
      const queryParams = qs.stringify(
        {
          userId: userData.id,
        },
        {
          addQueryPrefix: true,
        }
      );
      const result = await api(
        `${PATHS.eventsGetUserId}${queryParams}`,
        null,
        resultEventsSchema
      );
      if (result?.events) setEventsUserList(result.events);
    }
  };

  const addEvent = async (newEvent: EventType) => {
    setLoading(true);
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
      if (result?.event) {
        setEventsUserList((state) => [...state, result.event]);
        setEventsList((state) => [...state, result.event]);
      }
    }
    setLoading(false);
  };

  const changeEvent = async (changeEvent: EventType) => {
    setLoading(true);
    const result = await api(
      PATHS.eventChange,
      {
        method: "POST",
        data: changeEvent,
      },
      z.object({ event: eventSchema })
    );
    if (result?.event) {
      setEventsUserList((state) =>
        state.map((event) =>
          event.id === result.event.id ? result.event : event
        )
      );
      setEventsList((state) =>
        state.map((event) =>
          event.id === result.event.id ? result.event : event
        )
      );
    }
    setLoading(false);
  };

  const deleteEvent = async (
    idEvent: number,
    type: "all" | "user" = "all"
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const result = await api(
        PATHS.eventDelete,
        { method: "DELETE", data: { id: idEvent } },
        z.object({ result: z.boolean() })
      );
      if (result?.result) {
        setEventsList((state) => state.filter((event) => event.id !== idEvent));
        if (type === "user")
          setEventsUserList((state) =>
            state.filter((event) => event.id !== idEvent)
          );
      }

      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: EventsContext = useMemo(
    () => ({ eventsList, eventsUserList, addEvent, changeEvent, deleteEvent }),
    [eventsList, eventsUserList]
  );

  useEffect(() => {
    if (userData?.id) {
      getEvents();
      getEventsUser();
    }
  }, [userData?.id]);

  return (
    <eventsContext.Provider value={contextValue}>
      {children}
    </eventsContext.Provider>
  );
};
