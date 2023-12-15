import React, { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react';
import { userContext } from '../user/user.provider';
import * as Location from 'expo-location';

// providers
import { webSocketContext } from '../WebSocketProvider/WebSocketProvider';

type MapContext = {
  location: Location.LocationObjectCoords | null;
};

type MapProviderProps = {
  children: React.ReactNode;
};

const INTERVAL_GET_LOCATION = 15000;

export const mapContext = React.createContext({} as MapContext);

export const MapProvider: FunctionComponent<MapProviderProps> = ({ children }) => {
  const { userData } = useContext(userContext);
  const { sendLocation } = useContext(webSocketContext);
  const [status, setStatus] = useState<Location.PermissionStatus | null>(null);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [startGetGeolocation, setStartGetGeolocation] = useState<boolean>(false);

  const getStatusApp = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setStatus(status);
  };

  const checkPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setStatus(status);

    if (status === 'granted') {
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    }
  };

  const getLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
    sendLocation(coords);
    // TODO send to DB
  };

  const valueContext: MapContext = useMemo(() => ({ location }), [location]);

  useEffect(() => {
    if (userData?.isGeoLocation) getStatusApp();
  }, [userData?.isGeoLocation]);

  useEffect(() => {
    if (!userData?.accessLocations && status === 'undetermined') checkPermission();
    if (status === 'granted' && !startGetGeolocation) {
      const intervalId = setInterval(getLocation, INTERVAL_GET_LOCATION);
      setStartGetGeolocation(true);
      getLocation();
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [status]);

  return <mapContext.Provider value={valueContext}>{children}</mapContext.Provider>;
};
