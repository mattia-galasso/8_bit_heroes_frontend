import axios from "axios";
import { useEffect, useState } from "react";

// COMPONENTS
import GameCard from "../components/GameCard";
import WelcomePopUp from "../components/WelcomePopUp";

export default function Homepage() {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [mostSoldProducts, setMostSoldProducts] = useState([]);

  // PER WELCOME
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
      setShowWelcome(true);
    }
  }, []);

  // CHIAMATA OFFERTE
  useEffect(() => {
    axios
      .get("http://localhost:3000/products/discounted")
      .then((res) => setDiscountedProducts(res.data.result));
  }, []);

  // CHIAMATA PIU' VENDUTI
  useEffect(() => {
    axios
      .get("http://localhost:3000/products/sales")
      .then((res) => setMostSoldProducts(res.data.result));
  }, []);

  return (
    <>
      {showWelcome && (
        <>
          <div className="welcome-overlay"></div>
          <WelcomePopUp onClose={() => setShowWelcome(false)} />
        </>
      )}

      <section className="homepage-container">
        {/* HERO */}
        <div className="card-bg hero-space">
          <div className="hero-space-text">
            <h1>
              Il tuo <span className="text-warning">Videogame Store</span> di fiducia
            </h1>
            <p>Giochi fisici e digitali per tutte le piattaforme.</p>
            <p>Spedizione rapida e prezzi competitivi.</p>
          </div>
          <div className="hero-space-image">
            <img src="8bit_heroes_logo.png" alt="Logo" className="img-fluid" />
          </div>
        </div>

        {/* OFFERTE */}
        <section className="card card-bg my-4">
          <h2 className="card-section-title h1 text-center text-warning my-3">OFFERTE EPICHE</h2>
          <div className="row-border rounded-3">
            <div className="row row-cols-2 row-cols-md-4 g-4 mb-3 mt-05 mx-2">
              {discountedProducts.map((product) => (
                <div className="col" key={product.id}>
                  <GameCard product={product} enableHoverOverlay={true} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PIU' VENDUTI */}
        <section className="card card-bg my-4">
          <h2 className="card-section-title h1 text-center text-warning my-3">PIÙ VENDUTI</h2>
          <div className="row-border rounded-3">
            <div className="row row-cols-2 row-cols-md-4 g-4 mb-3 mt-05 mx-2 rounded-3">
              {mostSoldProducts.map((product) => (
                <div className="col" key={product.id}>
                  <GameCard product={product} enableHoverOverlay={true} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}
