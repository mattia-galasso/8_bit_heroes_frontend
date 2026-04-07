import { useState } from "react";
import { Link } from "react-router";
import { useFavorites } from "../contexts/FavoritesContext";

export default function GameCard({ product, enableHoverOverlay }) {

  const  {toggleFavorite,isFavorite} =useFavorites()

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

        <button
        type="button"
        className="btn position-absolute top-0 end-0 m-2 z-3"
        onClick={(e)=>{
          e.preventDefault()
          e.stopPropagation()
          toggleFavorite(product)
        }}
        >
          <i className= 
          {`bi ${isFavorite(product.id)
            ? "bi-heart-fill text-danger"
            : "bi-heart text-light"
          } fs-4`}>
          </i>

        </button>
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
