import {
  FlyoutContainer,
  FlyoutSubContainer,
  FlyoutListItem,
} from "./FlyoutMoreActions.styled";

import { app } from "../../firebase";
import "firebase/compat/database";

const database = app.database();

const FlyoutMoreActions = ({ shouldHide, poolKey }) => {
  const deleteHandler = () => {
    const poolRef = database.ref(`pools/${poolKey}`);

    poolRef
      .remove()
      .then(() => {
        console.log("Item deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
    console.log(poolKey);
  };

  return (
    <FlyoutContainer
      className={`FlyoutContainer  ${shouldHide ? "hidden" : ""}`}
    >
      <FlyoutSubContainer>
        <FlyoutListItem to={`/pools/${poolKey}/invite`}>
          Invite Members
        </FlyoutListItem>
        <FlyoutListItem>Member Management</FlyoutListItem>
        <FlyoutListItem onClick={deleteHandler}>Delete</FlyoutListItem>
      </FlyoutSubContainer>
    </FlyoutContainer>
  );
};

export default FlyoutMoreActions;
