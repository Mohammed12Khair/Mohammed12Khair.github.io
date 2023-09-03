//componantes
import Header from "./com/Header";
import Footer from "./com/Footer";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

//react router dom
import { createBrowserRouter, Routes, Route, NavLink, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Notes, { loadNotes } from "./pages/notes/Notes";
import { useState } from "react";
import { UserContext } from "./pages/context/UserContext";

function App() {
  const [user, SetUser] = useState();
  const [token, Settoken] = useState();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="notes" element={<Notes />} loader={loadNotes} />
      </Route>
    )
  );

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
