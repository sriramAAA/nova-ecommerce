import { Link } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import ProductCard from '../components/products/ProductCard'
import { products } from '../data/products'
import { useWishlist } from '../context/WishlistContext'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const savedProducts = products.filter((product) => wishlist.includes(product.id))

  if (!savedProducts.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500">
          <Heart size={36} />
        </div>
        <h1 className="mt-6 text-4xl font-black text-slate-900">Your wishlist is empty</h1>
        <p className="mt-3 text-slate-600">Save products you love and revisit them anytime.</p>
        <Link to="/shop" className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Continue shopping</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Wishlist</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Saved for later</h1>
        </div>
        <div className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">{savedProducts.length} items</div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
