import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomeLayout from "@/layout/HomeLayout";
import Home from "@/pages/home";
import Login from "@/pages/login";
import Register from "@/pages/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomeLayout></HomeLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
 
]);