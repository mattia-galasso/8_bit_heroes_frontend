import { useState } from "react";
import CheckoutForm from "../components/CheckoutForm.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import { useNavigate } from "react-router";
import DeleteFromCartModal from "../components/DeleteFromCartModal.jsx";

export default function Cart() {
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [gameToDelete, setGameToDelete] = useState();
  const { cart, addToCart, removeFromCart, toggleDigitalCopy } = useCart();
  const navigateTo = useNavigate();

  const totalPrice = cart.reduce((total, item) => {
    return total + Number(item.final_price) * item.quantity;
  }, 0);

  if (openForm) {
    // blocca lo scroll del documento quando la modale del form si apre
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = "15px"; // compensa la larghezza della scrollbar
  } else {
    document.body.style.overflow = "auto";
    document.body.style.paddingRight = "0";
  }

  return (
    <>
      <div className="paddingpage">
        <h1 className="text-white text-center mb-3">
          Il tuo
          <span className="text-warning card-section-title"> carrello</span>
        </h1>

        <div className="d-flex justify-content-between align-items-center">
          <div className="fs-4 fw-bold text-white">{`Totale: \u20AC${totalPrice.toFixed(2)}`}</div>
          <button onClick={() => setOpenForm(true)} className="btn btn-warning btn-lg">
            Effettua ordine
          </button>
        </div>

        {cart.length === 0 ? (
          <h2 className="text-white text-center mt-5">Il tuo carrello è vuoto</h2>
        ) : (
          <div className="d-flex flex-column gap-3 my-4">
            {cart.map((game) => {
              return (
                <div key={game.id} className="card cart-list-item cart-item border-secondary p-3">
                  <div
                    onClick={(e) => {
                      if (e.target.closest("button, input, label")) return;
                      navigateTo(`/products/${game.slug}`);
                    }}
                    className=" d-block text-decoration-none"
                  >
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
                        <p className="mb-0">{game.description}</p>
                        <div>
                          <div className="btn-group fs-4 mt-2">
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
                                >
                                  <i className="bi bi-trash text-danger"></i>
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => removeFromCart(game.id, game.name)}
                                  className="btn btn-light py-0 px-1"
                                >
                                  <i className="bi bi-dash"></i>
                                </button>
                              </>
                            )}
                            <p className="m-0 px-2 border border-light">{game.quantity}</p>
                            <button
                              onClick={() => addToCart(game)}
                              className="btn btn-light py-0 px-1"
                            >
                              <i className="bi bi-plus p-0 m-0"></i>
                            </button>
                          </div>
                          <div className="d-flex justify-content-center align-items-between flex-column flex-sm-row justify-content-sm-between align-items-sm-center">
                            <div className="form-check mt-2 fs-4">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={game.copyInDigital || false}
                                onClick={(e) => {
                                  e.stopPropagation();
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
                            <p className="text-end fs-4 fw-bold m-0">{`\u20AC ${game.final_price}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {openForm && <CheckoutForm openForm={openForm} setOpenForm={setOpenForm} />}
      {openDeleteModal && (
        <DeleteFromCartModal gameToDelete={gameToDelete} setOpenDeleteModal={setOpenDeleteModal} />
      )}
    </>
  );
}
