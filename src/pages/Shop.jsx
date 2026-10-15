import { Filter, Search, SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FilterSidebar from '../components/products/FilterSidebar'
import ProductGrid from '../components/products/ProductGrid'
import { categories } from '../data/categories'
import { products } from '../data/products'

const defaultFilters = {
  category: 'all',
  minPrice: '',
  maxPrice: '',
  rating: '0',
  inStockOnly: 'false',
  discountOnly: false,
}

export default function Shop() {
  const location = useLocation()
  const navigate = useNavigate()
  const query = new URLSearchParams(location.search)
  const categoryParam = query.get('category') || 'all'
  const searchParam = query.get('search') || ''
  const dealsOnly = query.get('deals') === 'true'

  const [search, setSearch] = useState(searchParam)
  const [sort, setSort] = useState('featured')
  const [filters, setFilters] = useState({
    ...defaultFilters,
    category: categoryParam,
  })
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: categoryParam }))
  }, [categoryParam])

  useEffect(() => {
    setSearch(searchParam)
  }, [searchParam])

  const productList = useMemo(() => {
    const normalizedSearch = search.toLowerCase().trim()

    const filtered = products.filter((product) => {
      const matchesCategory = filters.category === 'all' || product.category.toLowerCase().replace(/&/g, 'and') === filters.category.toLowerCase().replace(/&/g, 'and')
      const matchesSearch = !normalizedSearch || product.name.toLowerCase().includes(normalizedSearch)
      const min = Number(filters.minPrice) || 0
      const max = Number(filters.maxPrice) || Number.MAX_SAFE_INTEGER
      const matchesPrice = product.price >= min && product.price <= max
      const matchesRating = Number(product.rating) >= Number(filters.rating)
      const matchesStock = filters.inStockOnly === 'true' ? product.stock > 0 : true
      const matchesDiscount = !filters.discountOnly || product.originalPrice > product.price

      return matchesCategory && matchesSearch && matchesPrice && matchesRating && matchesStock && matchesDiscount
    })

    const sorted = [...filtered]
    switch (sort) {
      case 'low-high':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'high-low':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
        break
      default:
        sorted.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || b.rating - a.rating)
    }

    if (dealsOnly) {
      return sorted.filter((product) => product.originalPrice > product.price)
    }

    return sorted
  }, [search, filters, sort, dealsOnly])

  const activeFilters = []
  if (filters.category !== 'all') activeFilters.push(filters.category)
  if (filters.minPrice || filters.maxPrice) activeFilters.push('Price')
  if (filters.rating !== '0') activeFilters.push('Rating')
  if (filters.inStockOnly === 'true') activeFilters.push('In stock')
  if (filters.discountOnly) activeFilters.push('On sale')

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({ ...defaultFilters, category: categoryParam })
    setSearch('')
    navigate('/shop')
  }

  const submitSearch = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (filters.category !== 'all') params.set('category', filters.category)
    if (search.trim()) params.set('search', search.trim())
    navigate(`/shop${params.toString() ? `?${params.toString()}` : ''}`)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Shop</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-900">Curated essentials</h1>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <button type="button" onClick={() => setDrawerOpen(true)} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            <SlidersHorizontal size={16} /> Filters
          </button>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <form onSubmit={submitSearch} className="relative w-full max-w-xl">
          <div className="flex items-center rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm focus-within:border-slate-400">
            <Search size={18} className="text-slate-400" />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by product name" className="w-full border-0 bg-transparent px-3 text-sm outline-none placeholder:text-slate-400" />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="px-2 text-xs font-semibold text-slate-500">Clear</button>
            )}
          </div>
        </form>

        <div className="flex items-center gap-3">
          <div className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">{productList.length} results</div>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-slate-400">
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <span key={filter} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">{filter}</span>
          ))}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} onChange={updateFilter} onClear={clearFilters} categories={categories} />
        </div>

        <ProductGrid products={productList} />
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 p-4 lg:hidden">
          <div className="ml-auto h-full w-full max-w-sm rounded-t-[28px] bg-white p-5 shadow-xl">
            <FilterSidebar filters={filters} onChange={updateFilter} onClear={clearFilters} categories={categories} mobile onClose={() => setDrawerOpen(false)} />
            <button type="button" onClick={() => setDrawerOpen(false)} className="mt-6 w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white">Apply filters</button>
          </div>
        </div>
      )}
    </div>
  )
}
