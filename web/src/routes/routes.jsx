import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../views/auth/Login";
import CodeValidation from "../views/auth/CodeValidation";
import NewPassword from "../views/auth/NewPassword";
import Register from "../views/auth/Register";
import ClientLayout from "../layouts/ClientLayout";
import ClientEdit from "../views/client/ClientEdit";
import ClientList from "../views/client/ClientList";
import RestPassword from "../views/auth/RestPassword";
import AdminsLayout from "../layouts/AdminsLayout";
import AdminsList from "../views/admins/AdminsList";
import AdminManupilation from "../views/admins/AdminManupilation";
import Profile from "../views/home/Profile";
import HomeLayout from "../layouts/HomeLayout";
import DemandeLayout from "../layouts/DemandeLayout";
import DemandeList from "../views/demande/DemandeList";
import DemandeEdit from "../views/demande/DemandeEdit";
import MyDemandeLayout from "../layouts/MyDemandeLayout";
import MyDemande from "../views/myDemande/MyDemande";
import MyDemandeEdit from "../views/myDemande/MyDemandeEdit";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Navigate to="/login" />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/rest-password",
        element: <RestPassword />,
      },
      {
        path: "/code-validation",
        element: <CodeValidation />,
      },
      {
        path: "/new-password",
        element: <NewPassword />,
      },
    ],
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/clients",
        element: <ClientList />,
      },
      {
        path: "/clients/new",
        element: <ClientEdit key={"New user"} />,
      },
      {
        path: "/clients/update/:id",
        element: <ClientEdit key={"Update user"} />,
      },
    ],
  },

  {
    path: "/",
    element: <AdminsLayout />,
    children: [
      {
        path: "/admins",
        element: <AdminsList />,
      },
      {
        path: "/admins/new",
        element: <AdminManupilation key={"new"} />,
      },
      {
        path: "/admins/update/:id",
        element: <AdminManupilation key={"update"} />,
      },
    ],
  },
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: <DemandeLayout />,
    children: [
      {
        path: "/demandes",
        element: <DemandeList />,
      },
      {
        path: "/demandes/new",
        element: <DemandeEdit key={"new"} />,
      },
      {
        path: "/demandes/update/:id",
        element: <DemandeEdit key={"update"} />,
      },
    ],
  },

  {
    path: "/",
    element: <MyDemandeLayout />,
    children: [
      {
        path: "/my-demandes",
        element: <MyDemande />,
      },
      {
        path: "/my-demandes/new",
        element: <MyDemandeEdit key={"new"} />,
      },
      {
        path: "/my-demandes/update/:id",
        element: <MyDemandeEdit key={"update"} />,
      },
    ],
  },
]);

export default routes;
