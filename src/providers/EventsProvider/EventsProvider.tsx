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
import { EventType, UpcomingEvents } from "./EventsProvider.types";

// hooks
import { getSortEvents } from "./EventsProvider.hooks";

// providers
import { userContext } from "../UserProvider/UserProvider";
import { apiContext } from "../ApiProvider/ApiProvider";
import { loadingContext } from "../LoadingProvider/LoadingProvider";
import { localesContext } from "../../../localization/localization.provider";
import { analyticsContext } from "../AnalyticsProvider/AnalyticsProvider";

// components
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";

// helps
import showErrors from "../../helps/errors/showError";

// constants
import { PATHS } from "../paths.constants";

// schemas
import { eventSchema, resultEventsSchema } from "./EventsProvider.schemas";

type NewEventType = Omit<EventType, "_id" | "userId"> & { userId: string };
type ChangeEventType = Omit<EventType, "userId" | "likeUserIds"> & {
  userId: string;
  likeUserIds?: string[];
};

type EventsContext = {
  eventsList: UpcomingEvents;
  eventsUserList: UpcomingEvents;
  addEvent: (newEvent: NewEventType) => Promise<void>;
  changeEvent: (changeEvent: ChangeEventType) => Promise<void>;
  deleteEvent: (idEvent: string, type?: "all" | "user") => Promise<boolean>;
  setIdDeleteEvent: React.Dispatch<React.SetStateAction<string | null>>;
};

type EventsProviderType = {
  children: JSX.Element;
};

export const eventsContext = React.createContext({} as EventsContext);

export const EventsProvider: FunctionComponent<EventsProviderType> = ({
  children,
}) => {
  const { i18n } = useContext(localesContext);
  const { userData } = useContext(userContext);
  const { api } = useContext(apiContext);
  const { setLoading } = useContext(loadingContext);
  const { onSetUserProperties } = useContext(analyticsContext);
  const [eventsList, setEventsList] = useState<UpcomingEvents>([]);
  const [eventsUserList, setEventsUserList] = useState<UpcomingEvents>([]);
  const [idDeleteEvent, setIdDeleteEvent] = useState<string | null>(null);
  const { success } = showErrors;

  const getEvents = async () => {
    const result = await api(PATHS.eventsGet, null, resultEventsSchema);
    if (result?.events) setEventsList(getSortEvents(result.events));
  };

  const getEventsUser = async () => {
    if (userData?._id) {
      const queryParams = qs.stringify(
        {
          userId: userData._id,
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
      if (result?.events) setEventsUserList(getSortEvents(result.events));
    }
  };

  const addEvent = async (newEvent: NewEventType) => {
    setLoading(true);
    if (userData?._id) {
      const data = { ...newEvent, userId: userData._id };
      const result = await api(
        PATHS.eventAdd,
        {
          method: "POST",
          data,
        },
        z.object({ event: eventSchema })
      );
      if (result?.event) {
        setEventsUserList((state) => getSortEvents([...state, result.event]));
        setEventsList((state) => getSortEvents([...state, result.event]));
        await onSetUserProperties({
          amountEvents: (userData.eventsIds.length + 1).toString(),
        });
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
        getSortEvents(
          state.map((event) =>
            event._id === result.event._id ? result.event : event
          )
        )
      );
      setEventsList((state) =>
        getSortEvents(
          state.map((event) =>
            event._id === result.event._id ? result.event : event
          )
        )
      );
    }
    setLoading(false);
  };

  const deleteEvent = async (
    idEvent: string,
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
        setEventsList((state) =>
          state.filter((event) => event._id !== idEvent)
        );
        if (type === "user") {
          setEventsUserList((state) =>
            state.filter((event) => event._id !== idEvent)
          );
          if (userData && userData.eventsIds.length > 0)
            await onSetUserProperties({
              amountEvents: (userData.eventsIds.length - 1).toString(),
            });
        }
      }

      return true;
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const contextValue: EventsContext = useMemo(
    () => ({
      eventsList,
      eventsUserList,
      addEvent,
      changeEvent,
      deleteEvent,
      setIdDeleteEvent,
    }),
    [eventsList, eventsUserList]
  );

  useEffect(() => {
    if (userData?._id) {
      getEvents();
      getEventsUser();
    }
  }, [userData?._id]);

  return (
    <eventsContext.Provider value={contextValue}>
      {children}
      {idDeleteEvent !== null ? (
        <ModalDelete
          onSubmit={async () => {
            await deleteEvent(idDeleteEvent, "user");
            success(i18n._("Event delete"));
            setIdDeleteEvent(null);
          }}
          onClose={() => {
            setIdDeleteEvent(null);
          }}
        />
      ) : null}
    </eventsContext.Provider>
  );
};
