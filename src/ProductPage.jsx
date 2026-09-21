import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import products from './data/products.json'

function ProductPage() {
  const { id } = useParams()

  const product = products.find(
    (item) => String(item.id) === String(id)
  )

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')

  if (!product) {
    return (
      <main className="product-not-found">
        <p className="product-label">SCUB</p>

        <h1>Product not found</h1>

        <Link to="/" className="back-link">
          ← Back to shop
        </Link>
      </main>
    )
  }

  const canAddToBag =
    selectedSize !== '' && selectedColor !== '' && product.inStock

  return (
    <main className="product-page">

      <div className="product-page-top">
        <Link to="/" className="back-link">
          ← Back to shop
        </Link>
      </div>

      <div className="product-detail-layout">

        {/* IMAGE GALLERY */}

        <section className="product-gallery">

          <div className="product-large-image">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
            />

            {!product.inStock && (
              <span className="detail-sold-out">
                Sold out
              </span>
            )}
          </div>

          <div className="product-thumbnails">

            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`thumbnail ${
                  selectedImage === index ? 'selected' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                />
              </button>
            ))}

          </div>

        </section>

        {/* PRODUCT DETAILS */}

        <section className="product-details-page">

          <p className="detail-category">
            {product.category}
          </p>

          <h1 className="detail-name">
            {product.name}
          </h1>

          <p className="detail-price">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          <div className="detail-line"></div>

          <p className="detail-description">
            {product.description}
          </p>

          {/* SIZE */}

          <div className="selector-section">

            <div className="selector-heading">
              <span>Size</span>

              {selectedSize && (
                <span className="selected-value">
                  {selectedSize}
                </span>
              )}
            </div>

            <div className="size-options">

              {product.sizes.map((size) => {
                const available =
                  product.availableSizes.includes(size)

                return (
                  <button
                    key={size}
                    type="button"
                    disabled={!available}
                    className={`size-button ${
                      selectedSize === size ? 'selected' : ''
                    } ${!available ? 'unavailable' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                )
              })}

            </div>

          </div>

          {/* COLOR */}

          <div className="selector-section">

            <div className="selector-heading">
              <span>Color</span>

              {selectedColor && (
                <span className="selected-value">
                  {selectedColor}
                </span>
              )}
            </div>

            <div className="color-options">

              {product.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`color-button ${
                    selectedColor === color ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  <span
                    className={`color-dot color-${color.toLowerCase()}`}
                  ></span>

                  {color}
                </button>
              ))}

            </div>

          </div>

          {/* ADD TO BAG */}

          <button
            type="button"
            className="add-to-bag"
            disabled={!canAddToBag}
          >
            {product.inStock ? 'Add to bag' : 'Sold out'}
          </button>

          <p className="detail-note">
            Select a size and color to continue.
          </p>

        </section>

      </div>

    </main>
  )
}

export default ProductPage
