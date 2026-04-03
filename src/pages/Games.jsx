import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import GameCard from "../components/GameCard";

export default function Games() {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [viewMode, setViewMode] = useState("grid")


  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        setGames(res.data.result)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setError("Errore nel recupero dei videogiochi")
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="container mt-4">Caricamento...</p>
  if (error) return <p className="container mt-4">{error}</p>

  return (
    <section className="homepage-container">
      <div className="d-flex justify-content-between align-items-center my-4">
        <h1 className="text-warning mb-0">Tutti i videogiochi</h1>

        <div className="btn-group">
          <button
            className={`btn btn-${viewMode === "grid" ? "warning" : "outline-warning"}`}
            onClick={() => setViewMode("grid")}
          >
            Griglia
          </button>
          <button
            className={`btn btn-${viewMode === "list" ? "warning" : "outline-warning"}`}
            onClick={() => setViewMode("list")}
          >
            Lista
          </button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <section className="card card-bg my-4">
          <div className="card card-bg p-4">
            <ul className="row row-cols-2 row-cols-sm-4 g-3 mb-0 list-unstyled">
              {games.map((game) => (
                <li key={game.id} className="col">
                  <GameCard product={game} enableHoverOverlay={true} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <div className="d-flex flex-column gap-3 my-4">
          {games.map((game) => {
            const percentage = game.percentage || 0;
            const final_price = game.price - game.price * (percentage / 100);
            return (
              <div key={game.id} className="card card-bg border-secondary p-3">
                <Link to={`/products/${game.slug}`} className=" d-block text-decoration-none">
                  <div className="row g-3 align-items-center">
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
                      <p className="mb-0">
                        {game.description}
                      </p>
                      <div>
                        {percentage > 0 ? (
                          <div className="mb-3">
                            <p className="text-decoration-line-through text-danger mb-1">€ {game.price}</p>
                            <p className="fs-3 fw-bold text-success mb-2">€ {final_price.toFixed(2)}</p>
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
            )
          })}
        </div>
      )}
    </section>
  )
}