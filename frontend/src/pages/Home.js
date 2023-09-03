import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";

const Home = () => {
  const { user, SetUser } = useContext(UserContext);
  return (
    <div>
      <header className="bg-primary-gradient">
        <div className="container pt-4 pt-xl-5">
          <div className="row pt-5">
            <div className="col-md-8 col-xl-6 text-center text-md-start mx-auto">
              <div className="text-center">
                <p className="fw-bold text-success mb-2">Online Notes Service</p>
                <div className="main-text-section">
                  <p>
                    Before the digital era, jotting down notes and storing them in physical notebooks or binders was the norm. While this method is still valuable in certain situations, it's no longer
                    sufficient to meet the demands of modern life. Enter online note services.
                  </p>
                  <button className="btn btn-sm btn-primary"> {user ? `Welcome ${user}`  : "Start"} </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
