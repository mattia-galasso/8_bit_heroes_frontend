import { useState } from "react";
import { Link } from "react-router";
import { useFavorites } from "../contexts/FavoritesContext";
import { API_URL } from "../config";

export default function GameCard({ product, enableHoverOverlay }) {
  const { toggleFavorite, isFavorite } = useFavorites();

  // PER OVERLAY
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (enableHoverOverlay) setIsHovered(true);
  };
  const handleMouseLeave = () => {
    if (enableHoverOverlay) setIsHovered(false);
  };

  const isProductDiscounted = (product) => {
    if (!product.start_date || !product.end_date) return false;

    const today = new Date();
    const startDate = new Date(product.start_date);
    const endDate = new Date(product.end_date);

    return product.percentage > 0 && today >= startDate && today <= endDate;
  };

  // prezzo scontato
  const discountedPrice = isProductDiscounted(product)
    ? product.price - product.price * (product.percentage / 100)
    : product.price;

  return (
    <Link
      className="game-card"
      to={`/products/${product.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="position-relative">
        <button
          type="button"
          className="btn position-absolute top-0 end-0 m-2 z-3"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product);
          }}
        >
          <i
            className={`bi ${isFavorite(product.id) ? "bi-heart-fill text-danger" : "bi-heart text-light"} fs-4`}
          />
        </button>
        {isProductDiscounted(product) && (
          <div className="discount-flag fw-bold py-1 px-2">-{product.percentage}%</div>
        )}
        <img
          className="img-fluid rounded-2"
          src={`${API_URL}/videogame_covers/${product.cover_image}`}
          alt={product.name}
        />
        {isHovered && (
          <div className="card-overlay d-flex flex-column justify-content-center align-items-center text-white text-center text-decoration-none py-1 px-2">
            <span className="bg-warning fw-semibold rounded-3 py-1 px-2">{product.name}</span>
            {isProductDiscounted(product) ? (
              <>
                <div className="d-flex align-items-center gap-1">
                  <span className="text-decoration-line-through bg-danger badge py-1 px-2">
                    €{product.price}
                  </span>
                  <span className="bg-info fw-semibold badge py-1 px-2">
                    -{product.percentage}%
                  </span>
                </div>
                <span className="bg-success rounded-3 py-1 px-2">
                  €{discountedPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="bg-success badge py-1 px-2">€{product.price}</span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
