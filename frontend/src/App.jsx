import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import Home from "./components/Home";
import Post from "./components/Post";
import AuthForm from "./components/Login";
import { authAction } from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/post", element: <Post /> },
      { path: "/auth", element: <AuthForm />, action: authAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
