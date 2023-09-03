import React, { useContext, useEffect, useState } from "react";
//react router dom
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import axios from "axios";

//add loading gif
import LoadingImg from "../img/loading.gif";

const Logout = () => {

  //Set Error for end-user
  const [errors, seterrors] = useState("Please wait ...");

  //to redirect after logout
  const nav = useNavigate();

  // get context of user
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
        seterrors("failed !");
        // seterrors("Invalid \n username/password");
      });
  };

  useEffect(function () {
    logoutAction();
  }, []);

  return (
    <div>
      <div className="container text-center" style={{ marginTop: "5%", marginBottom: "10%" }}>
        <h2>{errors}</h2>
        <img src={LoadingImg} style={{ width: "20%" }} />
      </div>
    </div>
  );
};

export default Logout;
