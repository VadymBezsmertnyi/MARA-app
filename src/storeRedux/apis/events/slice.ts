import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TEventsState, TEvents } from "./events.types";
import { RootState } from "../../store";
import { api } from "../../api";
import { getSortEvents } from "./events.helpers";

const initialState: TEventsState = {
  eventsList: [],
  eventsUserList: [],
  pagination: null,
  paginationUser: null,
  maxDistance: 5,
  maxDistanceUser: 5,
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
          const currentPage = action.payload.pagination?.page || 1;
          if (currentPage === 1)
            state.eventsList = getSortEvents(action.payload.events);
          else {
            const existingIds = new Set(state.eventsList.map((e) => e._id));
            const newEvents = action.payload.events.filter(
              (e) => !existingIds.has(e._id)
            );
            state.eventsList = getSortEvents([
              ...state.eventsList,
              ...newEvents,
            ]);
          }
          state.pagination = action.payload.pagination || null;
          state.maxDistance = action.payload.maxDistance || 5;
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
            state.paginationUser = action.payload.pagination || null;
            state.maxDistanceUser = action.payload.maxDistance || 5;
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
          const existingIndex = state.eventsList.findIndex(
            (event) => event._id === newEvent._id
          );
          const nextEventsList =
            existingIndex >= 0
              ? state.eventsList.map((event) =>
                  event._id === newEvent._id ? newEvent : event
                )
              : [...state.eventsList, newEvent];
          state.eventsList = getSortEvents(nextEventsList);

          const existingUserIndex = state.eventsUserList.findIndex(
            (event) => event._id === newEvent._id
          );
          const nextEventsUserList =
            existingUserIndex >= 0
              ? state.eventsUserList.map((event) =>
                  event._id === newEvent._id ? newEvent : event
                )
              : [...state.eventsUserList, newEvent];
          state.eventsUserList = getSortEvents(nextEventsUserList);
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
          const existingIndex = state.eventsList.findIndex(
            (event) => event._id === updatedEvent._id
          );
          const nextEventsList =
            existingIndex >= 0
              ? state.eventsList.map((event) =>
                  event._id === updatedEvent._id ? updatedEvent : event
                )
              : [...state.eventsList, updatedEvent];
          state.eventsList = getSortEvents(nextEventsList);

          const existingUserIndex = state.eventsUserList.findIndex(
            (event) => event._id === updatedEvent._id
          );
          const nextEventsUserList =
            existingUserIndex >= 0
              ? state.eventsUserList.map((event) =>
                  event._id === updatedEvent._id ? updatedEvent : event
                )
              : [...state.eventsUserList, updatedEvent];
          state.eventsUserList = getSortEvents(nextEventsUserList);
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
      })
      // getClosestEvents
      .addMatcher(api.endpoints.getClosestEvents.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.getClosestEvents.matchFulfilled,
        (state, action) => {
          if (action.payload?.upcomingAndCurrent || action.payload?.past) {
            state.loading = false;
            state.error = null;
          } else {
            state.loading = false;
            state.error =
              "Помилка валідації даних від сервера (getClosestEvents)";
          }
        }
      )
      .addMatcher(
        api.endpoints.getClosestEvents.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message || "Помилка отримання найближчих подій";
        }
      );
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
