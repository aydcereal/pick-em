import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import AuthContext from "./context/auth-context";
import { useContext } from "react";
import { Provider } from "react-redux";
import store from "./redux/store";

import Homepage from "./pages/homepage";
import Login from "./pages/login";
import Signup from "./pages/signUp";
import Dashboard from "./pages/dashboard";
import ChoosePassword from "./pages/choosePassword";
import RootLayout from "./pages/Root";
import SignupRoot from "./pages/SignupRoot";
import ErrorPage from "./pages/Error";
import UserDetailsPage from "./pages/UserDetailsPage";
import NewPool from "./pages/NewPool";
import Connections from "./pages/connections";
import ApiTest from "./pages/ApiTest";
import PoolDetail from "./pages/PoolDetail";
import ManageEntries from "./pages/ManageEntries";
import Invite from "./pages/Invite";
import InviteLandingPage from "./pages/InviteLandingPage";
import Picks from "./pages/Picks";
import Overview from "./pages/Overview";
import ExcelReader from "./pages/ExcelReader";

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Homepage /> },
      { path: "/login", element: <Login /> },
      { path: "/picks", element: <Picks /> },
      {
        path: "/dashboard",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <Dashboard /> }],
      },
      { path: "/selections/:poolId", element: <ManageEntries /> },

      {
        path: "/dashboard/my-pools",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <Dashboard /> }],
      },

      {
        path: "/pools/:poolKey/:week",
        children: [{ index: true, element: <PoolDetail /> }],
      },

      { path: "/pools/:poolId/invite", element: <Invite /> },
      { path: "/upload", element: <ExcelReader /> },

      { path: "/join", element: <InviteLandingPage /> },
      { path: "/Picks/:poolKey", element: <Picks /> },
      { path: "/Overview/:poolKey", element: <Overview /> },
      {
        path: "/pools/start",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <NewPool /> }],
      },
      {
        path: "/connections",
        element: <ProtectedRoute />,
        children: [{ index: true, element: <Connections /> }],
      },
      {
        path: "/signup",
        element: <SignupRoot />,
        children: [
          { path: "", element: <Signup /> },
          { path: "password", element: <ChoosePassword /> },
          { path: "user-details", element: <UserDetailsPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  );
}

export default App;
