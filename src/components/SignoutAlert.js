import { useSelector } from "react-redux"
import checkMark from '../images/checkmark_confirm.png'


const SignoutAlert = () => {

    const showAlert = useSelector((state) => state.showAlert);
    const shouldHideAlert = useSelector((state) => state.shouldHideAlert);

    return(
        <div className={`alert-container ${shouldHideAlert ? 'hidden' : ''}`}>
          <div className={`alert ${!showAlert ? 'fade-out' : ''}`}>
            <img src={checkMark} />
            <p>You have been signed out</p>
          </div>
        </div>    
    )
}



export default SignoutAlert;