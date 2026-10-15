import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">404 Error</p>
      <h1 className="mt-4 text-5xl font-black tracking-tight text-slate-900">Page not found</h1>
      <p className="mt-4 text-lg text-slate-600">The page you’re looking for may have moved or no longer exists.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white">Home</Link>
        <Link to="/shop" className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800">Shop</Link>
      </div>
    </div>
  )
}
