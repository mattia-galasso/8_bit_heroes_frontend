import { Outlet, NavLink, Link } from "react-router";
import Navbar from "../components/Navbar";
import OffcanvasCart from "../components/OffcanvasCart";
import Notification from "../components/Notification";

export default function DefaultLayout() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed-top">
        <Navbar />
      </header>

      {/* NOTIFICATION */}
      <Notification />

      {/* GLOBAL CART OFFCANVAS */}
      <OffcanvasCart />

      {/* MAIN */}
      <main className="main-layout container-custom mx-auto">
        <Outlet />
      </main>
    </>
  );
}
