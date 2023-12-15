import React, { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UserDataT } from '../user/user.types';
import { z } from 'zod';
import { LocationObjectCoords } from 'expo-location';
import { stateSchema } from './WebSocketProvider.schemas';

type WebSocketProviderType = {
  children: JSX.Element;
};

type WebSocketContext = {
  stateSocket: StateType;
  setUserData: React.Dispatch<React.SetStateAction<UserDataT | null>>;
  sendLocation: (geoLocationUser: LocationObjectCoords) => void;
};

type StateType = z.infer<typeof stateSchema>;

const DEFAULT_STATE_SOCKET: StateType = {
  currentTime: '',
  connection: false,
  userIdDB: null,
  geolocationUsers: null,
};

export const webSocketContext = React.createContext({} as WebSocketContext);

export const WebSocketProvider: FunctionComponent<WebSocketProviderType> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataT | null>(null);
  const [stateSocket, setStateSocket] = useState<StateType>(DEFAULT_STATE_SOCKET);
  const socketRef = useRef<WebSocket | null>(null);
  const apiLocal = 'ws://192.168.50.62:8080';
  const api = 'https://websocket-m-a-r-a-38bc1d2f770c.herokuapp.com';
  const HOST = api.replace(/^http/, 'ws');

  const connectToWebSocket = () => {
    socketRef.current = new WebSocket(HOST);
    socketRef.current.onopen = () => {
      if (userData) {
        const data = {
          type: 'userData',
          userData,
        };
        socketRef.current?.send(JSON.stringify(data));
      }
    };

    socketRef.current.onmessage = e => {
      const result = stateSchema.safeParse(JSON.parse(e.data as string));
      if (result.success) setStateSocket(result.data);
    };

    socketRef.current.onerror = e => {
      // an error occurred
      console.log('error', e);
    };

    socketRef.current.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
      setStateSocket(DEFAULT_STATE_SOCKET);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  };

  const sendLocation = useCallback(
    (geoLocationUser: LocationObjectCoords) => {
      const date = new Date().getTime();

      if (userData && socketRef.current?.readyState === WebSocket.OPEN) {
        const dataLocationUser = {
          type: 'geoLocation',
          userId: userData.id,
          geoLocation: geoLocationUser,
          date,
        };
        socketRef.current?.send(JSON.stringify(dataLocationUser));
      }
    },
    [userData],
  );

  useEffect(() => {
    if (userData?.id) connectToWebSocket();
    else if (socketRef.current?.readyState === WebSocket.OPEN)
      socketRef.current.onclose = e => {
        // connection closed
        console.log(e.code, e.reason);
        setStateSocket(DEFAULT_STATE_SOCKET);
      };
  }, [userData?.id]);

  const contextValue: WebSocketContext = useMemo(
    () => ({ stateSocket, setUserData, sendLocation }),
    [stateSocket, sendLocation],
  );

  return <webSocketContext.Provider value={contextValue}>{children}</webSocketContext.Provider>;
};
