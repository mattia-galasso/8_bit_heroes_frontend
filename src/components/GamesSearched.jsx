import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { Link, useSearchParams } from "react-router";
import axios from "axios";
import { useFavorites } from "../contexts/FavoritesContext";
const baseURL = "http://localhost:3000/products/find";

export default function GamesSearched() {
  //* useState Constants
  const [searchGamesList, setSearchGamesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const { toggleFavorite, isFavorite } = useFavorites();
  //* Query Param
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  //* Function Search Axios
  function searchNavbar() {
    if (!search) {
      setSearchGamesList([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .get(baseURL + `?search=${search}`)
      .then((res) => {
        setLoading(false);
        setSearchGamesList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
        setError("Errore nel recupero dei videogiochi");
        setLoading(false);
      });
  }

  useEffect(searchNavbar, [search]);

  //* Function View Mode Query Param
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

  const viewsParams = () => {
    const viewmode = searchParams.get("viewmode") || "grid";
    setViewMode(viewmode);

    const discounted = searchParams.get("discounted") === "true";
    setOnlyDiscounted(discounted);
  };

  useEffect(viewsParams, [searchParams]);

  if (loading) return <p className="container mt-4">Caricamento...</p>;
  if (error) return <p className="container mt-4">{error}</p>;

  if (searchGamesList.length === 0) {
    return (
      <div className="container mt-4 text-center">
        <h2 className="text-warning">Nessun risultato per “{search}”</h2>
        <p className="text-light">
          Prova con un altro nome oppure esplora i nostri giochi 🎮
        </p>
      </div>
    );
  }

  const visibleGames = onlyDiscounted
    ? searchGamesList.filter((game) => (game.percentage || 0) > 0)
    : searchGamesList;

  return (
    <>
      <section className="homepage-container">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 my-4">
          <h1 className="text-warning ms-1 mb-0">
            Risultati di ricerca per “{search}”
          </h1>

          <div className="d-flex flex-wrap align-items-center gap-2">
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

        <p className = "text-light mb-3 fs-4 ms-2">
          <strong>
          {visibleGames.length===1
          ? "1 risultato trovato"
          : `${visibleGames.length} risultati trovati`}
          </strong>
        </p>

        {viewMode === "grid" ? (
          <section className="card card-bg my-4">
            <div className="card card-bg p-4">
              <ul className="row row-cols-2 row-cols-sm-4 g-4 mb-0 list-unstyled">
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
              const final_price =
                Number(game.price) - Number(game.price) * (percentage / 100);

              return (
                <div
                  key={game.id}
                  className="card card-bg border-secondary p-3"
                >
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
                        isFavorite(game.id)
                          ? "bi-heart-fill text-danger"
                          : "bi-heart text-light"
                      } fs-4`}
                    ></i>
                  </button>
                  <Link
                    to={`/products/${game.slug}`}
                    className=" d-block text-decoration-none"
                  >
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
                              <span className="badge bg-warning">
                                -{percentage}%
                              </span>
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
