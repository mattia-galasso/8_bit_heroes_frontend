import { Outlet, NavLink, Link } from "react-router";
import Navbar from "../components/Navbar";

export default function DefaultLayout() {
  return (
    <>
      {/* HEADER */}
      <header className="fixed-top">
        <Navbar />
      </header>
      {/* MAIN */}
      <main className="main-layout container-custom">
        <Outlet />
      </main>
    </>
  );
}
