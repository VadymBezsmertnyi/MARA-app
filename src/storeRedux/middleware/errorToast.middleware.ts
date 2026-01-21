import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import Toast from "react-native-toast-message";
import { api } from "../api";
import { globalI18n } from "../../../localization/i18n.global";

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
  effect: (action) => {
    const error = action.payload as
      | {
          status?: number;
          data?: unknown;
          error?: string;
        }
      | undefined;
    const errorWithMessage = action.error as
      | {
          message?: string;
        }
      | undefined;

    let errorMessage: string | undefined;
    if (error?.data && typeof error.data === "object") {
      if ("message" in error.data && typeof error.data.message === "string")
        errorMessage = error.data.message;
      else if ("error" in error.data && typeof error.data.error === "string")
        errorMessage = error.data.error;
    } else if (error?.error && typeof error.error === "string")
      errorMessage = error.error;
    else if (
      errorWithMessage &&
      "message" in errorWithMessage &&
      typeof errorWithMessage.message === "string"
    )
      errorMessage = errorWithMessage.message;

    const defaultErrorMessage = globalI18n._("Error executing request");
    Toast.show({
      type: "error",
      text1: globalI18n._("Error"),
      text2: errorMessage || defaultErrorMessage,
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
  effect: (action) => {
    if (!action.payload)
      Toast.show({
        type: "error",
        text1: globalI18n._("Validation error"),
        text2: globalI18n._(
          "Data from the server does not match the expected format"
        ),
      });
  },
});

export default errorToastMiddleware;
