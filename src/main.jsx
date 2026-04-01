import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
// GENERAL CSS FILE
import "./assets/css/index.css";

// HOMEPAGE CSS FILE
import "./assets/css/homepage.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
