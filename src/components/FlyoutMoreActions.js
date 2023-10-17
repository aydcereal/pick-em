import { FlyoutContainer, 
         FlyoutSubContainer,
         FlyoutListItem} from "./FlyoutMoreActions.styled"


const FlyoutMoreActions = ({shouldHide})=> {

    

       
    return(
        <FlyoutContainer className={`FlyoutContainer  ${shouldHide ? 'hidden' : ''}`}>
            <FlyoutSubContainer>
            <FlyoutListItem>Invite Members</FlyoutListItem>
            <FlyoutListItem>Member Management</FlyoutListItem>
            <FlyoutListItem>Delete</FlyoutListItem>
            </FlyoutSubContainer>
        </FlyoutContainer>
    )


}


export default FlyoutMoreActions