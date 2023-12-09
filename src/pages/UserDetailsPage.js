import { useContext, useState } from "react";
import AuthContext from "../context/auth-context";
import { useNavigate } from "react-router-dom";

export default function UserDetailsPage() {
  const navigate = useNavigate();
  const { currentUser, saveUserData } = useContext(AuthContext);

  console.log(currentUser);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNameTaken, setIsNameTaken] = useState(false);

  const handleSaveUserData = async (event) => {
    event.preventDefault();

    const userData = {
      firstName,
      lastName,
      displayName,
      phoneNumber,
    };

    try {
      const dataResult = await saveUserData(currentUser.uid, userData);

      console.log("result", dataResult);

      if (dataResult) {
        navigate("/dashboard");
      } else {
        setIsNameTaken(true);
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      setIsNameTaken(true);
    }
  };

  return (
    <div className="page-container">
      <div className="layout-body">
        <h1 className="pageTitle">User Details</h1>
        {isNameTaken && <p className="nameTaken">Display Name already taken</p>}

        <form className="layout-form" onSubmit={handleSaveUserData}>
          <div className="layout-row">
            <label htmlFor="firstName" className="label-style">
              First Name
            </label>
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
            <label htmlFor="lastName" className="label-style">
              Last Name
            </label>
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
            <label htmlFor="displayName" className="label-style">
              Display Name
            </label>
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
            <label htmlFor="phoneNumber" className="label-style">
              Phone Number
            </label>
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
            <button className="layout-button" type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
