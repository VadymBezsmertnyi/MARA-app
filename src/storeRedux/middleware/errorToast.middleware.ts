import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { api } from "../api";

const errorToastMiddleware = createListenerMiddleware();

errorToastMiddleware.startListening({
  matcher: isAnyOf(
    api.endpoints.loginFacebook.matchRejected,
    api.endpoints.loginGoogle.matchRejected,
    api.endpoints.loginApple.matchRejected,
    api.endpoints.getMe.matchRejected,
    api.endpoints.editUser.matchRejected,
    api.endpoints.deleteUser.matchRejected
  ),
  effect: (action: any) => {
    const error = action.payload as
      | {
          status?: number;
          data?: unknown;
          error?: string;
        }
      | undefined;

    let errorMessage = "Помилка виконання запиту";
    if (error?.data && typeof error.data === "object") {
      if ("message" in error.data && typeof error.data.message === "string")
        errorMessage = error.data.message;
      else if ("error" in error.data && typeof error.data.error === "string")
        errorMessage = error.data.error;
    } else if (error?.error && typeof error.error === "string")
      errorMessage = error.error;
    else if (
      "message" in action.error &&
      typeof action.error.message === "string"
    )
      errorMessage = action.error.message;
    Toast.show({
      type: "error",
      text1: "Помилка",
      text2: errorMessage,
    });
  },
});

errorToastMiddleware.startListening({
  matcher: isAnyOf(
    api.endpoints.loginFacebook.matchFulfilled,
    api.endpoints.loginGoogle.matchFulfilled,
    api.endpoints.loginApple.matchFulfilled,
    api.endpoints.getMe.matchFulfilled,
    api.endpoints.editUser.matchFulfilled
  ),
  effect: (action: any) => {
    if (!action.payload)
      Toast.show({
        type: "error",
        text1: "Помилка валідації",
        text2: "Дані від сервера не відповідають очікуваному формату",
      });
  },
});

export default errorToastMiddleware;
