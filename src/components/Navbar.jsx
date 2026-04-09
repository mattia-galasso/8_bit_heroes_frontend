import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";

export default function Navbar() {
  const [userInput, setUserInput] = useState("");
  const searchNavigate = useNavigate();
  const { totalQuantity } = useCart();
  const { totalFavorites } = useFavorites();
  const [navOpen, setNavOpen] = useState(false);

  function closeNav() {
    setNavOpen((state) => !state);
  }

  const handleClickButton = () => {
    const params = new URLSearchParams();
    params.set("search", userInput);
    searchNavigate(`/games?${params.toString()}`);
    setUserInput("");
  };

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg ps-1 pe-1 pe-lg-4 py-1" data-bs-theme="dark">
        <div className="container-fluid" id="container-navbar">
          <Link to="/" className="navbar-brand m-0 p-0">
            <div className="d-flex gap-1 align-items-center">
              <img src="/8bit_heroes_logo.png" alt="8bit_heroes_logo" className="avatar" />
              <div className="navbar-division"></div>
            </div>
          </Link>
          <button
            onClick={closeNav}
            className={navOpen ? "navbar-toggler me-2" : "navbar-toggler collapsed me-2"}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
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
                }}
              >
                <input
                  //
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
                  id="search-navbar"
                  onClick={() => {
                    handleClickButton();
                    closeNav();
                  }}
                >
                  Cerca
                </button>
              </form>
            </div>
            <div className="navbar-icons">
              {/* wishlist */}
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
              {/* cart */}
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
