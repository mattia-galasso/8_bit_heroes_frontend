import axios from "axios";
import { useEffect , useState } from "react";
import { useParams } from "react-router"



export default function GameDetails() {
    const { slug } = useParams()

    const [product,setProduct] = useState(null)
    const [error,setError] = useState("")
    
    useEffect(()=>{
        axios.get(`http://localhost:3000/products/${slug}`)
        .then((res)=>{
            setProduct(res.data)
        })
        .catch((err)=>{
            console.log("ERRORE AXIOS:", err);

            if (err.response) {
            console.log("STATUS:", err.response.status)
            console.log("DATA:", err.response.data)
          } else {
            console.log("MESSAGGIO:", err.message)
    }

        setError("Errore nella chiamata al backend")
        })
    },[slug])

    if (error) return <p>{error}</p>
    if (!product) return <p>Caricamento..</p>

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>

            {product.price !== product.final_price ? (
        <>
          <p style={{ textDecoration: "line-through" }}>
            € {product.price}
          </p>
          <p>€ {product.final_price}</p>
        </>
      ) : (
        <p>€ {product.price}</p>
      )}
        </div>
    )
}