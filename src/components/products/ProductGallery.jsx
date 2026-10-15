import { useState } from 'react'

export default function ProductGallery({ images = [], productName = '' }) {
  const [activeImage, setActiveImage] = useState(images[0] || '')

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50">
        <img src={activeImage || images[0]} alt={productName} className="h-[420px] w-full object-cover" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`overflow-hidden rounded-2xl border ${activeImage === image ? 'border-slate-900' : 'border-slate-200'} bg-slate-50`}
          >
            <img src={image} alt={productName} className="h-24 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
