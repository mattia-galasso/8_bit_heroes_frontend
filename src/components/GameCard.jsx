import { useState } from "react";
import { Link } from "react-router";

export default function GameCard({ product, enableHoverOverlay }) {
  // PER OVERLAY
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    if (enableHoverOverlay) setIsHovered(true);
  };
  const handleMouseLeave = () => {
    if (enableHoverOverlay) setIsHovered(false);
  };

  // prezzo scontato
  const discountedPrice = product.price - product.price * (product.percentage / 100);

  return (
    <Link
      className="game-card"
      to={`/products/${product.slug}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="position-relative">
        {product.percentage > 0 && (
          <div className="discount-flag fw-bold py-1 px-2">-{product.percentage}%</div>
        )}
        <img
          className="img-fluid rounded-2"
          src={`http://localhost:3000/videogame_covers/${product.cover_image}`}
          alt={product.name}
        />
        {isHovered && (
          <ul className="card-overlay list-unstyled text-white text-center text-decoration-none p-3 mb-5 d-flex flex-column gap-3 align-items-center justify-content-center">
            <li className="bg-warning fw-semibold rounded-3 py-1 px-3">{product.name}</li>
            {product.percentage > 0 ? (
              <>
                <li className="text-decoration-line-through bg-danger rounded-3 py-1 px-3">
                  €{product.price}
                </li>
                <li className="bg-success rounded-3 fs-5 py-1 px-3">
                  €{discountedPrice.toFixed(2)}
                </li>
                <li className="bg-info fw-semibold rounded-3 py-1 px-3">-{product.percentage}%</li>
              </>
            ) : (
              <li className="bg-success rounded-3 py-1 px-3">€{product.price}</li>
            )}
          </ul>
        )}
      </div>
    </Link>
  );
}
