// ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkAuth } = useSession();
  const location = useLocation();
  const [isVerified, setIsVerified] = React.useState(null);

  React.useEffect(() => {
    const verifyAuth = async () => {
      const isValid = await checkAuth();
      setIsVerified(isValid);
    };
    verifyAuth();
  }, [checkAuth]);

  if (isVerified === null) return null;
  return isVerified ? (
    children
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
