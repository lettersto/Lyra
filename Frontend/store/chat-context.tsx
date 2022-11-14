import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import {Socket} from 'socket.io-client';
import {BuskerInfo} from '../constants/types';

export interface chatContextType {
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
  liveBusker: BuskerInfo[];
  setLiveBusker: Dispatch<SetStateAction<BuskerInfo[]>>;
}

export const ChatContext = createContext<chatContextType>({
  socket: null,
  setSocket: () => {},
  liveBusker: [],
  setLiveBusker: () => {},
});

export const ChatProvider = ({children}: {children: ReactNode}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [liveBusker, setLiveBusker] = useState<BuskerInfo[]>([]);

  const chatValue = useMemo(() => {
    return {
      socket,
      setSocket,
      liveBusker,
      setLiveBusker,
    };
  }, [socket, liveBusker]);

  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
};
