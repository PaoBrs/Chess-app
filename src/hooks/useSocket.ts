import { useMemo, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from './interfaces';


export const useSocket = (serverPath: string) => {


  const socket = useMemo(() => {
    const socketClient: Socket<ServerToClientEvents, ClientToServerEvents> = io(serverPath);
    return socketClient.connect()
  }, [serverPath]);

  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket])

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    })

  }, [socket])

  useEffect(() => {

    socket.on('disconnect', () => {
      setOnline(false);
    })

  }, [socket])

  return {
    socket,
    online
  }
}