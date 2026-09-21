import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { CartProvider } from './components/CartContext'
import App from './App.jsx'
import ProductPage from './ProductPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <CartProvider>

        <Routes>

          <Route
            path="/"
            element={<App />}
          />

          <Route
            path="/product/:id"
            element={<ProductPage />}
          />

        </Routes>

      </CartProvider>

    </BrowserRouter>
  </StrictMode>,
)
