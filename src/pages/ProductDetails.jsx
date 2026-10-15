import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Heart, ShieldCheck, ShoppingCart, Truck } from 'lucide-react'
import ProductGallery from '../components/products/ProductGallery'
import ProductCard from '../components/products/ProductCard'
import RatingStars from '../components/common/RatingStars'
import QuantitySelector from '../components/common/QuantitySelector'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { allProducts } from '../data/products'
import { formatINR } from '../utils/currency'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const product = allProducts.find((item) => item.id === id)
  const [selectedColor, setSelectedColor] = useState(product?.availableColors?.[0] || '')
  const [selectedSize, setSelectedSize] = useState(product?.availableSizes?.[0] || '')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Product unavailable</p>
        <h1 className="mt-4 text-4xl font-black text-slate-900">This product could not be found.</h1>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Go home</Link>
          <Link to="/shop" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800">Browse shop</Link>
        </div>
      </div>
    )
  }

  const relatedProducts = useMemo(
    () => allProducts.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4),
    [product],
  )

  const isSaved = isWishlisted(product.id)

  const handleBuyNow = () => {
    addItem(product, quantity, selectedSize || selectedColor || null)
    navigate('/checkout')
  }

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize || selectedColor || null)
  }

  const maxQty = Math.max(1, product.stock)

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="hover:text-slate-900">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-slate-900">Shop</Link>
        <span>/</span>
        <span className="text-slate-800">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ProductGallery images={product.gallery || [product.image]} productName={product.name} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{product.brand}</p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">{product.name}</h1>

          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <RatingStars rating={product.rating} size={16} />
              <span className="text-sm font-medium text-slate-700">{product.rating}</span>
            </div>
            <span className="text-sm text-slate-500">{product.reviewCount} reviews</span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-3xl font-black text-slate-900">{formatINR(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-slate-400 line-through">{formatINR(product.originalPrice)}</span>
                <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-base leading-7 text-slate-600">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${product.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
            <button type="button" onClick={() => toggleWishlist(product.id)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
              <Heart size={16} className={isSaved ? 'fill-red-500 text-red-500' : ''} />
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>

          <div className="mt-8 space-y-5">
            {product.availableColors?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-800">Color</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.availableColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full border px-3 py-2 text-sm font-medium ${selectedColor === color ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.availableSizes?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-slate-800">Size</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`rounded-full border px-3 py-2 text-sm font-medium ${selectedSize === size ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-sm font-semibold text-slate-800">Quantity</p>
              <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1">
                <QuantitySelector value={quantity} onChange={(value) => setQuantity(Math.min(Math.max(value, 1), maxQty))} max={maxQty} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleAddToCart} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">
              <ShoppingCart size={16} /> Add to cart
            </button>
            <button type="button" onClick={handleBuyNow} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 hover:border-slate-300">
              Buy now
            </button>
          </div>

          <div className="mt-8 grid gap-3 rounded-[28px] border border-slate-200 bg-slate-50 p-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <Truck size={18} className="text-blue-700" />
              <div>
                <div className="text-sm font-semibold text-slate-900">Delivery</div>
                <div className="text-xs text-slate-500">Get it by 3-5 days</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck size={18} className="text-blue-700" />
              <div>
                <div className="text-sm font-semibold text-slate-900">Returns</div>
                <div className="text-xs text-slate-500">30-day easy return</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShoppingCart size={18} className="text-blue-700" />
              <div>
                <div className="text-sm font-semibold text-slate-900">Secure</div>
                <div className="text-xs text-slate-500">Protected checkout</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Product details</h2>
          <div className="mt-6 space-y-5">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Description</h3>
              <p className="mt-3 text-slate-600">{product.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Key features</h3>
              <ul className="mt-3 space-y-2 text-slate-600">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-blue-600" />{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Specifications</h3>
              <div className="mt-3 space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 border-b border-slate-200 pb-2 text-sm">
                    <span className="font-medium text-slate-600">{key}</span>
                    <span className="text-right text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-black text-slate-900">Customer reviews</h2>
          <div className="mt-4 space-y-4">
            {[
              { name: 'Ishita', text: 'Beautiful finish and the quality is exactly as described. The product feels premium and the delivery was quick.', rating: 5 },
              { name: 'Kabir', text: 'Very satisfied with the purchase. The product looks amazing and fits well with my setup.', rating: 4 },
              { name: 'Meera', text: 'Great value for money. I would absolutely recommend it to anyone looking for this category.', rating: 5 },
            ].map((review) => (
              <div key={review.name} className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-2">
                  <RatingStars rating={review.rating} size={14} />
                  <span className="text-sm font-semibold text-slate-800">{review.name}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Related picks</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">You may also like</h2>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
