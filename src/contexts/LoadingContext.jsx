import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const endLoading = () => setIsLoading(false);

  const dataValue = {
    isLoading,
    startLoading,
    endLoading,
  };
  return (
    <LoadingContext.Provider value={dataValue}>
      {children}
    </LoadingContext.Provider>
  );
}

function useLoading() {
  return useContext(LoadingContext);
}

export { LoadingProvider, useLoading };
