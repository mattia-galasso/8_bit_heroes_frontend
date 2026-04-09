import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCart } from "../contexts/CartContext";
import GameCard from "../components/GameCard";
import { useFavorites } from "../contexts/FavoritesContext";

export default function GameDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${slug}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Errore nella chiamata al backend");
      });
  }, [slug]);

  if (error) return <p className="container mt-4">{error}</p>;
  if (!product) return <p className="container mt-4">Caricamento...</p>;

  const trailerEmbed = product.trailer
    ? product.trailer.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0]
    : null;

  return (
    <div className="details-container my-5 text-light">
      <div className="row g-4 justify-content-center">
        {/* banner */}
        <div className="col-12 border-bottom pb-3">
          <img
            src={`http://localhost:3000/videogame_banners/${product.banner_image}`}
            alt={product.name}
            className="img-fluid rounded w-100"
          />
        </div>

        {/* cover */}
        <div className="col-8 col-md-5 col-lg-4 mt-3">
          <img
            src={`http://localhost:3000/videogame_covers/${product.cover_image}`}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>

        {/* infos */}
        <section className="col-11 col-md-7 col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="product-title mt-2 text-warning">{product.name}</h1>
            <button type="button" className="btn p-0" onClick={() => toggleFavorite(product)}>
              <i
                className={`bi ${isFavorite(product.id) ? "bi-heart-fill text-danger" : "bi-heart text-light"} fs-3`}
              />
            </button>
          </div>

          <p>{product.description}</p>

          <ul className="list-group list-group-flush mb-3 rounded shadow-sm">
            {/* Riga PEGI */}
            <li className="list-group-item bg-dark text-light border-secondary py-2 d-flex align-items-center">
              <strong className="me-2">PEGI:</strong>
              <img
                src={`http://localhost:3000/videogame_pegi/PEGI_${product.pegi}.png`}
                alt={`PEGI ${product.pegi}`}
                style={{ width: "40px", height: "auto", display: "block" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </li>

            {/* Riga Copia Digitale */}
            <li className="list-group-item bg-dark text-light border-secondary py-2">
              <strong className="me-2">Copia digitale:</strong>
              <span className={product.digital_copy ? "text-success" : "text-danger"}>
                {product.digital_copy ? "Disponibile" : "Non Disponibile"}
              </span>
            </li>
          </ul>

          {product.price !== product.final_price ? (
            <div className="mb-3">
              <p className="text-decoration-line-through text-danger mb-1">€ {product.price}</p>
              <div className="d-flex align-items-center gap-3">
                <p className="fs-3 fw-bold text-success mb-1">€ {product.final_price}</p>
                <span className="badge bg-info fw-semibold">-{product.discount_percentage}%</span>
              </div>
            </div>
          ) : (
            <p className="fs-3 fw-bold">€ {product.price}</p>
          )}

          <button className="btn btn-warning btn-lg" onClick={() => addToCart(product)}>
            Aggiungi al carrello
          </button>
        </section>
      </div>

      {/* related */}
      <section className="card card-bg my-4">
        <h2 className="card-section-title h1 text-center text-warning my-3">Prodotti Correlati</h2>
        <div className="row-border rounded-3">
          <div className="row row-cols-2 row-cols-md-4 g-4 mb-3 mt-05 mx-2">
            {product.relatedProducts.map((related) => (
              <div className="col" key={related.id}>
                <GameCard product={related} enableHoverOverlay={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* trailer */}
      {trailerEmbed && (
        <section className="mt-5 pb-4 border-top border-bottom">
          <h2 className="ms-1 pt-2 mb-3">Trailer</h2>
          <div className="ratio ratio-16x9">
            <iframe
              src={trailerEmbed}
              title={product.name}
              className="rounded-4"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}

      {/* requirements */}
      {product.requirements && (
        <div className="accordion mt-3" data-bs-theme="dark" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-semibold fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <span className="ms-1">Requisiti minimi</span>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-dark text-light border-secondary">
                    <strong>Sistema operativo:</strong> {product.requirements.os}
                  </li>
                  <li className="list-group-item bg-dark text-light border-secondary">
                    <strong>GPU:</strong> {product.requirements.gpu}
                  </li>
                  <li className="list-group-item bg-dark text-light border-secondary">
                    <strong>RAM:</strong> {product.requirements.ram}
                  </li>
                  <li className="list-group-item bg-dark text-light border-secondary">
                    <strong>Archiviazione:</strong> {product.requirements.storage}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
