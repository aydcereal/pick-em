import './App.css';
import { createBrowserRouter, RouterProvider,Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import AuthContext from './context/auth-context';
import { useContext } from 'react';

import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signUp';
import Dashboard from './pages/dashboard';
import ChoosePassword from './pages/choosePassword';
import RootLayout from './pages/Root';
import SignupRoot from './pages/SignupRoot';
import ErrorPage from './pages/Error';
import UserDetailsPage from './pages/UserDetailsPage';


function ProtectedRoute() {
  const {isAuthenticated} = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to='/login'/>
  }
  return <Outlet />
}

const router = createBrowserRouter([
  {path: '/', 
   element:<RootLayout/>,
   errorElement: <ErrorPage />,
   children: [
      {index: true, element: <Homepage/>},
      {path: '/login', element: <Login/>},
      {path: '/dashboard', element: <ProtectedRoute />, children: [{index:
        true, element:<Dashboard />}]},
      {path: '/signup', element: <SignupRoot/>,
        children: [
        {path: '', element:<Signup/>},
        {path:'password', element:<ChoosePassword/>},
        {path:'user-details', element: <UserDetailsPage />}
      ]},
      
    ]}
  
])


function App() {
  return <AuthProvider>
  <RouterProvider router={router}/>
  </AuthProvider>
  
  
  
}

export default App;
