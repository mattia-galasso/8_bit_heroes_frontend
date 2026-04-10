import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";

// GENERAL CSS
import "./assets/css/index.css";

// HOMEPAGE CSS
import "./assets/css/homepage.css";

// NAVBAR CSS
import "./assets/css/navbar.css";

// OFFCANVAS CSS
import "./assets/css/OffcanvasCart.css";

// CARTPAGE CSS
import "./assets/css/cartpage.css";

// NOTIFICATION CSS
import "./assets/css/notification.css";

// LOADING CSS
import "./assets/css/loading.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
