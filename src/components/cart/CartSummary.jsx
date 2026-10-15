import { formatINR } from '../../utils/currency'

export default function CartSummary({ summary, freeShippingProgress, onCheckout }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Order summary</h2>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex justify-between"><span>Subtotal</span><span className="font-medium text-slate-900">{formatINR(summary.subtotal)}</span></div>
        <div className="flex justify-between"><span>Discount</span><span className="font-medium text-emerald-600">−{formatINR(summary.discount)}</span></div>
        <div className="flex justify-between"><span>Shipping</span><span className="font-medium text-slate-900">{summary.shipping === 0 ? 'Free' : formatINR(summary.shipping)}</span></div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
          <span>Free shipping</span>
          <span>{Math.round(freeShippingProgress)}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-blue-600" style={{ width: `${freeShippingProgress}%` }} />
        </div>
        <p className="mt-2 text-xs text-slate-500">Add {formatINR(Math.max(999 - summary.subtotal, 0))} more for free delivery.</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
        <span className="text-base font-medium text-slate-700">Estimated total</span>
        <span className="text-2xl font-black text-slate-900">{formatINR(summary.total)}</span>
      </div>

      <button type="button" onClick={onCheckout} className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
        Proceed to checkout
      </button>
    </div>
  )
}
