import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LOGIN, LANDING_PAGE, CHESS_GAME } from '../../routes/routes';
import Login from '../../pages/Login';
import LandingPage from '../../pages/LandingPage';
import Chessboard from '../chessboard/Chessboard';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route path={LANDING_PAGE} element={<LandingPage />} />
        <Route path={CHESS_GAME} element={<Chessboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default MainRouter