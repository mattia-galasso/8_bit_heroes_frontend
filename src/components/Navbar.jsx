import { useState, useEffect, useRef } from "react";

import { Link, NavLink, useNavigate, useLocation } from "react-router";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";

export default function Navbar() {
  const [userInput, setUserInput] = useState("");
  const searchNavigate = useNavigate();
  const location = useLocation();
  const { totalQuantity } = useCart();
  const { totalFavorites } = useFavorites();
  const [navOpen, setNavOpen] = useState(false);

  const navRef = useRef(null);

  function closeNav() {
    setNavOpen(false);
  }

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) setUserInput(searchQuery);
    else setUserInput("");
  }, [location.search]);

  useEffect(() => {
    const forceClose = () => setNavOpen(false);
    const handleOutsideInteraction = (event) => {
      if (navOpen && navRef.current && !navRef.current.contains(event.target)) forceClose();
    };
    const handleScroll = () => {
      if (navOpen) forceClose();
    };

    document.addEventListener("mousedown", handleOutsideInteraction);
    document.addEventListener("touchstart", handleOutsideInteraction);
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchmove", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideInteraction);
      document.removeEventListener("touchstart", handleOutsideInteraction);
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [navOpen]);

  const handleClickButton = () => {
    if (userInput.trim() === "") return;
    const params = new URLSearchParams();
    params.set("search", userInput);
    searchNavigate(`/games?${params.toString()}`);
  };

  return (
    <div className="navbar-container" ref={navRef}>
      <nav className="navbar navbar-expand-lg ps-1 pe-1 pe-lg-4 py-1" data-bs-theme="dark">
        <div className="container-fluid" id="container-navbar">
          <Link to="/" className="navbar-brand m-0 p-0">
            <div className="d-flex gap-1 align-items-center">
              <img src="/8bit_heroes_logo.png" alt="8bit_heroes_logo" className="avatar" />
              <div className="navbar-division"></div>
            </div>
          </Link>
          <button
            onClick={() => setNavOpen(!navOpen)}
            className={
              navOpen
                ? "navbar-toggler me-2 position-relative"
                : "navbar-toggler collapsed me-2 position-relative"
            }
            type="button"
            aria-expanded={navOpen}
            aria-label="Toggle navigation"
            style={{ overflow: "visible" }}
          >
            <span className="navbar-toggler-icon"></span>

            {!navOpen && (totalFavorites > 0 || totalQuantity > 0) && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger"
                style={{
                  width: "18px", // Stessa dimensione visiva dei badge con numero
                  height: "18px",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              ></span>
            )}
          </button>

          <div
            className={
              navOpen ? "collapse navbar-collapse show gap-5" : "collapse navbar-collapse gap-5"
            }
            id="navbarNav"
          >
            <div>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link fs-5 fw-bold" onClick={closeNav}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/games" className="nav-link fs-5 fw-bold" onClick={closeNav}>
                    Videogames
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="search-input-navbar my-3">
              <form
                className="input-group d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleClickButton();
                  closeNav();
                }}
              >
                <input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  name="search-input"
                  type="text"
                  className="form-control"
                  placeholder="Cerca"
                  aria-label="Cerca"
                  id="search-navbar"
                />
                <button
                  className="btn btn-outline-secondary"
                  type="submit"
                  id="search-button-navbar"
                >
                  Cerca
                </button>
              </form>
            </div>
            <div className="navbar-icons">
              <NavLink to="/wishlist" className="me-1">
                <button className="btn btn-outline-light my-3 position-relative" onClick={closeNav}>
                  <div className="nav-link fs-5">
                    <i className=" bi bi-heart" />
                  </div>
                  {totalFavorites > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {totalFavorites}
                    </span>
                  )}
                </button>
              </NavLink>
              <button
                className="btn btn-outline-light my-3 position-relative"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#cartOffcanvas"
                aria-controls="cartOffcanvas"
                onClick={closeNav}
              >
                <span className="nav-link fs-5 p-0">
                  <i className="bi bi-cart" />
                </span>
                {totalQuantity > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalQuantity}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
