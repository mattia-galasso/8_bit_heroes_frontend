import { Outlet, NavLink, Link } from "react-router";
import Navbar from "../components/Navbar";
import OffcanvasCart from "../components/OffcanvasCart";

export default function DefaultLayout() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed-top">
        <Navbar />
      </header>
      {/* GLOBAL CART OFFCANVAS */}
      <OffcanvasCart />
      {/* MAIN */}
      <main className="main-layout container-custom">
        <Outlet />
      </main>
    </>
  );
}
