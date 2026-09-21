import { useState } from 'react'
import { Link } from 'react-router-dom'
import products from './data/products.json'

function ProductImage({ product }) {
  const [imageError, setImageError] = useState(false)

  if (imageError || !product.images?.[0]) {
    return (
      <div className="product-placeholder">
        <span>SCUB</span>
      </div>
    )
  }

  return (
    <img
      src={product.images[0]}
      alt={product.name}
      className="product-image"
      onError={() => setImageError(true)}
    />
  )
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = [
    'All',
    ...new Set(products.map((product) => product.category)),
  ]

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        )

  return (
    <div className="scub-page">

      <main>

        {/* HERO */}

        <section className="hero">

          <p className="hero-label">
            SCUB / ESSENTIALS
          </p>

          <div className="hero-logo-area">

            <img
              src="/logo.png"
              alt="SCUB"
              className="hero-logo"
            />

            <div className="hero-line"></div>

          </div>

          <p className="hero-description">
            Thoughtfully designed essentials made for everyday living.
          </p>

        </section>

        {/* COLLECTION */}

        <section className="collection">

          <div className="collection-header">

            <div className="collection-title-area">

              <p className="collection-label">
                Collection
              </p>

              <h2 className="collection-title">
                Shop SCUB
              </h2>

            </div>

            <div className="filters">

              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`filter-button ${
                    selectedCategory === category
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}

            </div>

          </div>

          {/* PRODUCT GRID */}

          {filteredProducts.length > 0 ? (
            <div className="product-grid">

              {filteredProducts.map((product) => (

                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="product-card-link"
                >

                  <article className="product-card">

                    <div className="product-image-wrapper">

                      <ProductImage product={product} />

                      {!product.inStock && (
                        <div className="sold-out">
                          Sold out
                        </div>
                      )}

                    </div>

                    <div className="product-info">

                      <div className="product-main-info">

                        <div>

                          <h3 className="product-name">
                            {product.name}
                          </h3>

                          <p className="product-category">
                            {product.category}
                          </p>

                        </div>

                        <p className="product-price">
                          ₹{product.price.toLocaleString('en-IN')}
                        </p>

                      </div>

                      <div className="product-details">

                        <span>
                          {product.colors.join(' / ')}
                        </span>

                        <span>•</span>

                        <span>
                          {product.sizes.join(' / ')}
                        </span>

                      </div>

                    </div>

                  </article>

                </Link>

              ))}

            </div>
          ) : (
            <div className="empty-products">
              <h3>No products found.</h3>
            </div>
          )}

        </section>

      </main>

      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-inner">

          <p className="footer-logo">
            SCUB
          </p>

          <p className="footer-copy">
            © 2026 SCUB
          </p>

        </div>

      </footer>

    </div>
  )
}

export default App
