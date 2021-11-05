import React, { useState } from "react";
import { useEffect } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import "./UserPage.css";

import { TestContainer } from "./UserPageElements.js";

function UserPage() {
  const dispatch = useDispatch();
  const reduxStore = useSelector((store) => store);


  //important
  const [userEmail, setUserEmail] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userZip, setUserZip] = useState("");





  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch({ type: "GET_SUBS" });
  }, []);

  const validateEmail = () => {
    if (userEmail.indexOf("@") > -1) {
      submit();
    } else {
      alert("invalid email!");
    }
  };


  const submit = () => {
    const theAddress = {addr1: '707 Poop St', city: 'Kansas City', state: 'MO', zip: userZip}
    console.log("valid!! sending:", userEmail, userFirstName, userLastName, userZip);
    dispatch({ type: "ADD_SUBSCRIBER", payload: {email: userEmail, firstName: userFirstName, lastName: userLastName, address: theAddress }});
    setUserEmail("");
  };

  // const getAllLists = () => {
  //   console.log("in getAllLists (client side)");
  //   dispatch({ type: "GET_ALL_LISTS" });
  // };

  const listSubscribers = () => {
    console.log("loaded!", reduxStore.getAllListsReducer);


  };

  return (
    <div className="container">
      {reduxStore.getAllListsReducer.data}
      <div className="gridL">
        <h2>User Email Signup!</h2>
        <form onSubmit={() => validateEmail()}>

          
          <input
            value={userEmail}
            type="email"
            id="email"
            placeholder="Email"
            style={{ width: "200px" }}
            onChange={(event) => setUserEmail(event.target.value)}
          />

<input
            value={userFirstName}
            type="text"
            id="firstName"
            placeholder="First Name"
            style={{ width: "200px" }}
            onChange={(event) => setUserFirstName(event.target.value)}
          />

<input
            value={userLastName}
            type="text"
            id="lastName"
            placeholder="Last Name"
            style={{ width: "200px" }}
            onChange={(event) => setUserLastName(event.target.value)}
          />

<input
            value={userZip}
            type="text"
            id="email"
            placeholder="Zip Code"
            style={{ width: "120px" }}
            onChange={(event) => setUserZip(event.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>

      <h1>{listSubscribers()}</h1>
{/* 
      <div>
        <button style={{ padding: "10px" }} onClick={() => getAllLists()}>
          GET ALL SUBS
        </button>

      

        {reduxStore.getAllListsReducer.data === undefined ? (
          <h3>LOADING...</h3>
        ) : (
          <h5>{JSON.stringify(reduxStore.getAllListsReducer.data.members)}</h5>
        )}
      </div> */}






      {/* <div className="gridR">
        {reduxStore.setSubsListReducer.data === undefined ? (
          <h3>LOADING...</h3>
        ) : (
          <h5>{JSON.stringify(reduxStore.setSubsListReducer)}</h5>
        )}
      </div> */}

      <div className="gridR">
        <h2>Welcome, {reduxStore.user.username}!</h2>
        <p>Your ID is: {reduxStore.user.id}</p>
        <LogOutButton className="btn" />
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
