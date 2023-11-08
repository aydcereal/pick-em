import { FlyoutContainer, 
         FlyoutSubContainer,
         FlyoutListItem} from "./FlyoutMoreActions.styled"

import { app } from '../firebase';
import 'firebase/compat/database';  

const database = app.database();



const inviteUserToPool = (poolID, recipientEmail) => {
  const invitationsRef = database.ref(`pools/${poolID}/invitations`);
  invitationsRef.push({
    recipientEmail: recipientEmail,
    status: 'pending' // You can set 'pending' as the initial status
  });
};




const FlyoutMoreActions = ({shouldHide, poolKey})=> {
  const testEmail = "test@hotmail.com"

  const inviteHandler = () => {
    
    inviteUserToPool(poolKey, testEmail)
  }


    const deleteHandler = () => {
        
        const poolRef = database.ref(`pools/${poolKey}`);

        poolRef.remove()
      .then(() => {
        console.log("Item deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
        console.log(poolKey);
    }

    

       
    return(
        <FlyoutContainer className={`FlyoutContainer  ${shouldHide ? 'hidden' : ''}`}>
            <FlyoutSubContainer>
            <FlyoutListItem onClick={inviteHandler}>Invite Members</FlyoutListItem>
            <FlyoutListItem>Member Management</FlyoutListItem>
            <FlyoutListItem onClick={deleteHandler} >Delete</FlyoutListItem>
            </FlyoutSubContainer>
        </FlyoutContainer>
    )


}


export default FlyoutMoreActions