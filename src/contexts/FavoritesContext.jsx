import { createContext, useContext, useEffect, useState } from "react";
import { useNotificationContext } from "./NotificationContext";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const { showNotification } = useNotificationContext();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(game) {
    const alreadyFavorite = favorites.some((item) => item.id === game.id);

    if (alreadyFavorite) {
      setFavorites(favorites.filter((item) => item.id !== game.id));
      showNotification(`"${game.name}" Rimosso dalla wishlist!`, "danger");
    } else {
      setFavorites([...favorites, game]);
      showNotification(`"${game.name}" Aggiunto nella wishlist!`, "success");
    }
  }

  function isFavorite(gameId) {
    return favorites.some((item) => item.id === gameId);
  }

  function clearFavorites() {
    setFavorites([]);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

function useFavorites() {
  return useContext(FavoritesContext);
}

export { FavoritesProvider, useFavorites };
