import { Globe, Mail, MapPin, MessageCircle, Phone, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../../data/categories'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-base font-bold text-white">N</div>
              <div>
                <div className="text-xl font-black tracking-tight text-slate-900">NovaCart</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-600">
              Premium essentials for modern everyday living, curated with thoughtful design, quality craftsmanship, and a seamless shopping experience.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Shop</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/shop?category=${category.slug}`} className="hover:text-slate-900">{category.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Customer Service</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><Link to="/shop" className="hover:text-slate-900">Shipping & Delivery</Link></li>
              <li><Link to="/shop" className="hover:text-slate-900">Returns & Exchanges</Link></li>
              <li><Link to="/shop" className="hover:text-slate-900">Track Order</Link></li>
              <li><Link to="/shop" className="hover:text-slate-900">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-0.5" /> 24 Pearl Avenue, Bengaluru, India</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail size={16} /> hello@novacart.in</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-slate-200 pt-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Newsletter</h3>
            <div className="mt-3 flex w-full max-w-md items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <Mail size={16} className="text-slate-400" />
              <input type="email" placeholder="Enter your email" className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400" />
              <button type="button" className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700">Join</button>
            </div>
            <p className="mt-2 text-xs text-slate-500">Demo-only subscription — no real mail is sent.</p>
          </div>

          <div className="flex items-center gap-3">
            {[Globe, MessageCircle, X, Sparkles].map((Icon) => (
              <a key={Icon.displayName || 'social'} href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © 2026 NovaCart. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
