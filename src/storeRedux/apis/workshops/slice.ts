import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TWorkshopsState, TWorkshops } from "./workshops.types";
import { RootState } from "../../store";
import { api } from "../../api";
import { WorkshopsType } from "../../../providers/WorkshopsProvider/WorkshopsProvider.types";

const initialState: TWorkshopsState = {
  workshopsList: [],
  workshopsUserList: [],
  loading: false,
  error: null,
};

export const workshopsSlice = createSlice({
  name: "workshops",
  initialState,
  reducers: {
    setWorkshopsList: (state, action) => {
      state.workshopsList = action.payload;
    },
    setWorkshopsUserList: (state, action) => {
      state.workshopsUserList = action.payload;
    },
    cleanWorkshopsList: (state) => {
      state.workshopsList = [];
    },
    cleanWorkshopsUserList: (state) => {
      state.workshopsUserList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(api.endpoints.getWorkshops.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.getWorkshops.matchFulfilled, (state, action) => {
        if (action.payload?.workshops) {
          state.workshopsList = action.payload.workshops as WorkshopsType;
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (getWorkshops)";
        }
      })
      .addMatcher(api.endpoints.getWorkshops.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка отримання майстерень";
      })
      .addMatcher(api.endpoints.getWorkshopsUser.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.getWorkshopsUser.matchFulfilled,
        (state, action) => {
          if (action.payload?.workshops) {
            state.workshopsUserList = action.payload.workshops as WorkshopsType;
            state.loading = false;
            state.error = null;
          } else {
            state.loading = false;
            state.error = "Помилка валідації даних від сервера (getWorkshopsUser)";
          }
        }
      )
      .addMatcher(
        api.endpoints.getWorkshopsUser.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message || "Помилка отримання майстерень користувача";
        }
      )
      .addMatcher(api.endpoints.addWorkshop.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.addWorkshop.matchFulfilled, (state, action) => {
        if (action.payload?.workshop) {
          const newWorkshop = action.payload.workshop;
          state.workshopsList = [
            ...(state.workshopsList as WorkshopsType),
            newWorkshop,
          ];
          state.workshopsUserList = [
            ...(state.workshopsUserList as WorkshopsType),
            newWorkshop,
          ];
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (addWorkshop)";
        }
      })
      .addMatcher(api.endpoints.addWorkshop.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка додавання майстерні";
      })
      .addMatcher(api.endpoints.changeWorkshop.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.changeWorkshop.matchFulfilled, (state, action) => {
        if (action.payload?.workshop) {
          const updatedWorkshop = action.payload.workshop;
          state.workshopsList = (state.workshopsList as WorkshopsType).map(
            (workshop) =>
              workshop._id === updatedWorkshop._id ? updatedWorkshop : workshop
          );
          state.workshopsUserList = (
            state.workshopsUserList as WorkshopsType
          ).map((workshop) =>
            workshop._id === updatedWorkshop._id ? updatedWorkshop : workshop
          );
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (changeWorkshop)";
        }
      })
      .addMatcher(api.endpoints.changeWorkshop.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка редагування майстерні";
      })
      .addMatcher(api.endpoints.deleteWorkshop.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.deleteWorkshop.matchFulfilled, (state, action) => {
        if (action.payload?.result) {
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (deleteWorkshop)";
        }
      })
      .addMatcher(api.endpoints.deleteWorkshop.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка видалення майстерні";
      })
      .addMatcher(api.endpoints.addComment.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.addComment.matchFulfilled, (state, action) => {
        if (action.payload?.workshop) {
          const updatedWorkshop = action.payload.workshop;
          state.workshopsList = (state.workshopsList as WorkshopsType).map(
            (workshop) =>
              workshop._id === updatedWorkshop._id ? updatedWorkshop : workshop
          );
          state.workshopsUserList = (
            state.workshopsUserList as WorkshopsType
          ).map((workshop) =>
            workshop._id === updatedWorkshop._id ? updatedWorkshop : workshop
          );
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (addComment)";
        }
      })
      .addMatcher(api.endpoints.addComment.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка додавання коментаря";
      })
      .addMatcher(api.endpoints.changeComment.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.changeComment.matchFulfilled, (state, action) => {
        if (action.payload?.workshop) {
          const updatedWorkshop = action.payload.workshop;
          state.workshopsList = (state.workshopsList as WorkshopsType).map(
            (workshop) =>
              workshop._id === updatedWorkshop._id ? updatedWorkshop : workshop
          );
          state.workshopsUserList = (
            state.workshopsUserList as WorkshopsType
          ).map((workshop) =>
            workshop._id === updatedWorkshop._id ? updatedWorkshop : workshop
          );
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (changeComment)";
        }
      })
      .addMatcher(api.endpoints.changeComment.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка редагування коментаря";
      });
  },
});

export const {
  setWorkshopsList,
  setWorkshopsUserList,
  cleanWorkshopsList,
  cleanWorkshopsUserList,
} = workshopsSlice.actions;

export const useWorkshopsSelector = () =>
  useSelector((state: RootState) => state.workshops);

export default workshopsSlice.reducer;
