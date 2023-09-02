//componantes
import Header from "./com/Header";
import Footer from "./com/Footer";

//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";

//react router dom
import { createBrowserRouter, Routes, Route, NavLink, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Notes from "./pages/notes/Notes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="notes" element={<Notes />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <Footer />
    </div>
  );
}

export default App;
