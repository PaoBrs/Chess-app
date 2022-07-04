import { ServerToClientEvents, ClientToServerEvents } from '../hooks/interfaces';
import { Socket } from 'socket.io-client';
import { createContext } from 'react';

export interface ContextProps {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  online: boolean
}

export const SocketContext = createContext({} as ContextProps);