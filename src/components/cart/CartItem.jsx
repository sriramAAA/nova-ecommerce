import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatINR } from '../../utils/currency'

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <img src={item.image} alt={item.name} className="h-28 w-28 rounded-2xl object-cover" />
      <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{item.variant ? item.variant : item.category || 'NovaCart'}</p>
          <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
          <p className="text-sm text-slate-500">{formatINR(item.price)} each</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="inline-flex items-center overflow-hidden rounded-full border border-slate-200 bg-white">
            <button type="button" onClick={() => onUpdateQuantity(item.id, item.variant, item.quantity - 1)} className="h-9 w-9 text-slate-700 hover:bg-slate-50" aria-label="Decrease quantity">
              <Minus size={16} className="mx-auto" />
            </button>
            <span className="min-w-10 text-center text-sm font-semibold text-slate-800">{item.quantity}</span>
            <button type="button" onClick={() => onUpdateQuantity(item.id, item.variant, item.quantity + 1)} className="h-9 w-9 text-slate-700 hover:bg-slate-50" aria-label="Increase quantity">
              <Plus size={16} className="mx-auto" />
            </button>
          </div>

          <div className="min-w-[100px] text-right">
            <p className="text-lg font-bold text-slate-900">{formatINR(item.price * item.quantity)}</p>
          </div>

          <button type="button" onClick={() => onRemove(item.id, item.variant)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-red-200 hover:text-red-500" aria-label="Remove item">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
