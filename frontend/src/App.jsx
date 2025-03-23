// App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import Home from "./components/Home";
import Post from "./components/Post";
import Authentication, { authAction } from "./components/Login";
import { SessionProvider } from "./context/SessionContext";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post",
        element: (
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth",
        element: <Authentication />,
        action: authAction,
      },
    ],
  },
]);

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
