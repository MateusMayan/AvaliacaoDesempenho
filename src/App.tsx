import Header from './Components/Header';
import LoginForm from './Components/LoginForm';
import Main from './Components/Main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { UserStorage } from './Context/UserContext';
import ProtectedRoute from './Components/Helper/ProtectedRoute';
import LoggedRoute from './Components/Helper/LoggedRoute';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route
              path="/main/*"
              element={
                <ProtectedRoute>
                  <Main />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <LoggedRoute>
                  <LoginForm />
                </LoggedRoute>
              }
            />
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
