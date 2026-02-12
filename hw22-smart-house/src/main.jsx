import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { SmartHouseProvider } from "./context/SmartHouseContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SmartHouseProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SmartHouseProvider>
  </React.StrictMode>
);
