import './App.css';
import Header from './Components/Header';
import LoginForm from './Components/LoginForm';

import Main from './Components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/account" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
