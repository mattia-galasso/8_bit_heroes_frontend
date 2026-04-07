import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCart } from "../contexts/CartContext";

export default function GameDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

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
    ? product.trailer
        .replace("youtu.be/", "www.youtube.com/embed/")
        .split("?")[0]
    : null;

  return (
    <div className="container my-5 text-light">
      <div className="row g-4 justify-content-center">
        {/* banner */}
        <div className="col-12">
          <img
            src={`http://localhost:3000/videogame_banners/${product.banner_image}`}
            alt={product.name}
            className="img-fluid rounded w-100"
          />
        </div>
        {/* cover */}
        <div className="col-8 col-md-5 col-lg-4">
          <img
            src={`http://localhost:3000/videogame_covers/${product.cover_image}`}
            alt={product.name}
            className="img-fluid rounded shadow"
          />
        </div>
        {/* infos */}
        <div className="col-11 col-md-7 col-lg-8">
          <h1 className="mb-3 text-warning">{product.name}</h1>

          <p>{product.description}</p>

          <ul className="list-group list-group-flush mb-3 rounded shadow-sm">
            {/* Riga PEGI */}
            <li className="list-group-item bg-dark text-light border-secondary py-2 d-flex align-items-center">
              <strong className="me-2">PEGI:</strong>
              <img
                src={`http://localhost:3000/videogame_pegi/PEGI_${product.pegi}.png`}
                alt={`PEGI ${product.pegi}`}
                style={{ width: "30px", height: "auto", display: "block" }}
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </li>

            {/* Riga Copia Digitale */}
            <li className="list-group-item bg-dark text-light border-secondary py-2">
              <strong className="me-2">Copia digitale:</strong>
              <span
                className={
                  product.digital_copy ? "text-success" : "text-danger"
                }
              >
                {product.digital_copy ? "Disponibile" : "Non Disponibile"}
              </span>
            </li>
          </ul>

          {product.price !== product.final_price ? (
            <div className="mb-3">
              <p className="text-decoration-line-through text-danger mb-1">
                € {product.price}
              </p>
              <p className="fs-3 fw-bold text-success mb-2">
                € {product.final_price}
              </p>
              <span className="badge bg-warning">
                -{product.discount_percentage}%
              </span>
            </div>
          ) : (
            <p className="fs-3 fw-bold">€ {product.price}</p>
          )}

          <button
            className="btn btn-primary btn-lg"
            onClick={() => addToCart(product)}
          >
            Aggiungi al carrello
          </button>
        </div>
      </div>
      {/* trailer */}
      {trailerEmbed && (
        <div className="mt-5">
          <h2 className="ms-1 pt-2 mb-3 border-top">Trailer</h2>
          <div className="ratio ratio-16x9">
            <iframe
              src={trailerEmbed}
              title={product.name}
              className="rounded-4"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      {/* requirements */}
      {product.requirements && (
        <div className="mt-5 pt-2 border-top">
          <h3 className="mb-3">Requisiti minimi</h3>
          <ul className="list-group list-group-flush w-75">
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
              <strong>Storage:</strong> {product.requirements.storage}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
