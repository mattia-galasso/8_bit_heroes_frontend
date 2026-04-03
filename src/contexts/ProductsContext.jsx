import axios, { Axios } from "axios";
import { createContext, useContext, useState, useEffect } from "react";
const ProductsContext = createContext();

const baseURL = "http://localhost:3000/products";

function ProductsProvider({ children }) {
  //* useState Constant
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //* Axios
  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => {
        setGames(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Errore nel recupero dei videogiochi");
        setLoading(false);
      });
  }, []);

  //* Data Value
  const dataValue = {
    games,
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <ProductsContext.Provider value={dataValue}>
      {children}
    </ProductsContext.Provider>
  );
}

function useProductsContext() {
  const context = useContext(ProductsContext);
  return context;
}

export { ProductsProvider, useProductsContext };
