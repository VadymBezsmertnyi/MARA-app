import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TEventsState, TEvents } from "./events.types";
import { RootState } from "../../store";
import { api } from "../../api";
import { getSortEvents } from "./events.helpers";

const initialState: TEventsState = {
  upcomingEventsList: [],
  pastEventsList: [],
  eventsUserList: [],
  upcomingClosest: [],
  pastClosest: [],
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
    setEventsUserList: (state, action) => {
      state.eventsUserList = getSortEvents(action.payload);
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
          const eventStatus =
            action.meta.arg.originalArgs?.eventStatus === "past"
              ? "past"
              : "upcoming";
          const currentPage = action.payload.pagination?.page || 1;
          if (eventStatus === "past") {
            if (currentPage === 1)
              state.pastEventsList = getSortEvents(action.payload.events);
            else {
              const existingIds = new Set(
                state.pastEventsList.map((event) => event._id)
              );
              const newEvents = action.payload.events.filter(
                (event) => !existingIds.has(event._id)
              );
              state.pastEventsList = getSortEvents([
                ...state.pastEventsList,
                ...newEvents,
              ]);
            }
          } else {
            if (currentPage === 1)
              state.upcomingEventsList = getSortEvents(action.payload.events);
            else {
              const existingIds = new Set(
                state.upcomingEventsList.map((event) => event._id)
              );
              const newEvents = action.payload.events.filter(
                (event) => !existingIds.has(event._id)
              );
              state.upcomingEventsList = getSortEvents([
                ...state.upcomingEventsList,
                ...newEvents,
              ]);
            }
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
          if (action.error?.name === "ConditionError") return;
          state.loading = false;
          state.error =
            action.error.message || "Помилка отримання подій користувача";
        }
      )
      // getEventById
      .addMatcher(api.endpoints.getEventById.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.getEventById.matchFulfilled,
        (state, action) => {
          if (action.payload?.event) {
            const event = action.payload.event;
            const isPast = event.date.finish < Date.now();
            const updateList = (list: TEvents) =>
              list.some((item) => item._id === event._id)
                ? list.map((item) => (item._id === event._id ? event : item))
                : [...list, event];
            if (isPast)
              state.pastEventsList = getSortEvents(
                updateList(state.pastEventsList)
              );
            else
              state.upcomingEventsList = getSortEvents(
                updateList(state.upcomingEventsList)
              );

            const existingUserIndex = state.eventsUserList.findIndex(
              (item) => item._id === event._id
            );
            const nextEventsUserList =
              existingUserIndex >= 0
                ? state.eventsUserList.map((item) =>
                    item._id === event._id ? event : item
                  )
                : state.eventsUserList;
            state.eventsUserList = getSortEvents(nextEventsUserList);
            state.loading = false;
            state.error = null;
          } else {
            state.loading = false;
            state.error = "Помилка валідації даних від сервера (getEventById)";
          }
        }
      )
      .addMatcher(api.endpoints.getEventById.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка отримання події по id";
      })
      // addEvent
      .addMatcher(api.endpoints.addEvent.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.addEvent.matchFulfilled, (state, action) => {
        if (action.payload?.event) {
          const newEvent = action.payload.event;
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
          const nowTime = Date.now();
          const isUpcoming = newEvent.date.finish >= nowTime;
          if (isUpcoming) {
            const filtered = state.upcomingClosest.filter(
              (event) => event._id !== newEvent._id
            );
            state.upcomingClosest = getSortEvents([
              newEvent,
              ...filtered,
            ]).slice(0, 3);
          }
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
          const nowTime = Date.now();
          const isUpcoming = updatedEvent.date.finish >= nowTime;
          if (isUpcoming) {
            const filtered = state.upcomingClosest.filter(
              (event) => event._id !== updatedEvent._id
            );
            state.upcomingClosest = getSortEvents([
              updatedEvent,
              ...filtered,
            ]).slice(0, 3);
          } else {
            state.upcomingClosest = state.upcomingClosest.filter(
              (event) => event._id !== updatedEvent._id
            );
          }
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
          state.upcomingEventsList = state.upcomingEventsList.filter(
            (event) => event._id !== eventId
          );
          state.pastEventsList = state.pastEventsList.filter(
            (event) => event._id !== eventId
          );
          state.eventsUserList = state.eventsUserList.filter(
            (event) => event._id !== eventId
          );
          state.upcomingClosest = state.upcomingClosest.filter(
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
      // addComment
      .addMatcher(api.endpoints.addEventComment.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.addEventComment.matchFulfilled,
        (state, action) => {
          if (action.payload?.event) {
            const updatedEvent = action.payload.event;
            const updateList = (list: TEvents) =>
              list.map((event) =>
                event._id === updatedEvent._id ? updatedEvent : event
              );
            state.upcomingEventsList = getSortEvents(
              updateList(state.upcomingEventsList)
            );
            state.pastEventsList = getSortEvents(
              updateList(state.pastEventsList)
            );
            state.eventsUserList = getSortEvents(
              updateList(state.eventsUserList)
            );
            state.upcomingClosest = getSortEvents(
              updateList(state.upcomingClosest)
            ).slice(0, 3);
            state.pastClosest = getSortEvents(updateList(state.pastClosest));
            state.loading = false;
            state.error = null;
          } else {
            state.loading = false;
            state.error = "Помилка валідації даних від сервера (addComment)";
          }
        }
      )
      .addMatcher(
        api.endpoints.addEventComment.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Помилка додавання коментаря";
        }
      )
      // changeComment
      .addMatcher(api.endpoints.changeEventComment.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.changeEventComment.matchFulfilled,
        (state, action) => {
          if (action.payload?.event) {
            const updatedEvent = action.payload.event;
            const updateList = (list: TEvents) =>
              list.map((event) =>
                event._id === updatedEvent._id ? updatedEvent : event
              );
            state.upcomingEventsList = getSortEvents(
              updateList(state.upcomingEventsList)
            );
            state.pastEventsList = getSortEvents(
              updateList(state.pastEventsList)
            );
            state.eventsUserList = getSortEvents(
              updateList(state.eventsUserList)
            );
            state.upcomingClosest = getSortEvents(
              updateList(state.upcomingClosest)
            ).slice(0, 3);
            state.pastClosest = getSortEvents(updateList(state.pastClosest));
            state.loading = false;
            state.error = null;
          } else {
            state.loading = false;
            state.error = "Помилка валідації даних від сервера (changeComment)";
          }
        }
      )
      .addMatcher(
        api.endpoints.changeEventComment.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Помилка редагування коментаря";
        }
      )
      // getClosestEvents
      .addMatcher(api.endpoints.getClosestEvents.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.getClosestEvents.matchFulfilled,
        (state, action) => {
          if (action.payload?.upcomingAndCurrent || action.payload?.past) {
            state.upcomingClosest = action.payload?.upcomingAndCurrent || [];
            state.pastClosest = action.payload?.past || [];
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

export const { setEventsUserList, cleanEventsUserList } = eventsSlice.actions;

export const useEventsSelector = () =>
  useSelector((state: RootState) => state.events);

export default eventsSlice.reducer;
