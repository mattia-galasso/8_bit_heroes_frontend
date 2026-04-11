import { Link, useNavigate } from "react-router";

import { useCart } from "../contexts/CartContext.jsx";
import { useNotificationContext } from "../contexts/NotificationContext.jsx";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm.jsx";
import DeleteFromCartModal from "./DeleteFromCartModal.jsx";

export default function OffcanvasCart() {
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [gameToDelete, setGameToDelete] = useState();
  const { cart, addToCart, removeFromCart, toggleDigitalCopy } = useCart();
  const { showNotification } = useNotificationContext();
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
                  <i className="bi bi-box-arrow-up-right" />
                </Link>
                <button type="button" className="btn btn-outline-light" aria-label="Close">
                  <i className="bi bi-x-lg" />
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
                  >
                    <div className="row g-3 align-items-center">
                      <div className="col-4 game-card">
                        <div className="position-relative">
                          <img
                            className="img-fluid rounded-2"
                            src={`http://localhost:3000/videogame_covers/${game.cover_image}`}
                            alt={game.name}
                            data-bs-dismiss="offcanvas"
                          />
                        </div>
                      </div>

                      <div className="col-8 text-white align-self-start mt-4">
                        <h4 className="title-offcanvas">{game.name}</h4>
                        <div>
                          <div className="btn-group fs-5 my-2">
                            {game.quantity === 1 ? (
                              <>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setGameToDelete(game);
                                    setOpenDeleteModal(true);
                                  }}
                                  type="button"
                                  className="btn btn-light py-0 px-1"
                                  data-bs-dismiss="offcanvas"
                                >
                                  <i className="bi bi-trash text-danger" />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => removeFromCart(game.id, game.name)}
                                  className="btn btn-light py-0 px-1"
                                >
                                  <i className="bi bi-dash" />
                                </button>
                              </>
                            )}
                            <p className="m-0 px-2 border border-light">{game.quantity}</p>
                            <button
                              onClick={() => addToCart(game)}
                              className="btn btn-light py-0 px-1"
                            >
                              <i className="bi bi-plus p-0 m-0" />
                            </button>
                          </div>

                          <div className={game.digital_copy ? "form-check mt-2" : "d-none"}>
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
                            <p className="text-end fs-4 price-offcanvas">{`\u20AC${game.final_price}`}</p>
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
          <div className="d-flex justify-content-between my-2 align-items-center">
            <div className="fs-5 fw-bold text-white ms-1">{`Totale: \u20AC${totalPrice.toFixed(2)}`}</div>
            <button
              onClick={() => {
                if (cart.length === 0) {
                  setOpenForm(false);
                  showNotification(
                    "Il carrello è vuoto. Non puoi effettuare ordini se non ci sono elementi nel carrello.",
                    "warning",
                  );
                } else {
                  setOpenForm(true);
                }
              }}
              className="btn btn-warning me-2"
              data-bs-dismiss="offcanvas"
            >
              Effettua ordine
            </button>
          </div>
        </div>
      </div>

      {openForm && <CheckoutForm openForm={openForm} setOpenForm={setOpenForm} />}
      {openDeleteModal && (
        <DeleteFromCartModal gameToDelete={gameToDelete} setOpenDeleteModal={setOpenDeleteModal} />
      )}
    </>
  );
}
