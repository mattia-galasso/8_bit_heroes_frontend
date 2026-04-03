
import { useCart } from '../contexts/CartContext.jsx';

export default function Cart() {
  const { cart,addToCart, removeFromCart } = useCart();

  const totalPrice = cart.reduce((total, item) => {
    return total + Number(item.final_price) * item.quantity;
  }, 0);

  return (
    <div className="paddingpage">
      <h1 className="text-white text-center mb-3">Il tuo carrello</h1>
      <p className='fs-4 fw-bold text-white'>{`Prezzo totale: ${totalPrice.toFixed(2)} \u20AC`}</p>
      <ul className="list-group mb-4">
        {cart.map((product) => {
          return (
            <li className="list-group-item cart-list-item text-white" key={product.id}>
              <div className='d-flex flex-column align-items-center flex-sm-row gap-4'>
                <div className='game-card'>
                  <img src={`http://localhost:3000/videogame_covers/${product.cover_image}`} alt={product.aname} />
                </div>
                <div>
                  <h1 className='fs-2'>{product.name}</h1>
                  <p>{product.description}</p>
                  <div>
                    <div className='btn-group fs-5'>
                      <button onClick={() => removeFromCart(product.id)} className='btn btn-light py-0 px-1'>{product.quantity === 1 ?<i class="bi bi-trash text-danger"></i>:<i className="bi bi-dash"></i>}</button>
                      <p className='m-0 px-2 border border-light'>{product.quantity}</p>
                      <button onClick={() => addToCart(product)}className='btn btn-light py-0 px-1'><i className="bi bi-plus p-0 m-0"></i></button>
                    </div>
                    <p className='text-end fs-4'>{`\u20AC ${product.final_price}`}</p>
                  </div>
                </div>
              </div>
            </li>


          )

        })}
      </ul>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-primary'>Effettua ordine</button>
      </div>
    </div>
  );
}
