import React from 'react';
import NavBar from './NavBar';
import AvaliaçãoGestão from './Avaliações/AvaliaçãoGestão';
import { Route, Routes } from 'react-router-dom';

const Main = () => {
  return (
    <main className="flex">
      <NavBar />
      <Routes>
        <Route path="/" element={<AvaliaçãoGestão />} />
      </Routes>
    </main>
  );
};

export default Main;
