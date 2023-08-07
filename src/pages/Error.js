import Navbar from "../components/navbar"
import { useSelector,  } from "react-redux"

export default function Error() {

    const showAlert = useSelector((state) => state.showAlert)
    const shouldHide = useSelector((state) => state.shouldHide)
    

    return <>
        <Navbar 
            showAlert={showAlert}
            shouldHide={shouldHide}
             />

        <div className="pageTitle">
        <h1>Page not found (404)</h1>
        <p>Flag on the play! The requested football content has been penalized with a 404 error. 
            It seems to have gone out of bounds.
            
        </p>

        </div>
        
    </>
}