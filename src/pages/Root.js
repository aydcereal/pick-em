import { Outlet, useLocation} from "react-router-dom"
import Navbar from "../components/navbar"
import Navbar2 from "../components/Navbar2"
import { useState } from "react"
import { useNavigate } from "react-router-dom"





export default function Root() {

    const navigate = useNavigate();

    const location = useLocation()
    const isDashboard = location.pathname === '/dashboard'

    const [showAlert, setShowAlert] = useState(false);
    const [shouldHide, setShouldHide] = useState(true);
    
    const logoutHandler = () => {
        console.log('Log out handler called');
        navigate('/');
        setShowAlert(true);
        setShouldHide(false);
        setTimeout(() => {
          setShowAlert(false);
          setTimeout(() => setShouldHide(true), 5000);
        }, 5000);
      };


    return (
    <>
      {isDashboard ? (
        <Navbar2
          showAlert={showAlert}
          shouldHide={shouldHide}
          logoutHandler={logoutHandler}
        />
      ) : (
        <Navbar
          showAlert={showAlert}
          shouldHide={shouldHide}
          logoutHandler={logoutHandler}
        />
      )}

      <Outlet />
    </>
  );
}