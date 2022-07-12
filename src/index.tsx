import React from 'react';
import ReactDOM from 'react-dom/client';
import { SocketProvider } from './context/SocketContext';
import './index.css'
import { AuthContextProvider } from './context/AuthContext/AuthContextProvider';
import MainRouter from './components/mainRouter/MainRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <AuthContextProvider>
    <SocketProvider>
      <MainRouter />
    </SocketProvider>
  </AuthContextProvider >


);


