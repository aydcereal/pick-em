import classes from "./picksIn.css";
import { useParams } from "react-router-dom";

export default function Picksin() {
  const { poolKey } = useParams();
  console.log(poolKey);
  return (
    <div className="Thanks__container">
      <h1 className="thanks_title">YOUR PICKS ARE IN!</h1>
      <p>
        You have successfully submitted this pick sheet.
        <br />
        <br />
        <a href={`/selections/${poolKey}`}>View your picks</a>
      </p>
    </div>
  );
}
