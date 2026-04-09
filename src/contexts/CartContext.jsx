import { createContext, useContext, useState, useEffect } from "react";
import { useNotificationContext } from "./NotificationContext";

const CartContext = createContext();

function CartProvider({ children }) {
  const { showNotification } = useNotificationContext();

  const [cart, setCart] = useState(() => {
    // recupera i dati dal local storage all'avvio
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // aggiorna il local storage quando il carrello cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // aggiunge un prodotto al carrello
  const addToCart = (game) => {
    showNotification(`"${game.name}" Aggiunto al carrello!`, "success");
    setCart((oldCart) => {
      const existing = oldCart.find((item) => item.id === game.id);

      if (existing) {
        return oldCart.map((item) =>
          item.id === game.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item,
        );
      }

      return [...oldCart, { ...game, quantity: 1, copyInDigital: false }];
    });
  };

  // Rimuove un elemento dal carrello
  const removeFromCart = (gameId, gameName) => {
    setCart(
      (oldCart) =>
        oldCart
          .map((game) =>
            game.id === gameId
              ? { ...game, quantity: (game.quantity || 1) - 1 }
              : game,
          )
          .filter((game) => game.quantity > 0),
      showNotification(
        `"${gameName}" Diminuita quantità nel carrello!`,
        "danger",
      ),
    );
  };

  const clearCart = () => setCart([]);

  const toggleDigitalCopy = (gameId) => {
    setCart((oldCart) =>
      oldCart.map((game) =>
        game.id === gameId
          ? { ...game, copyInDigital: !game.copyInDigital }
          : game,
      ),
    );
  };

  //* Calcolo totale pezzi nel carrello
  const totalQuantity = cart.reduce((acc, game) => {
    return acc + (game.quantity || 1);
  }, 0);

  const value = {
    cart,
    clearCart,
    addToCart,
    removeFromCart,
    toggleDigitalCopy,
    totalQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  return context;
}

export { CartProvider, useCart };
