import Navbar from "../components/Navbars/navbar";
import { useSelector } from "react-redux";

export default function Error() {
  const showAlert = useSelector((state) => state.showAlert);
  const shouldHideAlert = useSelector((state) => state.shouldHideAlert);

  return (
    <>
      <Navbar showAlert={showAlert} shouldHideAlert={shouldHideAlert} />

      <div className="pageTitle">
        <h1>Page not found (404)</h1>
        <p>
          Flag on the play! The requested football content has been penalized
          with a 404 error. It seems to have gone out of bounds.
        </p>
      </div>
    </>
  );
}
