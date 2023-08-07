import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setShowAlert, setShouldHideAlert } from "../redux/store"





export default function Root() {

    const navigate = useNavigate();

   

   const showAlert = useSelector((state) => state.showAlert);
   const shouldHideAlert = useSelector((state) => state.shouldHideAlert);
   

   const dispatch = useDispatch();

    
    const logoutHandler = () => {
        console.log('Log out handler called');
        navigate('/');
        dispatch(setShowAlert(true));
        dispatch(setShouldHideAlert(false));
        setTimeout(() => {
          dispatch(setShowAlert(false));;
          setTimeout(() => dispatch(setShouldHideAlert(true)), 5000);
        }, 5000);
      };


    return (
    <>
      
        <Navbar
          showAlert={showAlert}
          shouldHideAlert={shouldHideAlert}
          logoutHandler={logoutHandler}
        />
    

      <Outlet />
    </>
  );
}