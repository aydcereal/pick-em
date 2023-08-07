import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setShowAlert, setShouldHide,setFlyoutHide } from "../redux/store"





export default function Root() {

    const navigate = useNavigate();

   

   const showAlert = useSelector((state) => state.showAlert);
   const shouldHide = useSelector((state) => state.shouldHide);
   

   const dispatch = useDispatch();

    
    const logoutHandler = () => {
        console.log('Log out handler called');
        navigate('/');
        dispatch(setShowAlert(true));
        dispatch(setShouldHide(false));
        setTimeout(() => {
          dispatch(setShowAlert(false));;
          setTimeout(() => dispatch(setShouldHide(true)), 5000);
        }, 5000);
      };


    return (
    <>
      
        <Navbar
          showAlert={showAlert}
          shouldHide={shouldHide}
          logoutHandler={logoutHandler}
        />
    

      <Outlet />
    </>
  );
}