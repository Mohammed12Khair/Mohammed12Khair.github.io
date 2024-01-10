import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";

// axios.defaults.baseURL = "http://194.60.87.194:8383/api";
axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.headers.common["Content-Type"] = "application/json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
