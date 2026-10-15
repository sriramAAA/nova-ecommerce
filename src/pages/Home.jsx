import { ArrowRight, BadgeCheck, Boxes, CreditCard, Headphones, ShieldCheck, ShoppingBag, Star, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { products } from '../data/products'
import ProductCard from '../components/products/ProductCard'
import { formatINR } from '../utils/currency'

const featureProducts = products.filter((product) => product.isFeatured).slice(0, 8)
const trendingProducts = products.filter((product) => product.isOnSale).slice(0, 4)
const testimonials = [
  { name: 'Shalini P.', text: 'The quality feels premium and the checkout flow is unbelievably smooth. NovaCart nails the ecommerce experience.', rating: 5 },
  { name: 'Rohan K.', text: 'Beautiful product curation and a clean shopping experience. The mobile experience feels especially polished.', rating: 5 },
  { name: 'Ananya M.', text: 'Affordable products, strong design, and easy-to-navigate categories. It feels like a real brand store.', rating: 4 },
]

export default function Home() {
  return (
    <div className="pb-16">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-blue-700">
              <Star size={12} className="fill-current" /> Special launch offer
            </div>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Everyday essentials, elevated for modern life.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-600">
              Discover premium electronics, fashion, home accents, and wellness products designed to make everyday routines feel effortless.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/shop" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
                Shop Now <ArrowRight size={16} />
              </Link>
              <Link to="/shop?category=electronics" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-300">
                Explore Collections
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-8 text-sm text-slate-600">
              <div className="flex items-center gap-2"><BadgeCheck size={16} className="text-emerald-500" /> 4.8/5 customer rating</div>
              <div className="flex items-center gap-2"><Truck size={16} className="text-emerald-500" /> Ships in 24 hours</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-blue-100 blur-3xl" />
            <div className="absolute -right-4 bottom-8 h-32 w-32 rounded-full bg-slate-200 blur-3xl" />
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
                alt="Premium shopping lifestyle"
                className="h-[520px] w-full rounded-[24px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 left-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">This week</p>
              <p className="mt-2 text-2xl font-black text-slate-900">Up to 50% off</p>
              <p className="text-sm text-slate-500">Select premium finds</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Shop by category</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Curated collections</h2>
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/shop?category=${category.slug}`} className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <img src={category.image} alt={category.name} className="h-72 w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-left text-white">
                <div className="text-xl font-bold">{category.name}</div>
                <div className="mt-1 inline-flex items-center gap-2 text-sm text-slate-200">Shop now <ArrowRight size={14} /></div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Featured picks</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Must-have products</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-semibold text-slate-700 hover:text-slate-900 md:inline-flex">View all products</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featureProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-slate-900">
          <div className="grid gap-6 px-6 py-8 sm:px-10 lg:grid-cols-[1fr_0.9fr] lg:px-12 lg:py-12">
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">Seasonal sale</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">Fresh deals for your next upgrade.</h2>
              <p className="mt-4 max-w-md text-slate-300">Save up to 50% on premium tech, active essentials, and home favorites this week only.</p>
              <Link to="/shop?deals=true" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
                Explore deals <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rounded-[28px] bg-white p-4 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=1200&q=80" alt="Seasonal deal" className="h-72 w-full rounded-[20px] object-cover" />
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Flash offer</p>
                  <p className="mt-1 text-2xl font-black text-slate-900">{formatINR(4999)}</p>
                </div>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">Save 38%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Trending now</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Popular this week</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'Secure shopping', text: 'Encrypted, protected checkout with trustworthy payment flow UI.' },
            { icon: Truck, title: 'Easy returns', text: 'Hassle-free returns and exchanges within a simple policy window.' },
            { icon: Boxes, title: 'Fast delivery', text: 'Quick dispatch and express delivery on eligible orders.' },
            { icon: Headphones, title: 'Customer support', text: 'Friendly experts ready to help with product or order questions.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Icon size={22} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Customer reviews</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">Loved by shoppers</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((review) => (
            <div key={review.name} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400">{Array.from({ length: review.rating }).map((_, index) => <Star key={index} size={16} className="fill-current" />)}</div>
              <p className="mt-4 text-base leading-7 text-slate-600">“{review.text}”</p>
              <div className="mt-5 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-900">{review.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 px-6 py-10 text-center shadow-sm sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Newsletter</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">Get practical deals in your inbox</h2>
          <p className="mt-2 text-slate-600">A demo storefront—subscribing here only shows a frontend success message.</p>
          <div className="mx-auto mt-6 flex max-w-lg flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="Enter your email address" className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400" />
            <button type="button" className="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700">Subscribe</button>
          </div>
          <p className="mt-4 text-sm text-emerald-600">Demo success: You are subscribed to NovaCart updates.</p>
        </div>
      </section>
    </div>
  )
}
