export default function GameCard({ product }) {
  return (
    <div className="game-card ">
      <img
        className="img-fluid rounded-2"
        src={`http://localhost:3000/videogame_covers/${product.cover_image}`}
        alt={product.name}
      />
    </div>
  );
}
