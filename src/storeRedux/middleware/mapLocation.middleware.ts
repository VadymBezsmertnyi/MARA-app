import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import * as Location from "expo-location";
import { api } from "../api";
import { RootState } from "../store";

const mapLocationMiddleware = createListenerMiddleware();

const ensureMapLocation = async (listenerApi: {
  getState: () => unknown;
  dispatch: (action: any) => any;
}) => {
  const state = listenerApi.getState() as RootState;
  const userData = state.user?.userData;
  const mapState = state.map;
  if (!userData?._id) return;
  if (!mapState?.ipLocation)
    await listenerApi
      .dispatch(
        api.endpoints.getIpLocation.initiate(undefined, { forceRefetch: true })
      )
      .unwrap()
      .catch((error: any) => {
        console.warn("Failed to get IP location:", error);
      });

  const { status } = await Location.getForegroundPermissionsAsync();
  if (status !== Location.PermissionStatus.GRANTED) return;
  if (!userData.isGeoLocation) return;

  const nextState = listenerApi.getState() as RootState;
  if (!nextState.map?.userLocation)
    listenerApi
      .dispatch(
        api.endpoints.getUserLocation.initiate(
          { userId: userData._id },
          { forceRefetch: true }
        )
      )
      .unwrap()
      .catch((error: any) => {
        console.warn("Failed to get user location:", error);
      });
};

mapLocationMiddleware.startListening({
  matcher: isAnyOf(
    api.endpoints.loginFacebook.matchFulfilled,
    api.endpoints.loginGoogle.matchFulfilled,
    api.endpoints.loginApple.matchFulfilled,
    api.endpoints.getMe.matchFulfilled,
    api.endpoints.editUser.matchFulfilled
  ),
  effect: async (_action, listenerApi) => {
    await ensureMapLocation(listenerApi);
  },
});

export default mapLocationMiddleware;
