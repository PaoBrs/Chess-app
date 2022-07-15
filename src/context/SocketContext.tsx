import React from 'react';
import { useSocket } from '../hooks/useSocket';
import { SocketContext } from './SocketCreateContext';

type Props = {
  children: React.ReactNode,
}

const socketUrl = process.env.NODE_ENV === 'production' ?
  'https://quiet-dusk-46720.herokuapp.com/' : 'http://localhost:8080'

export const SocketProvider = ({ children }: Props) => {

  const { socket, online } = useSocket(socketUrl)

  return (
    <SocketContext.Provider value={{ socket, online }
    }>
      {children}
    </SocketContext.Provider>
  )
}