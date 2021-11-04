import React, { useState } from "react";
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector, useDispatch } from "react-redux";
import "./UserPage.css";

import { TestContainer } from "./UserPageElements.js";

function UserPage() {
  const dispatch = useDispatch();
  const reduxStore = useSelector((store) => store);

  const [userEmail, setUserEmail] = useState("");
  const [jsonListChaos, setJsonListChaos] = useState({});

  const validateEmail = () => {
    if (userEmail.indexOf("@") > -1) {
      submit();
    } else {
      alert("invalid email!");
    }
  };

  const submit = () => {
    console.log("valid!! sending:", userEmail);
    dispatch({ type: "ADD_SUBSCRIBER", payload: userEmail });
    setUserEmail("");
  };

  const getSubs = () => {
    console.log("in getMail - button pressed");
    dispatch({ type: "GET_SUBS" });
    getStore();
  };

  const getStore = () => {
    console.log("Please populate:", reduxStore); //FIX
  };

  return (
    <div className="container">
      <div className="gridL">
        <h2>User Email Signup!</h2>
        <form onSubmit={() => validateEmail()}>
          <input
            value={userEmail}
            type="email"
            id="email"
            placeholder="Enter Your Email"
            style={{ width: "200px" }}
            onChange={(event) => setUserEmail(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
        <h2>{JSON.stringify(userEmail)}</h2>
      </div>

      <div className="gridR">
        <button style={{ padding: "10px" }} onClick={() => getSubs()}>
          GET JSON CAMPAIGN DATA
        </button>

        {reduxStore.setSubsListReducer.data === undefined 

        ?
    
          (<h3>LOADING...</h3>
        ) : (
          <h5>{JSON.stringify(reduxStore.setSubsListReducer.data.stats)}</h5>
        )}
      </div>

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
