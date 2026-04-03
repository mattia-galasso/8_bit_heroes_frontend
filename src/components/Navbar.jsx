import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useSearchContext } from "../contexts/SearchContext";

export default function Navbar() {
  const [userInput, setUserInput] = useState("");
  const { setSearchNavbarParams } = useSearchContext();
  const searchNavigate = useNavigate();

  const handleClickButton = () => {
    const params = new URLSearchParams();
    params.set("search", userInput);
    setSearchNavbarParams(params.toString());
    searchNavigate(`/games?${params.toString()}`);
  };

  return (
    <>
      <div className="navbar-container">
        <nav
          className="navbar navbar-expand-lg ps-1 pe-1 pe-lg-4 py-1"
          data-bs-theme="dark"
        >
          <div className="container-fluid" id="container-navbar">
            <Link to="/" className="navbar-brand m-0 p-0">
              <div className="d-flex gap-1 align-items-center">
                <img
                  src="/8bit_heroes_logo.png"
                  alt="8bit_heroes_logo"
                  className="avatar"
                />
                <div className="navbar-division"></div>
              </div>
            </Link>
            <button
              className="navbar-toggler me-2"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse gap-5" id="navbarNav">
              <div>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <NavLink to="/" className="nav-link fs-5 fw-bold">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/games" className="nav-link fs-5 fw-bold">
                      Videogames
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="search-input-navbar my-3">
                <div className="d-flex">
                  <div className="input-group">
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
                      onClick={handleClickButton}
                    >
                      Cerca
                    </button>
                  </div>
                </div>
              </div>
              <div className="navbar-icons">
                <button className="btn btn-outline-light my-3">
                  <NavLink to="/wishlist" className="nav-link fs-5">
                    <i className="bi bi-heart"></i>
                  </NavLink>
                </button>
                <button className="btn btn-outline-light my-3">
                  <NavLink to="/cart" className="nav-link fs-5">
                    <i className="bi bi-cart"></i>
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
