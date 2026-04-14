import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import OffcanvasCart from "../components/OffcanvasCart";
import Notification from "../components/Notification";
import { useLoading } from "../contexts/LoadingContext";
import Loading from "../components/Loading";

export default function DefaultLayout() {
  const { isLoading } = useLoading();

  return (
    <>
      {/* HEADER */}
      <header className="fixed-top">
        <Navbar />
      </header>
      <main>
        {/* LOADING */}
        {isLoading && <Loading />}

        {/* NOTIFICATION */}
        <Notification />

        {/* GLOBAL CART OFFCANVAS */}
        <OffcanvasCart />

        {/* MAIN */}
        <div className="main-layout container-custom mx-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
}
