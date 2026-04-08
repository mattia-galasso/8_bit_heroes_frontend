import { createContext, useContext, useState, useEffect } from "react";
import Notification from "../components/Notification"; // Import aggiornato

const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // recupera i dati dal local storage all'avvio
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Stato per gestire il messaggio della notifica
  const [notification, setNotification] = useState(null);

  // aggiorna il local storage quando il carrello cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // aggiunge un prodotto al carrello
  const addToCart = (game) => {
    // Mostra la notifica popup
    setNotification(`${game.name} aggiunto al carrello!`);

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
  const removeFromCart = (gameId) => {
    setCart((oldCart) =>
      oldCart
        .map((game) =>
          game.id === gameId
            ? { ...game, quantity: (game.quantity || 1) - 1 }
            : game,
        )
        .filter((game) => game.quantity > 0),
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

  return (
    <CartContext.Provider value={value}>
      {children}

      {/* Mostra la notifica se presente */}
      {notification && (
        <Notification
          message={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  return context;
}

export { CartProvider, useCart };
