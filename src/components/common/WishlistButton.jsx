import { Heart } from 'lucide-react'

export default function WishlistButton({ active, onToggle, className = '' }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${
        active ? 'border-red-200 bg-red-50 text-red-500' : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
      } ${className}`}
    >
      <Heart size={18} className={active ? 'fill-current' : ''} />
    </button>
  )
}
