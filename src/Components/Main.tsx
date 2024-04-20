import React from 'react';
import NavBar from './NavBar';
import AvaliacaoGestao from './Avaliações/AvaliaçaoGestao';
import { Route, Routes } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import AvaliacaoPessoal from './Avaliações/AvaliacaoPessoal';

const Main = () => {
  return (
    <main className="flex max-[500px]:flex-col">
      <NavBar />
      <Routes>
        <Route path="/" element={<AvaliacaoGestao />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/avaliacaoPessoal" element={<AvaliacaoPessoal />} />
      </Routes>
    </main>
  );
};

export default Main;
