import { Star } from 'lucide-react'

export default function RatingStars({ rating = 0, size = 16 }) {
  const fullStars = Math.round(rating)

  return (
    <div className="flex items-center gap-1 text-amber-400" aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={size}
          className={index < fullStars ? 'fill-current' : 'text-slate-300'}
        />
      ))}
    </div>
  )
}
