
import { useCart } from '../contexts/CartContext.jsx';
import { useNavigate } from 'react-router';

export default function Cart() {
  const { cart, addToCart, removeFromCart, toggleDigitalCopy } = useCart();
  const navigateTo = useNavigate();

  const totalPrice = cart.reduce((total, item) => {
    return total + Number(item.final_price) * item.quantity;
  }, 0);

  return (
    <div className="paddingpage">
      <h1 className="text-warning text-center mb-3">Il tuo carrello</h1>
      <p className='fs-4 fw-bold text-white'>{`Totale: \u20AC ${totalPrice.toFixed(2)}`}</p>

      <div className="d-flex flex-column gap-3 my-4">
        {cart.map((game) => {
          return (
            <div key={game.id} className="card card-bg cart-list-item border-secondary p-3">
              <div onClick={(e) => {
                if (e.target.closest("button, input, label")) return;
                navigateTo(`/products/${game.slug}`)}} className=" d-block text-decoration-none">
                <div className="row g-3 align-items-center">
                  <div className="col-12 col-sm-4 col-md-2 game-card">
                    <div className="position-relative">
                      <img
                        className="img-fluid rounded-2"
                        src={`http://localhost:3000/videogame_covers/${game.cover_image}`}
                        alt={game.name}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-8 col-md-10 text-white">
                    <h4 className="mb-2">{game.name}</h4>
                    <p className="mb-0">
                      {game.description}
                    </p>
                    <div>
                      <div className='btn-group fs-5 mt-2'>
                        <button onClick={() => removeFromCart(game.id)} className='btn btn-light py-0 px-1'>{game.quantity === 1 ? <i className="bi bi-trash text-danger"></i> : <i className="bi bi-dash"></i>}</button>
                        <p className='m-0 px-2 border border-light'>{game.quantity}</p>
                        <button onClick={() => addToCart(game)} className='btn btn-light py-0 px-1'><i className="bi bi-plus p-0 m-0"></i></button>
                      </div>
                      <div className='d-flex justify-content-between'>
                        <div className="form-check mt-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={game.copyInDigital || false}
                            onClick={(e) => {e.stopPropagation}}
                            onChange={() => toggleDigitalCopy(game.id)}
                            id={`digital-${game.id}`}
                          />
                          <label
                            className="form-check-label text-light"
                            htmlFor={`digital-${game.id}`}
                          >
                            Copia digitale
                          </label>
                        </div>
                      <p className='text-end fs-4'>{`\u20AC ${game.final_price}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className='d-flex justify-content-end'>
        <button className='btn btn-primary'>Effettua ordine</button>
      </div>
    </div>
  );
}
