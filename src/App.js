import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signUp';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  {path: '/', 
   element:<RootLayout/>,
   errorElement: <ErrorPage />,
   children: [
      {path: '/', element: <Homepage/>},
      {path: '/login', element: <Login/>},
      {path: '/signup', element: <Signup/>}]  }
  
])


function App() {
  return <RouterProvider router={router}/>
}

export default App;
