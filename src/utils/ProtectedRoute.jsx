// utils/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Read the token from localStorage
  const token = localStorage.getItem("token");

  // If no token, redirect to login/auth page
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  // If token exists, render the protected content
  return children;
}
