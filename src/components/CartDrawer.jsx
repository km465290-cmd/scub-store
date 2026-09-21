import { Link } from 'react-router-dom'
import { useCart } from './CartContext'

function CartDrawer() {
  const {
    cartItems,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  if (!isCartOpen) {
    return null
  }

  return (
    <>

      <div
        className="cart-overlay"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <aside className="cart-drawer">

        <div className="cart-drawer-header">

          <div>
            <p className="cart-label">
              SCUB
            </p>

            <h2>
              Your Bag
            </h2>
          </div>

          <button
            type="button"
            className="cart-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag"
          >
            ×
          </button>

        </div>

        {cartItems.length === 0 ? (

          <div className="cart-empty">

            <p>
              Your bag is empty
            </p>

            <Link
              to="/"
              className="cart-shop-link"
              onClick={() => setIsCartOpen(false)}
            >
              Back to shop
            </Link>

          </div>

        ) : (

          <>

            <div className="cart-items">

              {cartItems.map((item) => (

                <div
                  className="cart-item"
                  key={item.cartId}
                >

                  <div className="cart-item-image">

                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    ) : (
                      <span>SCUB</span>
                    )}

                  </div>

                  <div className="cart-item-content">

                    <div className="cart-item-top">

                      <div>

                        <h3>
                          {item.name}
                        </h3>

                        <p className="cart-item-meta">
                          Size: {item.size}
                        </p>

                        <p className="cart-item-meta">
                          Color: {item.color}
                        </p>

                      </div>

                      <p className="cart-item-price">
                        ₹{item.price.toLocaleString('en-IN')}
                      </p>

                    </div>

                    <div className="cart-item-bottom">

                      <div className="quantity-control">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.cartId)
                          }
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.cartId)
                          }
                          aria-label="Increase quantity"
                        >
                          +
                        </button>

                      </div>

                      <button
                        type="button"
                        className="remove-item"
                        onClick={() =>
                          removeFromCart(item.cartId)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="cart-footer">

              <div className="cart-subtotal">

                <span>
                  Subtotal
                </span>

                <strong>
                  ₹{subtotal.toLocaleString('en-IN')}
                </strong>

              </div>

              <button
                type="button"
                className="checkout-button"
              >
                Checkout
              </button>

              <p className="checkout-note">
                Checkout is coming soon.
              </p>

            </div>

          </>

        )}

      </aside>

    </>
  )
}

export default CartDrawer
