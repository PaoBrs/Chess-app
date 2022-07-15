import React from 'react';
import { useSocket } from '../hooks/useSocket';
import { SocketContext } from './SocketCreateContext';

type Props = {
  children: React.ReactNode,
}

export const SocketProvider = ({ children }: Props) => {

  // const { socket, online } = useSocket('https://quiet-dusk-46720.herokuapp.com/');
  const { socket, online } = useSocket('http://localhost:8080');

  return (
    <SocketContext.Provider value={{ socket, online }
    }>
      {children}
    </SocketContext.Provider>
  )
}