import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  const setLoading = (value) => {
    setIsLoading(value);
    return isLoading;
  };
  return (
    <LoadingContext.Provider value={{ setLoading, isLoading }}>{children}</LoadingContext.Provider>
  );
}

function useLoading() {
  const context = useContext(LoadingContext);
  return context;
}

export { LoadingProvider, useLoading };
