import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function GameDetails() {
  const { slug } = useParams()

  const [product, setProduct] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${slug}`)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => {
        console.log(err)
        setError("Errore nella chiamata al backend")
      })
  }, [slug])

  if (error) return <p className="container mt-4">{error}</p>
  if (!product) return <p className="container mt-4">Caricamento...</p>

  const trailerEmbed = product.trailer
    ? product.trailer.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0]
    : null

  return (
    <div className="container my-5">
      <div className="row g-4">
        <div className="col-12">
          <img
           src={`http://localhost:3000/videogame_banners/${product.banner_image}`}
           alt={product.name}
           className="img-fluid rounded w-100"
          />
        </div>

        <div className="col-md-4">
        <img
         src={`http://localhost:3000/videogame_covers/${product.cover_image}`}
         alt={product.name}
         className="img-fluid rounded shadow"
         />
        </div>

        <div className="col-md-8">
          <h1 className="mb-3">{product.name}</h1>

          <p>{product.description}</p>

          <ul className="list-group mb-3">
            <li className="list-group-item">
              <strong>PEGI:</strong> {product.pegi}
            </li>
            <li className="list-group-item">
              <strong>Copia digitale </strong> {product.digital_copy ? "Disponibile" : "Non Disponibile"}
            </li>
          </ul>

          {product.price !== product.final_price ? (
            <div className="mb-3">
              <p className="text-decoration-line-through text-muted mb-1">
                € {product.price}
              </p>
              <p className="fs-3 fw-bold mb-2">
                € {product.final_price}
              </p>
              <span className="badge bg-success">
                -{product.discount_percentage}%
              </span>
            </div>
          ) : (
            <p className="fs-3 fw-bold">€ {product.price}</p>
          )}

          <button className="btn btn-primary btn-lg">
            Aggiungi al carrello
          </button>
        </div>
      </div>

      {trailerEmbed && (
        <div className="mt-5">
          <h3 className="mb-3">Trailer</h3>
          <div className="ratio ratio-16x9">
            <iframe
              src={trailerEmbed}
              title={product.name}
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {product.requirements && (
        <div className="mt-5">
          <h3 className="mb-3">Requisiti minimi</h3>
          <ul className="list-group">
            <li className="list-group-item">
              <strong>Sistema operativo:</strong> {product.requirements.os}
            </li>
            <li className="list-group-item">
              <strong>GPU:</strong> {product.requirements.gpu}
            </li>
            <li className="list-group-item">
              <strong>RAM:</strong> {product.requirements.ram}
            </li>
            <li className="list-group-item">
              <strong>Storage:</strong> {product.requirements.storage}
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}