export default function GameCard({ product }) {
  return (
    <div className="card">
      <ul className="list-unstyled">
        <li>{product.name}</li>
        <li>{product.price}€</li>
      </ul>
    </div>
  );
}
