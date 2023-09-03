import axios from "axios";
import React, { useState, useContext } from "react";

//Import user Context
import { UserContext } from "./context/UserContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  //for redirect
  // const navigate = useNavigate();

  //Erro msg
  const [errors, seterrors] = useState(null);

  //user Context
  const { user, SetUser } = useContext(UserContext);
  const { token, Settoken } = useContext(UserContext);

  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");

  let loginAction = async (e) => {
    e.preventDefault();

    //Data to Be posted To server
    let data = {
      username: username,
      password: password,
    };

    const response = await axios({
      url: "/user/login",
      method: "POST",
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        if (response.status == "200") {
          console.log(response.data);

          //Add details to context state
          SetUser(response.data.user);
          Settoken(response.data.token);

          //add details to local storage
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));

          //redirect to Service Page
          // navigate("../notes");
        } else {
          console.log("Error");
        }
      })
      .catch(function (error) {
        seterrors("Invalid \n username/password");
      });
  };

  return (
    <div>
     
      {user ? <Navigate to="../notes" /> : ""}
      <section className="position-relative py-4 py-xl-5">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6 col-xl-4">
              <div className="card mb-5">
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" className="bi bi-person">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                    </svg>
                  </div>
                  <form className="text-center" method="post" onSubmit={loginAction}>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={(e) => {
                          Setusername(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => {
                          Setpassword(e.target.value);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      {errors ? <span className="text-danger text-sm">{errors}</span> : ""}
                      <button className="btn btn-primary d-block w-100" type="submit">
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
