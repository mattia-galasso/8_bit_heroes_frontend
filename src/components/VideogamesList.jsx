import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import GameCard from "../components/GameCard";

export default function VideogamesList() {
  //* useState Constant
  const [viewMode, setViewMode] = useState("grid");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    setLoading(true);

    let url = "http://localhost:3000/products";

    if (sortBy === "price_asc") url += "?field=price&order=asc";

    if (sortBy === "price_desc") url += "?field=price&order=desc";

    if (sortBy === "name_asc") url += "?field=name&order=asc";

    if (sortBy === "name_desc") url += "?field=name&order=desc";

    //* Axios
    axios
      .get(url)
      .then((res) => {
        setGames(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Errore nel recupero dei videogiochi");
        setLoading(false);
      });
  }, [sortBy]);

  if (loading) return <p className="container mt-4">Caricamento...</p>;
  if (error) return <p className="container mt-4">{error}</p>;

  const visibleGames = onlyDiscounted ? games.filter((game) => (game.percentage || 0) > 0) : games;

  return (
    <>
      <section className="homepage-container">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 gap-lg-2 my-4">
          <h1 className="text-warning ms-1 mb-0">Tutti i videogiochi</h1>

          <div className="d-flex flex-wrap align-items-center gap-2 me-1">
            <select
              className="form-select bg-dark text-light border-warning"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ width: "130px" }}
            >
              <option value="">Ordina ↑↓</option>
              <option value="price_asc">Prezzo ↑</option>
              <option value="price_desc">Prezzo ↓</option>
              <option value="name_asc">Nome A-Z</option>
              <option value="name_desc">Nome Z-A</option>
            </select>

            <button
              className={`btn ${onlyDiscounted ? "btn-warning" : "btn-outline-warning"}`}
              onClick={() => setOnlyDiscounted(!onlyDiscounted)}
            >
              Scontati <i className="bi bi-percent" />
            </button>

            <div className="btn-group">
              <button
                className={`btn btn-${viewMode === "grid" ? "warning" : "outline-warning"}`}
                onClick={() => setViewMode("grid")}
              >
                <i className="bi bi-grid-3x3-gap" /> Griglia
              </button>

              <button
                className={`btn btn-${viewMode === "list" ? "warning" : "outline-warning"}`}
                onClick={() => setViewMode("list")}
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
              const final_price = Number(game.price) - Number(game.price) * (percentage / 100);

              return (
                <div key={game.id} className="card card-bg border-secondary p-3">
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
              );
            })}
          </div>
        )}
      </section>
    </>
  );
}
