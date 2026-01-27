import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TEventsState, TEvents } from "./events.types";
import { RootState } from "../../store";
import { api } from "../../api";
import { getSortEvents } from "../../../providers/EventsProvider/EventsProvider.hooks";

const initialState: TEventsState = {
  eventsList: [],
  eventsUserList: [],
  loading: false,
  error: null,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEventsList: (state, action) => {
      state.eventsList = getSortEvents(action.payload);
    },
    setEventsUserList: (state, action) => {
      state.eventsUserList = getSortEvents(action.payload);
    },
    cleanEventsList: (state) => {
      state.eventsList = [];
    },
    cleanEventsUserList: (state) => {
      state.eventsUserList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // getEvents
      .addMatcher(api.endpoints.getEvents.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.getEvents.matchFulfilled, (state, action) => {
        if (action.payload?.events) {
          state.eventsList = getSortEvents(action.payload.events);
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (getEvents)";
        }
      })
      .addMatcher(api.endpoints.getEvents.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка отримання подій";
      })
      // getEventsUser
      .addMatcher(api.endpoints.getEventsUser.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.getEventsUser.matchFulfilled,
        (state, action) => {
          if (action.payload?.events) {
            state.eventsUserList = getSortEvents(action.payload.events);
            state.loading = false;
            state.error = null;
          } else {
            state.loading = false;
            state.error = "Помилка валідації даних від сервера (getEventsUser)";
          }
        }
      )
      .addMatcher(
        api.endpoints.getEventsUser.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message || "Помилка отримання подій користувача";
        }
      )
      // addEvent
      .addMatcher(api.endpoints.addEvent.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.addEvent.matchFulfilled, (state, action) => {
        if (action.payload?.event) {
          const newEvent = action.payload.event;
          state.eventsList = getSortEvents([...state.eventsList, newEvent]);
          state.eventsUserList = getSortEvents([
            ...state.eventsUserList,
            newEvent,
          ]);
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (addEvent)";
        }
      })
      .addMatcher(api.endpoints.addEvent.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка додавання події";
      })
      // changeEvent
      .addMatcher(api.endpoints.changeEvent.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.changeEvent.matchFulfilled, (state, action) => {
        if (action.payload?.event) {
          const updatedEvent = action.payload.event;
          state.eventsList = getSortEvents(
            state.eventsList.map((event) =>
              event._id === updatedEvent._id ? updatedEvent : event
            )
          );
          state.eventsUserList = getSortEvents(
            state.eventsUserList.map((event) =>
              event._id === updatedEvent._id ? updatedEvent : event
            )
          );
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (changeEvent)";
        }
      })
      .addMatcher(api.endpoints.changeEvent.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка редагування події";
      })
      // deleteEvent
      .addMatcher(api.endpoints.deleteEvent.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.deleteEvent.matchFulfilled, (state, action) => {
        if (action.payload?.result) {
          const eventId = action.meta.arg.originalArgs.body._id;
          state.eventsList = state.eventsList.filter(
            (event) => event._id !== eventId
          );
          state.eventsUserList = state.eventsUserList.filter(
            (event) => event._id !== eventId
          );
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (deleteEvent)";
        }
      })
      .addMatcher(api.endpoints.deleteEvent.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка видалення події";
      });
  },
});

export const {
  setEventsList,
  setEventsUserList,
  cleanEventsList,
  cleanEventsUserList,
} = eventsSlice.actions;

export const useEventsSelector = () =>
  useSelector((state: RootState) => state.events);

export default eventsSlice.reducer;
