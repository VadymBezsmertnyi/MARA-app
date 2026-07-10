import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TUserState } from "./user.types";
import { RootState } from "../../store";
import { api } from "../../api";
import { saveTokens, deleteTokens } from "./user.helpers";

const initialState: TUserState = {
  userData: null,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    cleanUserData: (state) => {
      state.userData = null;
      deleteTokens().catch(() => {});
    },
  },
  extraReducers: (builder) => {
    builder
      // loginFacebook
      .addMatcher(api.endpoints.loginFacebook.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(
        api.endpoints.loginFacebook.matchFulfilled,
        (state, action) => {
          if (action.payload) {
            state.userData = action.payload.userData;
            if (action.payload.tokens)
              saveTokens(action.payload.tokens).catch(() => {});

            state.loading = false;
            state.error = null;
          } else {
            state.loading = false;
            state.error = "Помилка валідації даних від сервера (Facebook)";
          }
        }
      )
      .addMatcher(
        api.endpoints.loginFacebook.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Помилка входу через Facebook";
        }
      )
      // loginGoogle
      .addMatcher(api.endpoints.loginGoogle.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.loginGoogle.matchFulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload.userData;
          if (action.payload.tokens)
            saveTokens(action.payload.tokens).catch(() => {});

          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (Google)";
        }
      })
      .addMatcher(api.endpoints.loginGoogle.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка входу через Google";
      })
      // loginApple
      .addMatcher(api.endpoints.loginApple.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.loginApple.matchFulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload.userData;
          if (action.payload.tokens)
            saveTokens(action.payload.tokens).catch(() => {});

          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (Apple)";
        }
      })
      .addMatcher(api.endpoints.loginApple.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка входу через Apple";
      })
      // getMe
      .addMatcher(api.endpoints.getMe.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.getMe.matchFulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload.userData;
          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (getMe)";
        }
      })
      .addMatcher(api.endpoints.getMe.matchRejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Помилка отримання даних користувача";
      })
      // editUser
      .addMatcher(api.endpoints.editUser.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.editUser.matchFulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload.userData;
          if (action.payload.tokens)
            saveTokens(action.payload.tokens).catch(() => {});

          state.loading = false;
          state.error = null;
        } else {
          state.loading = false;
          state.error = "Помилка валідації даних від сервера (editUser)";
        }
      })
      .addMatcher(api.endpoints.editUser.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка редагування користувача";
      })
      // deleteUser
      .addMatcher(api.endpoints.deleteUser.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(api.endpoints.deleteUser.matchFulfilled, (state) => {
        state.userData = null;
        deleteTokens().catch(() => {});
        state.loading = false;
        state.error = null;
      })
      .addMatcher(api.endpoints.deleteUser.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Помилка видалення користувача";
      });
  },
});

export const { setUserData, cleanUserData } = userSlice.actions;

export const useUserSelector = () =>
  useSelector((state: RootState) => state.user);

export default userSlice.reducer;
