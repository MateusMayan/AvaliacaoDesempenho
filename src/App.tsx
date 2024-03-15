import React from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
