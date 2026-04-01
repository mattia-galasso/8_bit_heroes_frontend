import axios from "axios";
import { useEffect, useState } from "react";

import GameCard from "../components/GameCard";

export default function Homepage() {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [mostSoldProducts, setMostSoldProducts] = useState([]);

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
        <h2 className="homepage-section-title h1 text-center text-warning my-1">OFFERTE EPICHE</h2>
        <div className="card card-bg py-3">
          <ul className="list-unstyled d-flex justify-content-evenly m-0">
            {discountedProducts.map((product) => (
              <GameCard product={product} key={product.id} />
            ))}
          </ul>
        </div>
      </section>

      {/* PIU' VENDUTI */}
      <section className="card card-bg">
        <h2 className="homepage-section-title h1 text-center text-warning my-1">I PIÙ VENDUTI</h2>
        <div className="card card-bg py-3">
          <ul className="list-unstyled d-flex justify-content-evenly mb-0">
            {mostSoldProducts.map((product) => (
              <GameCard product={product} key={product.id} />
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
}
