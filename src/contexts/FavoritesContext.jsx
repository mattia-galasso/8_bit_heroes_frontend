import { createContext, useContext, useEffect, useState } from "react";
import { useNotificationContext } from "./NotificationContext";

const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const { showNotification } = useNotificationContext();
  useEffect(() => localStorage.setItem("favorites", JSON.stringify(favorites)), [favorites]);

  function toggleFavorite(game) {
    const alreadyFavorite = favorites.some((item) => item.id === game.id);

    if (alreadyFavorite) {
      setFavorites(favorites.filter((item) => item.id !== game.id));
      showNotification(`"${game.name}" Rimosso dalla Whishlist!`, "danger");
    } else {
      setFavorites([...favorites, game]);
      showNotification(`"${game.name}" Aggiunto nella Whishlist!`, "success");
    }
  }

  function isFavorite(gameId) {
    return favorites.some((item) => item.id === gameId);
  }

  function clearFavorites() {
    setFavorites([]);
    showNotification("Wishlist svuotata con successo!", "info");
  }

  const totalFavorites = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        totalFavorites,
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
