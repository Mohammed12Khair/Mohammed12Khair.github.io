//componantes
import Header from "./com/Header";
import Footer from "./com/Footer";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";

//react router dom
import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Notes, { loadNotes } from "./pages/notes/Notes";
import { useState } from "react";
import { UserContext } from "./pages/context/UserContext";
import axios from "axios";


function App() {
  const [user, SetUser] = useState();
  const [token, Settoken] = useState();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="notes" element={<Notes />} loader={loadNotes} />
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
