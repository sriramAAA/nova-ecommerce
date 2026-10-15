import ProductCard from './ProductCard'

export default function ProductGrid({ products = [] }) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
        <p className="text-lg font-semibold text-slate-800">No products match your filters.</p>
        <p className="mt-2 text-sm text-slate-500">Try adjusting the search, category, or price range.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
