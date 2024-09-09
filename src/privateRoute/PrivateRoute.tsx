// PrivateRoute.tsx
import React from 'react';
import { Route, Navigate, RouteProps, RouterProps } from 'react-router-dom';

interface PrivateRouteProps extends RouterProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
