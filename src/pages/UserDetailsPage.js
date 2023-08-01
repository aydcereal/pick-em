import { useContext, useState } from 'react';
import AuthContext from '../context/auth-context';
import { useNavigate } from 'react-router-dom';

export default function UserDetailsPage() {
  const navigate = useNavigate();
  const { currentUser, saveUserData } = useContext(AuthContext);

  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  const handleSaveUserData = () => {
    if(currentUser) {

        const userData = {
            firstName,
            lastName,
            displayName,
            phoneNumber,
          };


          saveUserData(currentUser.uid, userData);
          navigate('/dashboard')
        };
    }
    
    
    
  
  return (
    <div className="page-container">
    <div className="layout-body">
      <h1 className="pageTitle">User Details</h1>
      <form className="layout-form">
        <div className="layout-row">
          <label htmlFor="firstName" className="label-style">First Name</label>
          <input
            className="input-style"
            id="firstName"
            name="firstName"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>
        <div className="layout-row">
          <label htmlFor="lastName" className="label-style">Last Name</label>
          <input
            className="input-style"
            id="lastName"
            name="lastName"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>
        <div className="layout-row">
          <label htmlFor="displayName" className="label-style">Display Name</label>
          <input
            className="input-style"
            id="displayName"
            name="displayName"
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
        </div>
        <div className="layout-row">
          <label htmlFor="phoneNumber" className="label-style">Phone Number</label>
          <input
            className="input-style"
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
        </div>
        <div className="layout-row-button">
          <button onClick={() => handleSaveUserData("uniqueUserId")} className="layout-button" type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
);
}

