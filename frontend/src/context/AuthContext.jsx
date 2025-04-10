import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URI = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  const getAccessToken = () => {
    return sessionStorage.getItem("accessToken");
  };

  const setAccessToken = (token) => {
    if (token) {
      sessionStorage.setItem("accessToken", token);
    } else {
      sessionStorage.removeItem("accessToken");
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.get(`${API_URI}/refresh`, {
        withCredentials: true,
      });

      if (!response.data.accessToken) {
        setAccessToken(null);
        setUserRole(null);
        return null;
      }

      setAccessToken(response.data.accessToken);
      setUserRole(response.data.roles);
      return response.data.accessToken;
    } catch (error) {
      setAccessToken(null);
      setUserRole(null);
      return null;
    }
  };

  useEffect(() => {
    refreshAccessToken();

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const api = axios.create({
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newToken = await refreshAccessToken();
        if (newToken) {
          api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthContext.Provider
      value={{
        accessToken: getAccessToken(),
        setAccessToken,
        api,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
