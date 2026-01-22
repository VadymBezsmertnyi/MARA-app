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
import { useUserProvider } from "../UserProvider/UserProvider";
import { useApiProvider } from "../ApiProvider/ApiProvider";
import { useLoadingProvider } from "../LoadingProvider/LoadingProvider";
import { useLocalesProvider } from "../../../localization/localization.provider";
import { useAnalyticsProvider } from "../AnalyticsProvider/AnalyticsProvider";
import {
  DropdownAlertType,
  useDropDownAlertProvider,
} from "../DropDownAlertProvider/DropDownAlertProvider";

// components
import { ModalDelete } from "../../components/ModalDelete/ModalDelete";

// constants
import { PATHS } from "../paths.constants";

// schemas
import { eventSchema, resultEventsSchema } from "./EventsProvider.schemas";

type NewEventType = Omit<EventType, "_id" | "userId" | "likeUserIds"> & {
  userId: string;
  likeUserIds: string[];
};
type ChangeEventType = Omit<EventType, "userId" | "likeUserIds"> & {
  userId: string;
  likeUserIds: string[];
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
  children: React.ReactNode;
};

export const eventsContext = React.createContext({} as EventsContext);

const EventsProvider: FunctionComponent<EventsProviderType> = ({
  children,
}) => {
  const { messageFromServer } = useDropDownAlertProvider();
  const { i18n } = useLocalesProvider();
  const { userData, meUser } = useUserProvider();
  const { api } = useApiProvider();
  const { setLoading } = useLoadingProvider();
  const { onSetUserProperties } = useAnalyticsProvider();
  const [eventsList, setEventsList] = useState<UpcomingEvents>([]);
  const [eventsUserList, setEventsUserList] = useState<UpcomingEvents>([]);
  const [idDeleteEvent, setIdDeleteEvent] = useState<string | null>(null);

  const getEvents = async () => {
    const result = await api(PATHS.eventsGet, null, resultEventsSchema);
    if (result?.events) setEventsList(getSortEvents(result.events));
  };

  const getEventsUser = async () => {
    if (userData?._id) {
      const queryParams = qs.stringify(
        { userId: userData._id },
        { addQueryPrefix: true }
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
      const formData = new FormData();
      const newImageFiles =
        newEvent.imageFiles?.filter(
          (img) =>
            img.url &&
            (img.url.includes("data:image") ||
              img.url.includes("file://") ||
              img.url.startsWith("file://"))
        ) || [];
      const existingImageFiles =
        newEvent.imageFiles?.filter(
          (img) =>
            img.url &&
            img._id &&
            !img.url.includes("data:image") &&
            !img.url.includes("file://") &&
            !img.url.startsWith("file://")
        ) || [];
      newImageFiles.forEach((img, index) => {
        if (
          img.url &&
          (img.url.includes("file://") || img.url.startsWith("file://"))
        ) {
          const fileExtension = img.url.split(".").pop() || "jpg";
          const fileName = `image_${index}.${fileExtension}`;
          formData.append("imageFiles", {
            uri: img.url,
            type: "image/jpeg",
            name: fileName,
          } as any);
        }
      });
      Object.keys(newEvent).forEach((key) => {
        if (key !== "imageFiles") {
          const value = newEvent[key as keyof typeof newEvent];
          if (value !== undefined && value !== null) {
            if (
              typeof value === "object" &&
              !Array.isArray(value) &&
              !(value instanceof Date)
            )
              formData.append(key, JSON.stringify(value));
            else if (Array.isArray(value))
              formData.append(key, JSON.stringify(value));
            else formData.append(key, String(value));
          }
        }
      });
      if (existingImageFiles.length > 0)
        formData.append(
          "existingImages",
          JSON.stringify(
            existingImageFiles.map((img) => ({
              _id: img._id,
              url: img.url,
            }))
          )
        );
      formData.set("userId", userData._id);

      const result = await api(
        PATHS.eventAdd,
        {
          method: "POST",
          data: formData,
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
    meUser(false);
    setLoading(false);
  };

  const changeEvent = async (changeEvent: ChangeEventType) => {
    setLoading(true);
    const formData = new FormData();
    const newImageFiles =
      changeEvent.imageFiles?.filter(
        (img) =>
          img.url &&
          (img.url.includes("data:image") ||
            img.url.includes("file://") ||
            img.url.startsWith("file://"))
      ) || [];
    const existingImageFiles =
      changeEvent.imageFiles?.filter(
        (img) =>
          img.url &&
          img._id &&
          !img.url.includes("data:image") &&
          !img.url.includes("file://") &&
          !img.url.startsWith("file://")
      ) || [];
    newImageFiles.forEach((img, index) => {
      if (
        img.url &&
        (img.url.includes("file://") || img.url.startsWith("file://"))
      ) {
        const fileExtension = img.url.split(".").pop() || "jpg";
        const fileName = `image_${index}.${fileExtension}`;
        formData.append("imageFiles", {
          uri: img.url,
          type: "image/jpeg",
          name: fileName,
        } as any);
      }
    });
    Object.keys(changeEvent).forEach((key) => {
      if (key !== "imageFiles") {
        const value = (changeEvent as any)[key];
        if (value !== undefined && value !== null) {
          if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            !(value instanceof Date)
          )
            formData.append(key, JSON.stringify(value));
          else if (Array.isArray(value))
            formData.append(key, JSON.stringify(value));
          else formData.append(key, String(value));
        }
      }
    });

    if (existingImageFiles.length > 0) {
      formData.append(
        "existingImages",
        JSON.stringify(
          existingImageFiles.map((img) => ({
            _id: img._id,
            url: img.url,
          }))
        )
      );
    }

    const result = await api(
      PATHS.eventChange,
      {
        method: "POST",
        data: formData,
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
    meUser(false);
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
        { method: "DELETE", data: { _id: idEvent } },
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

      meUser(false);
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
            messageFromServer(
              i18n._("Event delete"),
              i18n._("Success"),
              DropdownAlertType.Success
            );
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

export const useEventsProvider = () => useContext(eventsContext);

export default EventsProvider;
