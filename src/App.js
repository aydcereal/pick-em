import './App.css';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

import Homepage from './pages/homepage';
import Login from './pages/login';
import Signup from './pages/signUp';



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage/>}></Route>
          <Route path='/home' element={<Homepage/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
     
    
  );
}

export default App;
