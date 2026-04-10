import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import GameCard from "../components/GameCard";
import { useFavorites } from "../contexts/FavoritesContext";

// CONTEXT
import { useNotificationContext } from "../contexts/NotificationContext";
import { useLoading } from "../contexts/LoadingContext";

export default function VideogamesList() {
  //* useState Constant
  const [viewMode, setViewMode] = useState("grid");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [games, setGames] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [searchParams, setSearchParams] = useSearchParams();
  const { showNotification } = useNotificationContext();
  const { startLoading, endLoading } = useLoading();
  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    startLoading();

    let url = "http://localhost:3000/products";

    if (sortBy === "price_asc") url += "?field=price&order=asc";

    if (sortBy === "price_desc") url += "?field=price&order=desc";

    if (sortBy === "name_asc") url += "?field=name&order=asc";

    if (sortBy === "name_desc") url += "?field=name&order=desc";

    if (sortBy === "default") url += "";

    //* Axios
    axios
      .get(url)
      .then((res) => {
        setGames(res.data.result);
        endLoading();
      })
      .catch((err) => {
        console.log(err.message);
        endLoading();
        showNotification(`Qualcosa è andato storto con il caricamento!`, "danger");
      });
  }, [sortBy]);

  //* Function Query Params Ordering
  const handleClickViewMode = (viewMode) => {
    const params = new URLSearchParams(searchParams);
    params.set("viewmode", viewMode);
    setSearchParams(params);
  };

  const handleClickDiscounted = (isDiscounted) => {
    const params = new URLSearchParams(searchParams);
    params.set("discounted", isDiscounted);
    setSearchParams(params);
  };

  const handleOrderingProducts = (ordering) => {
    const params = new URLSearchParams(searchParams);
    params.set("ordering", ordering);
    setSearchParams(params);
  };

  const isProductDiscounted = (product) => {
    if (!product.start_date || !product.end_date) return false;

    const today = new Date();
    const startDate = new Date(product.start_date);
    const endDate = new Date(product.end_date);

    return product.percentage > 0 && today >= startDate && today <= endDate;
  };

  const viewsParams = () => {
    const viewmode = searchParams.get("viewmode") || "grid";
    setViewMode(viewmode);

    const discounted = searchParams.get("discounted") === "true";
    setOnlyDiscounted(discounted);

    const ordering = searchParams.get("ordering") || "default";
    setSortBy(ordering);
  };

  useEffect(viewsParams, [searchParams]);

  if (!games) return;

  const today = new Date();

  const visibleGames = onlyDiscounted
    ? games.filter(
        (game) =>
          (game.percentage || 0) > 0 &&
          today >= new Date(game.start_date) &&
          today <= new Date(game.end_date),
      )
    : games;

  return (
    <>
      <section className="page-container">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 gap-lg-2 my-4">
          <h1 className="text-warning ms-1 mb-0">Tutti i videogiochi</h1>

          <div className="d-flex flex-wrap align-items-center gap-2 me-1">
            <select
              className="form-select bg-dark text-light border-warning"
              value={sortBy === "default" ? "" : sortBy}
              onChange={(e) => {
                const value = e.target.value;
                setSortBy(value === "" ? "default" : value);
                handleOrderingProducts(value === "" ? "default" : value);
              }}
              style={{ width: "130px" }}
            >
              <option value="" hidden>
                Ordina
              </option>

              <option value="default">Default</option>
              <option value="price_asc">Prezzo ↑</option>
              <option value="price_desc">Prezzo ↓</option>
              <option value="name_asc">Nome A-Z</option>
              <option value="name_desc">Nome Z-A</option>
            </select>
            <button
              className={`btn ${onlyDiscounted ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() => {
                setOnlyDiscounted(!onlyDiscounted);
                handleClickDiscounted(!onlyDiscounted);
              }}
            >
              Scontati <i className="bi bi-percent" />
            </button>

            <div className="btn-group">
              <button
                className={`btn btn-${viewMode === "grid" ? "warning" : "outline-warning"}`}
                onClick={() => {
                  setViewMode("grid");
                  handleClickViewMode("grid");
                }}
              >
                <i className="bi bi-grid-3x3-gap" /> Griglia
              </button>

              <button
                className={`btn btn-${viewMode === "list" ? "warning" : "outline-warning"}`}
                onClick={() => {
                  setViewMode("list");
                  handleClickViewMode("list");
                }}
              >
                <i className="bi bi-list-task" /> Lista
              </button>
            </div>
          </div>
        </div>

        {viewMode === "grid" ? (
          <section className="card card-bg my-4">
            <div className="card card-bg p-4">
              <ul className="row row-cols-2 row-cols-sm-4 g-3 mb-0 list-unstyled">
                {visibleGames.map((game) => (
                  <li key={game.id} className="col">
                    <GameCard product={game} enableHoverOverlay={true} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : (
          <div className="list-view d-flex flex-column gap-3 my-4">
            {visibleGames.map((game) => {
              const percentage = game.percentage || 0;
              const final_price = isProductDiscounted(game)
                ? Number(game.price) - Number(game.price) * (percentage / 100)
                : Number(game.price);

              return (
                <div key={game.id} className="card card-bg border-secondary p-3 position-relative">
                  <button
                    type="button"
                    className="btn position-absolute top-0 end-0 m-2 z-3"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(game);
                    }}
                  >
                    <i
                      className={`bi ${
                        isFavorite(game.id) ? "bi-heart-fill text-danger" : "bi-heart text-light"
                      } fs-4`}
                    />
                  </button>
                  <Link to={`/products/${game.slug}`} className=" d-block text-decoration-none">
                    <div className="row g-4 align-items-center">
                      <div className="col-12 col-sm-4 col-md-4 game-card">
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

                      <div className="col-12 col-sm-8 col-md-8 text-light">
                        <h4 className="mb-2 list-card-title">{game.name}</h4>
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
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
