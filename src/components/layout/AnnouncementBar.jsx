import { X } from 'lucide-react'

export default function AnnouncementBar({ visible, onDismiss }) {
  if (!visible) return null

  return (
    <div className="bg-slate-950 text-sm text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <p className="flex-1 text-center text-xs font-medium sm:text-sm">Free shipping on orders above ₹999</p>
        <button type="button" onClick={onDismiss} className="rounded-full p-1 text-slate-300 transition hover:text-white" aria-label="Dismiss announcement">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
