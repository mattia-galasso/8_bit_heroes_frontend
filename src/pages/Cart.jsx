import '../assets/css/cartpage.css';

export default function Cart() {
  return (
    <div className="container my-4">
      <h1 className="text-white text-center mb-3">Il tuo carrello</h1>
      <ul className="list-group">
        <li className="list-group-item cart-list-item text-white">M</li>
        <li className="list-group-item cart-list-item">a</li>
        <li className="list-group-item cart-list-item">a</li>
        <li className="list-group-item cart-list-item">r</li>
        <li className="list-group-item cart-list-item">c</li>
        <li className="list-group-item cart-list-item">O</li>

      </ul>
    </div>
  );
}
