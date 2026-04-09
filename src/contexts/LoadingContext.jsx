import { createContext, useContext, useState, useRef } from "react";

const LoadingContext = createContext();

function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);

  const startLoading = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setIsLoading(true);
      timeoutRef.current = null;
    }, 200);
  };

  const endLoading = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLoading(false);
  };

  const dataValue = {
    isLoading,
    startLoading,
    endLoading,
  };

  return <LoadingContext.Provider value={dataValue}>{children}</LoadingContext.Provider>;
}

function useLoading() {
  return useContext(LoadingContext);
}

export { LoadingProvider, useLoading };
