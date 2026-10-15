import { Link, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { safeReadStorage } from '../utils/storage'
import { formatINR } from '../utils/currency'

export default function OrderSuccess() {
  const { orderId } = useParams()
  const order = safeReadStorage('novacart_order', null)

  if (!order || order.orderId !== orderId) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-slate-900">Order not found</h1>
        <p className="mt-3 text-slate-600">We could not recover this demo order. Please check your order ID or continue shopping.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/shop" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Continue shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={40} className="fill-current" />
          </div>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">Order confirmed</p>
          <h1 className="mt-2 text-4xl font-black text-slate-900">Thank you, {order.fullName}!</h1>
          <p className="mt-3 max-w-xl text-slate-600">Your demo order has been placed successfully. No real payment was processed — this is a frontend-only checkout experience.</p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Order details</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between"><span>Order ID</span><span className="font-semibold text-slate-900">{order.orderId}</span></div>
              <div className="flex justify-between"><span>Payment</span><span className="font-semibold text-slate-900">{order.paymentMethod}</span></div>
              <div className="flex justify-between"><span>Total</span><span className="font-semibold text-slate-900">{formatINR(order.summary.total)}</span></div>
            </div>
          </div>

          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Shipping address</h2>
            <div className="mt-4 text-sm leading-7 text-slate-600">
              <p>{order.fullName}</p>
              <p>{order.address}</p>
              <p>{order.city}, {order.state}</p>
              <p>{order.country} - {order.pinCode}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[28px] bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Estimated delivery</p>
          <p className="mt-2 text-lg font-semibold text-slate-800">Your order is expected to arrive within 3–5 business days.</p>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/shop" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Continue shopping</Link>
          <Link to="/" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800">View home</Link>
        </div>
      </div>
    </div>
  )
}
