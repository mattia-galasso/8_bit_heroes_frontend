import axios, { Axios } from "axios";
import { createContext, useContext, useState, useEffect } from "react";
const SearchContext = createContext();

const baseURL = "http://localhost:3000/products";

function SearchProvider({ children }) {
  //* useState Constant
  const [searchNavbarParams, setSearchNavbarParams] = useState("");
  const [searchGamesList, setSearchGamesList] = useState([]);

  function searchNavbar() {
    axios
      .get(baseURL + `?${searchNavbarParams}`)
      .then((res) => {
        setSearchGamesList(res.data.result);
      })
      .catch((err) => {
        console.log(err);
        setError("Errore nel recupero dei videogiochi");
        setLoading(false);
      });
  }

  useEffect(searchNavbar, [searchNavbarParams]);

  //* Data Value
  const dataValue = {
    searchGamesList,
  };

  return (
    <SearchContext.Provider value={dataValue}>
      {children}
    </SearchContext.Provider>
  );
}

function useSearchContext() {
  const context = useContext(SearchContext);
  return context;
}

export { SearchProvider, useSearchContext };
