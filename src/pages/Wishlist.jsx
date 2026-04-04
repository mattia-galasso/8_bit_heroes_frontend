import { useWishlist } from "../contexts/WishlistContext";
export default function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <div className="paddingpage text-center">
      <h1 className="text-warning homepage-section-title">Wishlist</h1>

      <div className="d-flex flex-column gap-3 my-4">
        {wishlist.map((game) => {
          const percentage = game.percentage || 0;
          const final_price = Number(game.price) - Number(game.price) * (percentage / 100);

          return <div key={game.id} className="card card-bg border-secondary p-3">
            <Link to={`/products/${game.slug}`} className=" d-block text-decoration-none">
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
                  <h4 className="mb-2">{game.name}</h4>
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
            </Link>
          </div>
        })}
      </div>

    </div>
  );
}
