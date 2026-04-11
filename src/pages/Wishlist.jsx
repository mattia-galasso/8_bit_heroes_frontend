import { useState } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import { useNavigate } from "react-router";
import ClearModal from "../components/ClearModal";

export default function Wishlist() {
  const { favorites, toggleFavorite, isFavorite, clearFavorites } = useFavorites();
  const [openClearModal, setOpenClearModal] = useState(false);
  const navigateTo = useNavigate();

  const handleClear = () => setOpenClearModal(true);

  const isProductDiscounted = (product) => {
    if (!product.start_date || !product.end_date) return false;

    const today = new Date();
    const startDate = new Date(product.start_date);
    const endDate = new Date(product.end_date);

    return product.percentage > 0 && today >= startDate && today <= endDate;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-warning wishlist-section-title m-0">Wishlist</h1>
        {favorites.length > 0 && (
          <button type="button" className="btn btn-outline-danger mt-1" onClick={handleClear}>
            <i className="bi bi-trash3 me-2" />
            Svuota wishlist
          </button>
        )}
      </div>

      <div className="d-flex flex-column gap-3 my-4">
        {favorites.length === 0 ? (
          <div className="text-center text-light py-5">
            <h3 className="text-warning mb-3">La tua wishlist è vuota</h3>
            <p className="mb-0">Aggiungi qualche gioco ai preferiti per vederlo qui 🎮</p>
          </div>
        ) : (
          favorites.map((game) => {
            const percentage = game.percentage || 0;
            const final_price = isProductDiscounted(game)
              ? Number(game.price) - Number(game.price) * (percentage / 100)
              : Number(game.price);

            return (
              <div
                key={game.id}
                className="card card-bg cart-list-item cart-item border-secondary p-3 position-relative"
              >
                <div
                  onClick={(e) => {
                    if (e.target.closest("button, input, label")) return;
                    navigateTo(`/products/${game.slug}`);
                  }}
                  className=" d-block text-decoration-none"
                >
                  <div className="row g-4 align-items-center">
                    <div className="col-12 col-sm-4 col-md-4 col-lg-3 game-card">
                      <div className="position-relative">
                        {isProductDiscounted(game) && (
                          <div className="discount-flag fw-bold fs-5 bg-danger py-1 px-3">
                            -{percentage}%
                          </div>
                        )}
                        <img
                          className="img-fluid rounded-2"
                          src={`http://localhost:3000/videogame_covers/${game.cover_image}`}
                          alt={game.name}
                        />
                      </div>
                    </div>

                    <div className="col-12 col-sm-8 col-md-8 col-lg-9 text-light">
                      <h3 className="mb-2 list-card-title">{game.name}</h3>
                      <button
                        type="button"
                        className="btn favorite-btn position-absolute bottom-0 end-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(game);
                        }}
                      >
                        <i
                          className={`bi ${isFavorite(game.id) ? "bi-heart-fill text-danger" : "bi-heart text-light"} fs-3`}
                        />
                      </button>

                      <p className="mb-0">{game.description}</p>

                      <div>
                        {isProductDiscounted(game) ? (
                          <div className="mb-3">
                            <p className="text-decoration-line-through text-danger mb-1">
                              € {game.price}
                            </p>
                            <p className="fs-3 fw-bold text-success mb-2">
                              € {final_price.toFixed(2)}
                            </p>
                            <span className="badge bg-info fw-semibold">-{percentage}%</span>
                          </div>
                        ) : (
                          <p className="fs-3 fw-bold">€ {game.price}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {/* clear modal */}
      {openClearModal && (
        <ClearModal
          setOpenClearModal={setOpenClearModal}
          onClear={clearFavorites}
          itemName="Wishlist"
          successMessage="Wishlist svuotata con successo!"
          notificationType="info"
        />
      )}
    </div>
  );
}
