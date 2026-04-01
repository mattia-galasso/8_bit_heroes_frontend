
import { BrowserRouter, Routes, Route } from 'react-router'
import Homepage from './pages/Homepage'
import Games from './pages/Games'
import GameDetails from './pages/GameDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import DefaultLayout from './layouts/DefaultLayout'
import { LoadingProvider } from './contexts/LoadingContext'

function App() {

  return (
    <>
    <LoadingProvider>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" element={<Homepage />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:slug" element={<GameDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LoadingProvider>
    </>
  )
}

export default App
