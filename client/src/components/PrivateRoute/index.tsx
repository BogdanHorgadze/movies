import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return localStorage.getItem('token') ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
