import { Heart, Star, Users, Bed } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../../context/AppContext'

export default function ListingCard({ listing }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const fav = isFavorite(listing.id)

  return (
    <div className="card group cursor-pointer animate-fade-up">
      <Link to={`/listing/${listing.id}`} className="block relative overflow-hidden h-52">
        <img
          src={listing.imageUrl}
          alt={listing.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' }}
        />
        {listing.isSuperhost && (
          <span className="absolute top-3 left-3 bg-white text-stone-800 text-xs font-body font-medium px-2.5 py-1 rounded-full shadow-sm">
            Superhost
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggleFavorite(listing.id) }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart className={`w-4 h-4 transition-colors ${fav ? 'fill-brand-500 text-brand-500' : 'text-stone-500'}`} />
        </button>
      </Link>

      <Link to={`/listing/${listing.id}`} className="block p-4">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-body font-medium text-stone-900 text-sm leading-snug line-clamp-2 flex-1">
            {listing.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-body text-stone-700">{listing.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-xs text-stone-400 font-body mb-3">{listing.city} · {listing.roomType}</p>
        <div className="flex items-center gap-3 text-xs text-stone-500 font-body mb-3">
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{listing.capacity}</span>
          <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" />{listing.bedrooms} bd</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-lg text-stone-900">{listing.currency} {listing.pricePerNight}</span>
            <span className="text-xs text-stone-400 font-body"> / night</span>
          </div>
          <span className="text-xs text-stone-400 font-body">{listing.reviewCount} reviews</span>
        </div>
      </Link>
    </div>
  )
}