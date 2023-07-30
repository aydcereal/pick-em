import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/auth-context';
import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signUp';
import Dashboard from './pages/dashboard';
import ChoosePassword from './pages/choosePassword';
import RootLayout from './pages/Root';
import SignupRoot from './pages/SignupRoot';
import ErrorPage from './pages/Error';


const router = createBrowserRouter([
  {path: '/', 
   element:<RootLayout/>,
   errorElement: <ErrorPage />,
   children: [
      {index: true, element: <Homepage/>},
      {path: '/login', element: <Login/>},
      {path: '/dashboard', element: <Dashboard/>},
      {path: '/signup', element: <SignupRoot/>,
        children: [
        {path: '', element:<Signup/>},
        {path:'password', element:<ChoosePassword/>}
      ]},
      
    ]}
  
])


function App() {
  return <AuthProvider>
  <RouterProvider router={router}/>
  </AuthProvider>
  
  
  
}

export default App;
