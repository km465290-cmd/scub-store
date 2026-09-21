import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'scub-cart'

function getSavedCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      return []
    }

    return JSON.parse(saved)
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(getSavedCart)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cartItems)
    )
  }, [cartItems])

  function addToCart(product, size, color) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.productId === product.id &&
          item.size === size &&
          item.color === color
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.productId === product.id &&
          item.size === size &&
          item.color === color
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      }

      return [
        ...currentItems,
        {
          cartId: `${product.id}-${size}-${color}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images?.[0] || '',
          size,
          color,
          quantity: 1,
        },
      ]
    })

    setIsCartOpen(true)
  }

  function increaseQuantity(cartId) {
    setCartItems((items) =>
      items.map((item) =>
        item.cartId === cartId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )
  }

  function decreaseQuantity(cartId) {
    setCartItems((items) =>
      items
        .map((item) =>
          item.cartId === cartId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  function removeFromCart(cartId) {
    setCartItems((items) =>
      items.filter((item) => item.cartId !== cartId)
    )
  }

  function clearCart() {
    setCartItems([])
  }

  const itemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        itemCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return context
}
