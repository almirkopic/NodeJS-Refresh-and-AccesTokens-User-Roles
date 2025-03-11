import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Post from "./components/Post";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/post", element: <Post /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
