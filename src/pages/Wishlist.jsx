import { useFavorites } from "../contexts/FavoritesContext";
import { useNavigate } from "react-router";
export default function Wishlist() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const navigateTo = useNavigate();

  return (
    <div className="paddingpage">
      <h1 className="text-warning homepage-section-title text-center">Wishlist</h1>

      <div className="d-flex flex-column gap-3 my-4">
        {favorites.map((game) => {
          const percentage = game.percentage || 0;
          const final_price = Number(game.price) - Number(game.price) * (percentage / 100);

          return <div key={game.id} className="card card-bg cart-list-item cart-item border-secondary p-3">
            <div onClick={(e) => {
              if (e.target.closest("button, input, label")) return;
              navigateTo(`/products/${game.slug}`);
            }} className=" d-block text-decoration-none">
              <div className="row g-4 align-items-center">
                <div className="col-12 col-sm-4 col-md-2 game-card">
                  <div className="position-relative">
                    {percentage > 0 && (
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

                <div className="col-12 col-sm-8 col-md-10 text-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-2">{game.name}</h4>
                    <button type="button" className="btn p-0" onClick={(e) =>{ e.stopPropagation(); toggleFavorite(game)}}>
                      <i
                        className={`bi ${isFavorite(game.id) ? "bi-heart-fill text-danger" : "bi-heart text-light"} fs-3`}
                      />
                    </button>
                  </div>
                  <p className="mb-0">{game.description}</p>

                  <div>
                    {percentage > 0 ? (
                      <div className="mb-3">
                        <p className="text-decoration-line-through text-danger mb-1">
                          € {game.price}
                        </p>
                        <p className="fs-3 fw-bold text-success mb-2">
                          € {final_price.toFixed(2)}
                        </p>
                        <span className="badge bg-warning">-{percentage}%</span>
                      </div>
                    ) : (
                      <p className="fs-3 fw-bold">€ {game.price}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>

    </div>
  );
}
