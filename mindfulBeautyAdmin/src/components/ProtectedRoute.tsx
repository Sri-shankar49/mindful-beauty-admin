import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store"; // Update with your store's root state type

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Get the authentication state from Redux
  const token = useSelector((state: RootState) => state.login.token);

  // If not authenticated, redirect to the login page
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If authenticated, render the children
  return children;
};

export default ProtectedRoute;
