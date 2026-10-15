import { useState } from 'react'
import { validateCheckoutForm } from '../../utils/validation'

const initialState = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
  country: 'India',
  paymentMethod: 'cod',
}

export default function CheckoutForm({ onSubmit, cartItems = [], summary }) {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validateCheckoutForm(values)
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    onSubmit({ ...values, items: cartItems, summary })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
          <input name="fullName" value={values.fullName} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400" />
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
          <input type="email" name="email" value={values.email} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400" />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Phone</label>
          <input name="phone" value={values.phone} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400" />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Country</label>
          <input name="country" value={values.country} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400" />
          {errors.country && <p className="mt-1 text-xs text-red-500">{errors.country}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Address</label>
        <textarea name="address" value={values.address} onChange={handleChange} rows={3} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400" />
        {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">City</label>
          <input name="city" value={values.city} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400" />
          {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">State</label>
          <input name="state" value={values.state} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400" />
          {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">PIN code</label>
          <input name="pinCode" value={values.pinCode} onChange={handleChange} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-slate-400" />
          {errors.pinCode && <p className="mt-1 text-xs text-red-500">{errors.pinCode}</p>}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-700">Payment method</p>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { value: 'cod', label: 'Cash on Delivery' },
            { value: 'upi', label: 'UPI demo' },
            { value: 'card', label: 'Card demo' },
          ].map((option) => (
            <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700">
              <input type="radio" name="paymentMethod" value={option.value} checked={values.paymentMethod === option.value} onChange={handleChange} className="h-4 w-4 accent-blue-600" />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
        {values.paymentMethod === 'card' && (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
            Card demo only — no real card details are collected or stored.
          </p>
        )}
      </div>

      <button type="submit" className="w-full rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700">
        Place order
      </button>
    </form>
  )
}
