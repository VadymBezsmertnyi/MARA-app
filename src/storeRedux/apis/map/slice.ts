import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { api } from "../../api";
import { TMapCoordinates, TMapPointsResponse, TMapState } from "./map.types";

const initialState: TMapState = {
  location: null,
  userLocation: null,
  ipLocation: null,
  source: null,
  sources: [],
  mapPoints: null,
  mapPointsLoading: false,
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
      } else if (state.source === "user") {
        state.location = state.ipLocation;
        state.source = state.ipLocation ? "ip" : null;
      }
    },
    setIpLocation: (state, action: PayloadAction<TMapCoordinates | null>) => {
      state.ipLocation = action.payload;
      if (!state.userLocation && action.payload) {
        state.location = action.payload;
        state.source = "ip";
      } else if (
        !state.userLocation &&
        !action.payload &&
        state.source === "ip"
      ) {
        state.location = null;
        state.source = null;
      }
    },
    resetLocation: (state) => {
      state.location = null;
      state.userLocation = null;
      state.ipLocation = null;
      state.source = null;
      state.sources = [];
      state.mapPoints = null;
      state.mapPointsLoading = false;
      state.loading = false;
      state.error = null;
    },
    setMapPoints: (
      state,
      action: PayloadAction<TMapPointsResponse | null>
    ) => {
      state.mapPoints = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // getIpLocation
      .addMatcher(api.endpoints.getIpLocation.matchPending, (state) => {
        state.loading = true;
        state.error = null;
        if (!state.sources.includes("ip")) state.sources.push("ip");
      })
      .addMatcher(
        api.endpoints.getIpLocation.matchFulfilled,
        (state, action) => {
          state.sources = state.sources.filter((item) => item !== "ip");
          if (action.payload) {
            state.ipLocation = action.payload;
            if (!state.userLocation) {
              state.location = action.payload;
              state.source = "ip";
            }
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
          state.sources = state.sources.filter((item) => item !== "ip");
          state.loading = false;
          state.error =
            action.error.message || "Помилка отримання координат по IP";
        }
      )
      // getUserLocation
      .addMatcher(api.endpoints.getUserLocation.matchPending, (state) => {
        state.loading = true;
        state.error = null;
        if (!state.sources.includes("user")) state.sources.push("user");
      })
      .addMatcher(
        api.endpoints.getUserLocation.matchFulfilled,
        (state, action) => {
          state.sources = state.sources.filter((item) => item !== "user");
          if (action.payload) {
            state.userLocation = action.payload;
            state.location = action.payload;
            state.source = "user";
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
          state.sources = state.sources.filter((item) => item !== "user");
          state.loading = false;
          state.error =
            action.error.message || "Помилка отримання геолокації користувача";
        }
      )
      // getMapPoints
      .addMatcher(api.endpoints.getMapPoints.matchPending, (state) => {
        state.mapPointsLoading = true;
      })
      .addMatcher(
        api.endpoints.getMapPoints.matchFulfilled,
        (state, action) => {
          state.mapPointsLoading = false;
          state.mapPoints = action.payload;
        }
      )
      .addMatcher(api.endpoints.getMapPoints.matchRejected, (state) => {
        state.mapPointsLoading = false;
      });
  },
});

export const { setUserLocation, setIpLocation, resetLocation, setMapPoints } =
  mapSlice.actions;

export const useMapSelector = () =>
  useSelector((state: RootState) => state.map);

export default mapSlice.reducer;
