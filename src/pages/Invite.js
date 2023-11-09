import {
    PageContainer,
    Body,
    CopyPoolLinkContainer,
    PoolLink
  
    } from "../components/Components.styled";

import { Title, Text } from "../components/Typography.styled";
import { useParams } from "react-router-dom";
import { app } from '../firebase';
import 'firebase/compat/database';






const database = app.database();

function copyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
  
    // Append the text area to the document
    document.body.appendChild(textArea);
  
    // Select the text within the text area
    textArea.select();
  
    // Copy the selected text to the clipboard
    document.execCommand('copy');
  
    // Remove the text area from the document
    document.body.removeChild(textArea);
  }
  

const generateInviteLink = (poolID) => {
    const invitationID = database.ref(`pools/${poolID}/invitations`).push().key
    
    return `https://localhost:3000/join?poolID=${poolID}&invitationID=${invitationID}`;
  };
  


const Invite = () => {
    

    const { poolId } = useParams();

  

    const poolLinkHandler = () => {
       const inviteLink =  generateInviteLink(poolId)
       copyTextToClipboard(inviteLink)
       alert('Invite link copied to clipboard');
    }

    

    return (
        <PageContainer>
            <Body>
                <Title>
                    Invite pool Members
                </Title>
                <Text>
                    Invite connections below or using this link:
                </Text>
                <CopyPoolLinkContainer>
                    <PoolLink onClick={poolLinkHandler}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 1C6.11929 1 5 2.11929 5 3.5V8.5C5 9.88071 6.11929 11 7.5 11H12.5C13.8807 11 15 9.88071 15 8.5V3.5C15 2.11929 13.8807 1 12.5 1H7.5ZM7 3.5C7 3.22386 7.22386 3 7.5 3H12.5C12.7761 3 13 3.22386 13 3.5V8.5C13 8.77614 12.7761 9 12.5 9H7.5C7.22386 9 7 8.77614 7 8.5V3.5ZM3 7.5C3 7.22386 3.22386 7 3.5 7H3.77778V5H3.5C2.11929 5 1 6.11929 1 7.5V12.5C1 13.8807 2.11929 15 3.5 15H8.5C9.88071 15 11 13.8807 11 12.5V12.2222H9V12.5C9 12.7761 8.77614 13 8.5 13H3.5C3.22386 13 3 12.7761 3 12.5V7.5Z" fill="#fff"></path></svg>
                        Copy Pool Link
                    </PoolLink>
                </CopyPoolLinkContainer>

            </Body>
        </PageContainer>
    )
}


export default Invite