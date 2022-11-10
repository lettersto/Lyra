import React, {
  createContext,
  useState,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import {Socket} from 'socket.io-client';
export interface chatContextType {
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
}

export const ChatContext = createContext<chatContextType>({
  socket: null,
  setSocket: () => {},
});

export const ChatProvider = ({children}: {children: ReactNode}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const chatValue = useMemo(() => {
    return {
      socket,
      setSocket,
    };
  }, [socket]);

  return (
    <ChatContext.Provider value={chatValue}>{children}</ChatContext.Provider>
  );
};
