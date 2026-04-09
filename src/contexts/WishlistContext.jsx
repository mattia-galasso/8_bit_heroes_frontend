import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(
        // salva i dati in Wishlist nel local storage
        () => {
            const savedWishlist = localStorage.getItem("wishlist");
            return savedWishlist ? JSON.parse(savedWishlist) : [];
        },
    );

    // ogni volta che il Wishlist cambia viene aggionato nel local storage
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    // aggiunge un prodotto alla wishlist
    const addToWishlist = (game) => {
        setWishlist((oldWishlist) => {
            const existing = oldWishlist.find((item) => item.id === game.id);

            if (existing) {
                return
            }

            return [...oldWishlist, game];
        });
    };

    // Rimuove un elemento dalla wishlist
    const removeFromWishlist = (gameId) => {
        setWishlist((oldWishlist) => oldWishlist.filter((game) => game.id != gameId),
        );
    };

    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

function useWishlist() {
    const context = useContext(WishlistContext);
    return context;
}

export { WishlistProvider, useWishlist };
