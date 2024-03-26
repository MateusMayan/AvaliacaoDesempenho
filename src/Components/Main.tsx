import React from 'react';
import NavBar from './NavBar';
import AvaliacaoGestao from './Avaliações/AvaliaçaoGestao';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './RegisterForm';

const Main = () => {
  return (
    <main className="flex max-[500px]:flex-col">
      <NavBar />
      <Routes>
        <Route path="/" element={<AvaliacaoGestao />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </main>
  );
};

export default Main;
