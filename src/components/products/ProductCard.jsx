import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import RatingStars from '../common/RatingStars'
import PriceDisplay from '../common/PriceDisplay'
import WishlistButton from '../common/WishlistButton'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import { calculateDiscountPercent } from '../../utils/currency'

export default function ProductCard({ product }) {
  const { addItem } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const isSaved = isWishlisted(product.id)

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
        {product.isOnSale && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            {calculateDiscountPercent(product.price, product.originalPrice)}% off
          </span>
        )}
        <div className="absolute right-3 top-3">
          <WishlistButton active={isSaved} onToggle={() => toggleWishlist(product.id)} />
        </div>
      </div>

      <div className="space-y-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{product.brand}</p>
            <Link to={`/product/${product.id}`} className="mt-1 block text-lg font-semibold text-slate-900 hover:text-blue-700">{product.name}</Link>
          </div>
          {product.isNew && <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700">New</span>}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <RatingStars rating={product.rating} size={14} />
            <span className="text-xs text-slate-500">({product.reviewCount})</span>
          </div>
        </div>

        <PriceDisplay price={product.price} originalPrice={product.originalPrice} />

        <button
          type="button"
          onClick={() => addItem(product, 1)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          <ShoppingCart size={16} />
          Add to cart
        </button>
      </div>
    </article>
  )
}
