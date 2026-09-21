import { useCart } from './CartContext'

function StoreHeader() {
  const { itemCount, setIsCartOpen } = useCart()

  return (
    <header className="store-header">

      <div className="store-header-inner">

        <div className="store-header-space"></div>

        <div className="store-header-brand">
          SCUB
        </div>

        <button
          type="button"
          className="bag-button"
          onClick={() => setIsCartOpen(true)}
          aria-label="Open shopping bag"
        >
          <span className="bag-icon">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M6 8h12l1 13H5L6 8Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />

              <path
                d="M9 8V6a3 3 0 0 1 6 0v2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>

            {itemCount > 0 && (
              <span className="bag-count">
                {itemCount}
              </span>
            )}
          </span>

          <span className="bag-label">
            Bag
          </span>
        </button>

      </div>

    </header>
  )
}

export default StoreHeader
