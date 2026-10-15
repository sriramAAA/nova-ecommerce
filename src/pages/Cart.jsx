import { Link, useNavigate } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import { useCart } from '../context/CartContext'
import { getFreeShippingProgress } from '../utils/cartCalculations'

export default function Cart() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeItem, clearCart, summary } = useCart()

  const handleCheckout = () => {
    if (!cart.length) return
    navigate('/checkout')
  }

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <ShoppingBag size={36} />
        </div>
        <h1 className="mt-6 text-4xl font-black text-slate-900">Your cart is empty</h1>
        <p className="mt-3 text-slate-600">Browse our latest essentials and discover products that match your lifestyle.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/shop" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Continue shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Cart</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Your bag</h1>
        </div>
        <button type="button" onClick={clearCart} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">Clear cart</button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-4">
          {cart.map((item) => (
            <CartItem key={`${item.id}-${item.variant || 'default'}`} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
          ))}
        </div>

        <CartSummary summary={summary} freeShippingProgress={getFreeShippingProgress(summary.subtotal)} onCheckout={handleCheckout} />
      </div>
    </div>
  )
}
