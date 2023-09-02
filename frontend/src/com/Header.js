import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav class="navbar navbar-light navbar-expand-md sticky-top navbar-shrink py-3" id="mainNav">
        <div class="container">
          <a class="navbar-brand d-flex align-items-center" href="/">
            <span>Notes</span>
          </a>
          <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1">
            <span class="visually-hidden">Toggle navigation</span>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navcol-1">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item">
                <NavLink to="/">
                  <a class="nav-link active" href="index.html">
                    Home
                  </a>
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink to="notes">
                  <a class="nav-link" href="services.html">
                    Services
                  </a>
                </NavLink>
              </li>
            </ul>
            <NavLink to="login">
              <a class="btn btn-primary btn-sm shadow" role="button" href="signup.html">
                Login
              </a>
            </NavLink>
          </div>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Header;
