import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { api } from "../../api";
import { TMapCoordinates, TMapState } from "./map.types";

const initialState: TMapState = {
  location: null,
  userLocation: null,
  ipLocation: null,
  source: null,
  sources: [],
  loading: false,
  error: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setUserLocation: (state, action: PayloadAction<TMapCoordinates | null>) => {
      state.userLocation = action.payload;
      if (action.payload) {
        state.location = action.payload;
        state.source = "user";
        if (!state.sources.includes("user")) state.sources.push("user");
      } else if (state.source === "user") {
        state.location = state.ipLocation;
        state.source = state.ipLocation ? "ip" : null;
        state.sources = state.sources.filter((item) => item !== "user");
      }
    },
    setIpLocation: (state, action: PayloadAction<TMapCoordinates | null>) => {
      state.ipLocation = action.payload;
      if (!state.userLocation && action.payload) {
        state.location = action.payload;
        state.source = "ip";
        if (!state.sources.includes("ip")) state.sources.push("ip");
      } else if (
        !state.userLocation &&
        !action.payload &&
        state.source === "ip"
      ) {
        state.location = null;
        state.source = null;
        state.sources = state.sources.filter((item) => item !== "ip");
      }
    },
    resetLocation: (state) => {
      state.location = null;
      state.userLocation = null;
      state.ipLocation = null;
      state.source = null;
      state.sources = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // getIpLocation
      .addMatcher(api.endpoints.getIpLocation.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.getIpLocation.matchFulfilled,
        (state, action) => {
          if (action.payload) {
            state.ipLocation = action.payload;
            if (!state.userLocation) {
              state.location = action.payload;
              state.source = "ip";
            }
            if (!state.sources.includes("ip")) state.sources.push("ip");

            state.loading = false;
            state.error = null;
          } else {
            state.loading = false;
            state.error = "Помилка валідації даних від сервера (getIpLocation)";
          }
        }
      )
      .addMatcher(
        api.endpoints.getIpLocation.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message || "Помилка отримання координат по IP";
        }
      )
      // getUserLocation
      .addMatcher(api.endpoints.getUserLocation.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.getUserLocation.matchFulfilled,
        (state, action) => {
          if (action.payload) {
            state.userLocation = action.payload;
            state.location = action.payload;
            state.source = "user";
            if (!state.sources.includes("user")) state.sources.push("user");

            state.loading = false;
            state.error = null;
          } else {
            state.loading = false;
            state.error =
              "Помилка валідації даних від сервера (getUserLocation)";
          }
        }
      )
      .addMatcher(
        api.endpoints.getUserLocation.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message || "Помилка отримання геолокації користувача";
        }
      );
  },
});

export const { setUserLocation, setIpLocation, resetLocation } =
  mapSlice.actions;

export const useMapSelector = () =>
  useSelector((state: RootState) => state.map);

export default mapSlice.reducer;
