import React, { ReactNode, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { Navigate } from 'react-router-dom';

interface LoggedRouteProps {
  children: ReactNode;
}

const LoggedRoute: React.FC<LoggedRouteProps> = ({ children }) => {
  const { user } = useContext(UserContext);
  return !user ? <>{children}</> : <Navigate to="/main" />;
};

export default LoggedRoute;
