// SessionContext.js
import React from "react";
import { useNavigate } from "react-router-dom";

const SessionContext = React.createContext(null);

export function SessionProvider({ children }) {
  const navigate = useNavigate();
  const [session, setSession] = React.useState(() => {
    try {
      const token = sessionStorage.getItem("accessToken");
      return token ? { isAuthenticated: true, token } : null;
    } catch (error) {
      console.error("Session storage error:", error);
      return null;
    }
  });

  const validateToken = async (token) => {
    try {
      const response = await fetch("http://localhost:3000/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await fetch("http://localhost:3000/refresh", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Token refresh failed");
      const { accessToken } = await response.json();
      return accessToken;
    } catch (error) {
      sessionStorage.removeItem("accessToken");
      navigate("/auth");
      return null;
    }
  };

  const checkAuth = async () => {
    try {
      let token = sessionStorage.getItem("accessToken");
      if (!token) return false;

      let isValid = await validateToken(token);
      if (!isValid) {
        token = await refreshToken();
        if (token) {
          sessionStorage.setItem("accessToken", token);
          setSession({ isAuthenticated: true, token });
          return true;
        }
      }
      return isValid;
    } catch (error) {
      await handleLogout();
      return false;
    }
  };

  const handleLogin = (token) => {
    sessionStorage.setItem("accessToken", token);
    setSession({ isAuthenticated: true, token });
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("accessToken");
    setSession(null);
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include",
    });
    navigate("/auth");
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        isAuthenticated: !!session?.isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
        checkAuth,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
