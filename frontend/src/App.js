//componantes
import Header from "./com/Header";
import Footer from "./com/Footer";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";

//react router dom
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Notes from "./pages/notes/Notes";
import { useState } from "react";
import { UserContext } from "./pages/context/UserContext";
// import axios from "axios";

function App() {

  const [user, SetUser] = useState(() => (localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null));
  const [token, Settoken] = useState(() => (localStorage.getItem("token") ? localStorage.getItem("token") : null));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="notes" element={<Notes />} />
      </Route>
    )
  );

  //logout function
  return (
    <UserContext.Provider value={{ user, SetUser, token, Settoken }}>
      <div className="App">
        <RouterProvider router={router} />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
