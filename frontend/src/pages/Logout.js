import React, { useContext, useEffect } from "react";
//react router dom
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import axios from "axios";

const Logout = () => {
  const nav = useNavigate();

  const { SetUser } = useContext(UserContext);
  const { token, Settoken } = useContext(UserContext);

  let logoutAction = async () => {
    // Create axios call
    const response = await axios({
      url: "/user/logout",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    })
      .then(function (response) {
        if (response.status == "204") {
          console.log(response.data);

          //Add details to context state
          SetUser(null);
          Settoken(null);

          //add details to local storage
          localStorage.clear();

          //redirect to Service Page
          nav("/");
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        // seterrors("Invalid \n username/password");
      });
  };

  useEffect(function () {
    logoutAction();
  }, []);

  return <div>Logout</div>;
};

export default Logout;
