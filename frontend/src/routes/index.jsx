import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { useAuth } from "../provider/auth";
import { ProtectedRoute } from "./ProtectedRoute";

import { Signin } from "../pages/auth/Signin";
import { Signup } from "../pages/auth/Signup";
import { AdminPage } from "../pages/admin/AdminPage";

const Routes = () => {
  const { token } = useAuth();

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/dashboard",
          element: <div>User Home Page</div>,
        },
        {
          path: "/logout",
          element: <div>Logout</div>,
        },
        {
          path: "/admin",
          element: <AdminPage />,
        }
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForAuthenticatedOnly,
    ...routesForNotAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;