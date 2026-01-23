import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import userSlice from "./apis/user/slice";
import eventsSlice from "./apis/events/slice";
import paymentSlice from "./apis/payment/slice";
import workshopsSlice from "./apis/workshops/slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import errorToastMiddleware from "./middleware/errorToast.middleware";
import loadWorkshopsMiddleware from "./middleware/loadWorkshops.middleware";

const reducer = {
  [api.reducerPath]: api.reducer,
  user: userSlice,
  events: eventsSlice,
  payment: paymentSlice,
  workshops: workshopsSlice,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(api.middleware)
      .concat(errorToastMiddleware.middleware)
      .concat(loadWorkshopsMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useRootSelector = useSelector<RootState>;
export const useRootDispatch = useDispatch<AppDispatch>;
