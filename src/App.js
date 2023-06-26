import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signUp';
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
      {path: '/signup', element: <SignupRoot/>,
        children: [
        {path: '', element:<Signup/>},
        {path:'password', element:<ChoosePassword/>}
      ]},
      
    ]}
  
])


function App() {
  return <RouterProvider router={router}/>
}

export default App;
