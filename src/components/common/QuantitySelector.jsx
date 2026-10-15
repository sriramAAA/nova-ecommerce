export default function QuantitySelector({ value, onChange, max = 99 }) {
  const clamp = (next) => Math.min(Math.max(next, 1), max)

  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border border-slate-200 bg-white">
      <button
        type="button"
        className="h-10 w-10 text-lg font-medium text-slate-700 transition hover:bg-slate-50"
        onClick={() => onChange(clamp(value - 1))}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="min-w-12 text-center text-sm font-semibold text-slate-800">{value}</span>
      <button
        type="button"
        className="h-10 w-10 text-lg font-medium text-slate-700 transition hover:bg-slate-50"
        onClick={() => onChange(clamp(value + 1))}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
