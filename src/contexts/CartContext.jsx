import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState(
        // salva i dati in cart nel local storage
        () => {
            const savedCart = localStorage.getItem('cart');
            return savedCart ? JSON.parse(savedCart) : [];
        });

    // ogni volta che il cart cambia viene aggionato nel local storage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // aggiunge un prodotto al carrello
    const addToCart = (game) => {
        setCart((oldCart) => {
            const existing = oldCart.find(item => item.id === game.id);

            if (existing) {
                return oldCart.map(item =>
                    item.id === game.id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }

            return [...oldCart, { ...game, quantity: 1 }]

        });

    }

    // Rimuove un elemento dal carrello
    const removeFromCart = (gameId) => {
        // il map decrementa la quantità del prodotto
        setCart((oldCart) => oldCart.map(game =>
            game.id === gameId
                ? { ...game, quantity: (game.quantity || 1) - 1 }
                : item)
                // se la quantità è uguale o minore a 0 il prodotto viene rimosso dalla lista dei prodotti nel carrello
            .filter(game => game.quantity > 0))
    }

    const value = {
        cart,
        addToCart,
        removeFromCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

function useCart() {
    const context = useContext(CartContext);
    return context
}

export { CartProvider, useCart };