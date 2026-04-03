import { Link, NavLink } from "react-router";

export default function Navbar() {
  return (
    <>
      <div className="navbar-container">
        <nav className="navbar navbar-expand-lg px-1 py-1" data-bs-theme="dark">
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
            <div className="collapse navbar-collapse" id="navbarNav">
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
                {/*                 <li className="nav-item">
                  <NavLink to="/wishlist" className="nav-link fs-5 fw-bold">
                    Wishlist
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link fs-5 fw-bold">
                    Carrello
                  </NavLink>
                </li> */}
              </ul>
            </div>
          </div>
        </nav >
      </div >
    </>
  );
}
