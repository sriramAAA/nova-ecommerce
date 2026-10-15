import { useEffect, useMemo, useState } from 'react'
import { ChevronDown, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { categories } from '../../data/categories'
import { products } from '../../data/products'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'

export default function Navbar() {
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const suggestions = useMemo(() => {
    if (!search.trim()) return []
    return products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5)
  }, [search])

  useEffect(() => {
    setShowSuggestions(Boolean(search.trim() && suggestions.length > 0))
  }, [search, suggestions])

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    if (!search.trim()) return
    navigate(`/shop?search=${encodeURIComponent(search.trim())}`)
    setMobileOpen(false)
    setShowSuggestions(false)
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">N</div>
          <div>
            <div className="text-lg font-black tracking-tight text-slate-900">NovaCart</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          <NavLink to="/" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>
            Shop
          </NavLink>
          <div className="group relative">
            <button type="button" className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900">
              Categories <ChevronDown size={16} />
            </button>
            <div className="invisible absolute left-0 top-full z-30 w-56 rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              {categories.map((category) => (
                <Link key={category.id} to={`/shop?category=${category.slug}`} className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/shop?deals=true" className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}>
            Deals
          </NavLink>
        </nav>

        <div className="hidden flex-1 justify-center px-6 lg:flex">
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-xl">
            <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm focus-within:border-slate-400 focus-within:bg-white">
              <Search size={18} className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                className="w-full border-0 bg-transparent px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
            </div>
            {showSuggestions && (
              <div className="absolute top-full mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
                {suggestions.map((product) => (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => {
                      navigate(`/product/${product.id}`)
                      setSearch('')
                      setShowSuggestions(false)
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-slate-50"
                  >
                    <img src={product.image} alt={product.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <div className="text-sm font-medium text-slate-800">{product.name}</div>
                      <div className="text-xs text-slate-500">{product.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </form>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/wishlist" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
            <Heart size={18} />
            {wishlistCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">{wishlistCount}</span>}
          </Link>
          <Link to="/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:text-slate-900">
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-semibold text-white">{cartCount}</span>}
          </Link>
          <button type="button" onClick={() => setMobileOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden" aria-label="Open menu">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-4 px-4 py-4 sm:px-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2.5">
                <Search size={16} className="text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search products"
                  className="w-full border-0 bg-transparent px-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </form>
            <nav className="space-y-2 text-sm font-medium text-slate-700">
              <NavLink to="/" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-slate-50">Home</NavLink>
              <NavLink to="/shop" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-slate-50">Shop</NavLink>
              {categories.map((category) => (
                <Link key={category.id} to={`/shop?category=${category.slug}`} onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-slate-50">
                  {category.name}
                </Link>
              ))}
              <NavLink to="/shop?deals=true" onClick={() => setMobileOpen(false)} className="block rounded-lg px-3 py-2 hover:bg-slate-50">Deals</NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
