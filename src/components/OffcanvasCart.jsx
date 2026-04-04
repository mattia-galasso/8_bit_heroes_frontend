import { Link, useNavigate } from "react-router";

import { useCart } from "../contexts/CartContext.jsx";

export default function OffcanvasCart() {
  const { cart, addToCart, removeFromCart, toggleDigitalCopy } = useCart();
  const navigateTo = useNavigate();
  const totalPrice = cart.reduce((total, item) => {
    return total + Number(item.final_price) * item.quantity;
  }, 0);

  return (
    <>
      {/* RIMUOVERE CLASSE SHOW PRIMA DI UTILIZZARLO E AGGIUNGERE CLASSE offcanvas-end */}

      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvas"
      >
        <div className="offcanvas-header d-block">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="offcanvas-title" id="offcanvasRightLabel">
              Carrello
            </h5>
            <div>
              <div
                className="btn-group pe-2"
                role="group"
                aria-label="CartOffcanvas"
                data-bs-dismiss="offcanvas"
              >
                <Link to={`/cart`} className="btn btn-outline-light" type="button">
                  <i className="bi bi-box-arrow-up-right"></i>
                </Link>
                <button type="button" className="btn btn-outline-light" aria-label="Close">
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="division-offcanvas-top"></div>
        </div>
        <div className="offcanvas-body d-flex flex-column">
          <div className="flex-grow-1 overflow-auto cart-offcanvas-body">
            {cart.map((game) => {
              return (
                <div key={game.id} className="card card-bg cart-list-item border-secondary p-3">
                  <div
                    onClick={(e) => {
                      if (e.target.closest("button, input, label")) return;
                      navigateTo(`/products/${game.slug}`);
                    }}
                    className=" d-block text-decoration-none"
                    data-bs-dismiss="offcanvas"
                  >
                    <div className="row g-3 align-items-center">
                      <div className="col-4 game-card">
                        <div className="position-relative">
                          <img
                            className="img-fluid rounded-2"
                            src={`http://localhost:3000/videogame_covers/${game.cover_image}`}
                            alt={game.name}
                          />
                        </div>
                      </div>

                      <div className="col-8 text-white align-self-start mt-4">
                        <h4 className="title-offcanvas">{game.name}</h4>
                        <div>
                          <div className="btn-group fs-5 my-2">
                            <button
                              onClick={() => removeFromCart(game.id)}
                              className="btn btn-light py-0 px-1"
                            >
                              {game.quantity === 1 ? (
                                <i className="bi bi-trash text-danger"></i>
                              ) : (
                                <i className="bi bi-dash"></i>
                              )}
                            </button>
                            <p className="m-0 px-2 border border-light">{game.quantity}</p>
                            <button
                              onClick={() => addToCart(game)}
                              className="btn btn-light py-0 px-1"
                            >
                              <i className="bi bi-plus p-0 m-0"></i>
                            </button>
                          </div>

                          <div className="form-check mt-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={game.copyInDigital || false}
                              onClick={(e) => {
                                e.stopPropagation;
                              }}
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
                          <div className="p-relative">
                            <p className="text-end fs-4 price-offcanvas">{`\u20AC ${game.final_price}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="division-offcanvas-bottom"></div>
          <p className="fs-5 fw-bold text-white m-2">{`Totale: \u20AC ${totalPrice.toFixed(2)}`}</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary">Effettua ordine</button>
          </div>
        </div>
      </div>
    </>
  );
}
