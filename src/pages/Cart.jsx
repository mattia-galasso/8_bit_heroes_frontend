
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext.jsx';

export default function Cart() {
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart } = useCart();

  useEffect(() => {
    cart.forEach(element => {
      setTotalPrice(totalPrice + element.price.toFixed(2) * element.quantity)
    });
  }, [cart]);



  return (
    <div className="paddingpage">
      <h1 className="text-white text-center mb-3">Il tuo carrello</h1>
      <div className='d-flex justify-content-between'>
        <p className='fs-4 fw-bold text-white'>{`Prezzo totale: ${totalPrice.toFixed(2)} \u20AC`}</p>
        <div>
          <button className='btn btn-primary'>Effettua ordine</button>
        </div>
      </div>
      <ul className="list-group mb-4">
        <li className="list-group-item cart-list-item text-white">M</li>
      </ul>
    </div>
  );
}
