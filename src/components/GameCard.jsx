import { Link } from "react-router";

export default function GameCard({ product }) {
  return (
    <Link to={`products/${product.slug}`} className="game-card">
      <img
        className="img-fluid rounded-2"
        src={`http://localhost:3000/videogame_covers/${product.cover_image}`}
        alt={product.name}
      />
    </Link>
  );
}
