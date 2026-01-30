import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Location from "expo-location";

// redux
import { useUserSelector } from "../../storeRedux/apis/user/slice";
import { useMapSelector, setUserLocation } from "../../storeRedux/apis/map/slice";
import {
  useGetIpLocationQuery,
  useLazyGetUserLocationQuery,
  useOpenLocationSettingsMutation,
} from "../../storeRedux/api";
import { useRootDispatch } from "../../storeRedux/store";

// providers
import { usePermissionsProvider } from "../PermissionsProvider/PermissionsProvider";

// constants
import { TMapCoordinates } from "../../storeRedux/apis/map/map.types";

type MapContext = {
  location: TMapCoordinates | null;
  setPermission: () => Promise<void>;
};

type MapProviderProps = {
  children: React.ReactNode;
};

export const mapContext = React.createContext({} as MapContext);

const MapProvider: FunctionComponent<MapProviderProps> = ({ children }) => {
  const { userData } = useUserSelector();
  const { locationForegroundPermission } = usePermissionsProvider();
  const dispatch = useRootDispatch();
  const { location, ipLocation, userLocation } = useMapSelector();
  const [hasRequestedUserLocation, setHasRequestedUserLocation] =
    useState<boolean>(false);
  const [getUserLocation] = useLazyGetUserLocationQuery();
  const [openLocationSettings] = useOpenLocationSettingsMutation();

  useGetIpLocationQuery(undefined, { skip: Boolean(ipLocation) });

  const setPermission = async () => {
    await openLocationSettings().unwrap().catch(() => {});
  };

  const valueContext: MapContext = useMemo(
    () => ({ location, setPermission }),
    [location]
  );

  useEffect(() => {
    if (
      userData?.isGeoLocation &&
      locationForegroundPermission === Location.PermissionStatus.GRANTED &&
      !hasRequestedUserLocation &&
      userData?._id
    ) {
      setHasRequestedUserLocation(true);
      getUserLocation({ userId: userData._id });
    }
  }, [
    userData?.isGeoLocation,
    locationForegroundPermission,
    hasRequestedUserLocation,
    userData?._id,
    getUserLocation,
  ]);

  useEffect(() => {
    if (!userData?.isGeoLocation && userLocation)
      dispatch(setUserLocation(null));
    if (!userData?.isGeoLocation && hasRequestedUserLocation)
      setHasRequestedUserLocation(false);
  }, [userData?.isGeoLocation, userLocation, hasRequestedUserLocation, dispatch]);

  return (
    <mapContext.Provider value={valueContext}>{children}</mapContext.Provider>
  );
};

export const useMapProvider = () => useContext(mapContext);

export default MapProvider;
