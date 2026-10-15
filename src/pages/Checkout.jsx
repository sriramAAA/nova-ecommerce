import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckoutForm from '../components/checkout/CheckoutForm'
import { useCart } from '../context/CartContext'
import { formatINR } from '../utils/currency'
import { safeWriteStorage } from '../utils/storage'

export default function Checkout() {
  const navigate = useNavigate()
  const { cart, summary, clearCart } = useCart()

  const totalItems = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])

  const handleSubmit = ({ fullName, email, phone, address, city, state, pinCode, country, paymentMethod, items, summary: orderSummary }) => {
    const orderId = `NVC-${Date.now().toString().slice(-8)}`
    const order = {
      orderId,
      fullName,
      email,
      phone,
      address,
      city,
      state,
      pinCode,
      country,
      paymentMethod,
      items,
      summary: orderSummary,
      createdAt: new Date().toISOString(),
    }

    safeWriteStorage('novacart_order', order)
    clearCart()
    navigate(`/order-success/${orderId}`)
  }

  if (!cart.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-slate-900">Your cart is empty</h1>
        <p className="mt-3 text-slate-600">Add items before proceeding to checkout.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Checkout</p>
        <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Complete your order</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <CheckoutForm cartItems={cart} summary={summary} onSubmit={handleSubmit} />
        </div>

        <aside className="rounded-[32px] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
          <div className="mt-5 space-y-3">
            {cart.map((item) => (
              <div key={`${item.id}-${item.variant || 'base'}`} className="flex items-center gap-3 rounded-2xl bg-white p-3">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-800">{item.name}</div>
                  <div className="text-xs text-slate-500">Qty: {item.quantity}</div>
                </div>
                <div className="text-sm font-semibold text-slate-900">{formatINR(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
            <div className="flex justify-between"><span>Items</span><span className="font-medium text-slate-900">{totalItems}</span></div>
            <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-slate-900">{formatINR(summary.subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span className="font-medium text-slate-900">{summary.shipping === 0 ? 'Free' : formatINR(summary.shipping)}</span></div>
            <div className="flex justify-between"><span>Discount</span><span className="font-medium text-emerald-600">−{formatINR(summary.discount)}</span></div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
            <span className="text-base font-medium text-slate-700">Total</span>
            <span className="text-2xl font-black text-slate-900">{formatINR(summary.total)}</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
