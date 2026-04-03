import { BrowserRouter, Routes, Route } from "react-router";

// PAGES
import Homepage from "./pages/Homepage";
import Games from "./pages/Games";
import GameDetails from "./pages/GameDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";

// LAYOUT
import DefaultLayout from "./layouts/DefaultLayout";

// CONTEXT PROVIDERS
import { LoadingProvider } from "./contexts/LoadingContext";
import { CartProvider } from './contexts/CartContext.jsx';

export default function App() {
  return (
    <LoadingProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route Component={DefaultLayout}>
              <Route path="/" element={<Homepage />} />
              <Route path="/games" element={<Games />} />
              <Route path="/products/:slug" element={<GameDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </LoadingProvider>
  );
}
