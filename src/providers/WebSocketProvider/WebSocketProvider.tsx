import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from 'react';
import { UserDataT } from '../user/user.types';
import { z } from 'zod';

type WebSocketProviderType = {
  children: JSX.Element;
};

type WebSocketContext = {
  stateSocket: StateType;
  setUserData: React.Dispatch<React.SetStateAction<UserDataT | null>>;
};

const stateSchema = z.object({
  currentTime: z.string(),
  connection: z.boolean(),
  userIdDB: z.number().nullable(),
});

type StateType = z.infer<typeof stateSchema>;

const DEFAULT_STATE_SOCKET = {
  currentTime: '',
  connection: false,
  userIdDB: null,
};

export const webSocketContext = React.createContext({} as WebSocketContext);

export const WebSocketProvider: FunctionComponent<WebSocketProviderType> = ({ children }) => {
  const [userData, setUserData] = useState<UserDataT | null>(null);
  const [stateSocket, setStateSocket] = useState<StateType>(DEFAULT_STATE_SOCKET);
  const socketRef = useRef<WebSocket | null>(null);
  const api = 'https://websocket-m-a-r-a-38bc1d2f770c.herokuapp.com';
  const HOST = api.replace(/^http/, 'ws');

  const connectToWebSocket = () => {
    socketRef.current = new WebSocket(HOST);
    socketRef.current.onopen = () => {
      // connection opened
      socketRef.current?.send(JSON.stringify(userData));
    };

    socketRef.current.onmessage = e => {
      // a message was received
      const result = stateSchema.safeParse(JSON.parse(e.data as string));
      if (result.success) setStateSocket(result.data);
    };

    socketRef.current.onerror = e => {
      // an error occurred
      console.log('', e);
    };

    socketRef.current.onclose = e => {
      // connection closed
      console.log(e.code, e.reason);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  };

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
    () => ({ stateSocket, setUserData }),
    [stateSocket],
  );

  return <webSocketContext.Provider value={contextValue}>{children}</webSocketContext.Provider>;
};
