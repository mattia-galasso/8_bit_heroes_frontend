import { createContext, useContext, useState, useEffect } from "react";
const SearchContext = createContext();

function SearchProvider({ children }) {
  //* useState Constant
  const [searchNavbarParams, setSearchNavbarParams] = useState("");

  console.log("searchNavbarParams:", searchNavbarParams);

  //* Data Value
  const dataValue = {
    setSearchNavbarParams,
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
