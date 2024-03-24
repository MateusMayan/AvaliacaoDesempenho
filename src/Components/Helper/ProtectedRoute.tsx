import React, { ReactNode, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useContext(UserContext);
  return user ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
