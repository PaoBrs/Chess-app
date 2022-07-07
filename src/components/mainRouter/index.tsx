import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { HOME, LOGIN, LANDING_PAGE } from '../../routes/routes';
import Login from '../../pages/Login';
import LandingPage from '../../pages/LandingPage';

const index = () => {
  return (
    <Routes>
      <Route path={LANDING_PAGE} element={<LandingPage />} />
    </Routes>
  )
}

export default index