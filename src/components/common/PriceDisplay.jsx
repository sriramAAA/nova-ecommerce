import { calculateDiscountPercent, formatINR } from '../../utils/currency'

export default function PriceDisplay({ price, originalPrice, compact = false }) {
  const discount = calculateDiscountPercent(price, originalPrice)

  return (
    <div className={compact ? 'flex items-center gap-1' : 'flex items-center gap-2 flex-wrap'}>
      <span className="text-lg font-bold text-slate-900">{formatINR(price)}</span>
      {originalPrice && originalPrice > price ? (
        <>
          <span className="text-sm text-slate-400 line-through">{formatINR(originalPrice)}</span>
          <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700">
            {discount}% off
          </span>
        </>
      ) : null}
    </div>
  )
}
