import axios from "axios";
import React, { useState,useContext } from "react";

//Import user Context
import { UserContext } from "./context/UserContext";

const Login = () => {
  //user Context
  const { user, SetUser } = useContext(UserContext);
  const { token, Settoken } = useContext(UserContext);

  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");

  let loginAction = async (e) => {
    e.preventDefault();

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
    }).then(function (response) {
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.user);
    });
  };

  return (
    <div>
      <section class="position-relative py-4 py-xl-5">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <div class="col-md-6 col-xl-4">
              <div class="card mb-5">
                <div class="card-body d-flex flex-column align-items-center">
                  <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16" class="bi bi-person">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                    </svg>
                  </div>
                  <form class="text-center" method="post" onSubmit={loginAction}>
                    <div class="mb-3">
                      <input
                        class="form-control"
                        type="text"
                        name="username"
                        placeholder="username"
                        onChange={(e) => {
                          Setusername(e.target.value);
                        }}
                      />
                    </div>
                    <div class="mb-3">
                      <input
                        class="form-control"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={(e) => {
                          Setpassword(e.target.value);
                        }}
                      />
                    </div>
                    <div class="mb-3">
                      <button class="btn btn-primary d-block w-100" type="submit">
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
