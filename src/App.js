
import './App.css';
import { createBrowserRouter, RouterProvider,Outlet, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import AuthContext from './context/auth-context';
import { useContext } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signUp';
import Dashboard from './pages/dashboard';
import ChoosePassword from './pages/choosePassword';
import RootLayout from './pages/Root';
import SignupRoot from './pages/SignupRoot';
import ErrorPage from './pages/Error';
import UserDetailsPage from './pages/UserDetailsPage';
import NewPool from './pages/NewPool';
import Connections from './pages/connections';
import ApiTest from './pages/ApiTest';
import PoolDetail from './pages/PoolDetail';




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
      {path: '/picks', element: <ApiTest/>},
      {path: '/dashboard', element: <ProtectedRoute />, children: [{index:
        true, element:<Dashboard />}]},
      {path: '/dashboard/my-pools', element: <ProtectedRoute />, children: [{index:
        true, element:<Dashboard />}]},
      
        { path: '/pools/:poolKey', element: <ProtectedRoute />, children: [
          { index: true, element: <PoolDetail /> }
        ]},

      {path: '/pools/start', element: <ProtectedRoute />, children: [{index:
          true, element:<NewPool />}]},
      {path: '/connections', element: <ProtectedRoute />, children: [{index:
          true, element:<Connections />}]},
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
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </AuthProvider>
  
  
  
}

export default App;
