import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { api } from "../api";
import { RootState } from "../store";

const loadWorkshopsMiddleware = createListenerMiddleware();

loadWorkshopsMiddleware.startListening({
  matcher: isAnyOf(
    api.endpoints.loginFacebook.matchFulfilled,
    api.endpoints.loginGoogle.matchFulfilled,
    api.endpoints.loginApple.matchFulfilled,
    api.endpoints.getMe.matchFulfilled,
    api.endpoints.editUser.matchFulfilled
  ),
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const userData = state.user?.userData;
    const workshops = state.workshops?.workshopsList || [];

    if (userData && workshops.length === 0)
      listenerApi.dispatch(
        api.endpoints.getWorkshops.initiate({}, { forceRefetch: true })
      );
  },
});

export default loadWorkshopsMiddleware;
