import { Outlet, NavLink } from "react-router";

export default function DefaultLayout() {
  return (
    <>
      {/* HEADER */}
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <h1 className="navbar-brand mb-0">Navbar</h1>
            <button
              className="navbar-toggler"
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
                  <NavLink to="/" className="nav-link">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/games" className="nav-link">
                    Videogames
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/wishlist" className="nav-link">
                    Wishlist
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/cart" className="nav-link">
                    Carrello
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {/* MAIN */}
      <main>
        <Outlet />
      </main>
    </>
  );
}
