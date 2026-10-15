import { SlidersHorizontal, X } from 'lucide-react'

export default function FilterSidebar({
  filters,
  onChange,
  onClear,
  categories,
  onClose,
  mobile = false,
}) {
  const fieldClass = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400'

  return (
    <aside className={mobile ? 'space-y-5' : 'space-y-5'}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-bold text-slate-900">
          <SlidersHorizontal size={18} />
          Filters
        </div>
        {mobile && (
          <button type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 hover:bg-slate-100">
            <X size={18} />
          </button>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-slate-700">
          Category
          <select value={filters.category} onChange={(event) => onChange('category', event.target.value)} className={`${fieldClass} mt-1`}>
            <option value="all">All Products</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>{category.name}</option>
            ))}
          </select>
        </label>

        <div className="grid grid-cols-2 gap-3">
          <label className="block text-sm font-medium text-slate-700">
            Min price
            <input type="number" value={filters.minPrice} onChange={(event) => onChange('minPrice', event.target.value)} className={`${fieldClass} mt-1`} />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Max price
            <input type="number" value={filters.maxPrice} onChange={(event) => onChange('maxPrice', event.target.value)} className={`${fieldClass} mt-1`} />
          </label>
        </div>

        <label className="block text-sm font-medium text-slate-700">
          Rating
          <select value={filters.rating} onChange={(event) => onChange('rating', event.target.value)} className={`${fieldClass} mt-1`}>
            <option value="0">Any rating</option>
            <option value="4">4.0 & above</option>
            <option value="4.5">4.5 & above</option>
            <option value="4.7">4.7 & above</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Availability
          <select value={filters.inStockOnly} onChange={(event) => onChange('inStockOnly', event.target.value)} className={`${fieldClass} mt-1`}>
            <option value="false">All products</option>
            <option value="true">In stock only</option>
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700">
          <input type="checkbox" checked={filters.discountOnly} onChange={(event) => onChange('discountOnly', event.target.checked)} className="h-4 w-4 accent-blue-600" />
          Discounted products only
        </label>
      </div>

      <button type="button" onClick={onClear} className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
        Clear all filters
      </button>
    </aside>
  )
}
