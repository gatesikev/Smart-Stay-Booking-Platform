import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useListing } from '../hooks/useListings'
import BookingForm from '../components/bookings/BookingForm'
import { Loader } from '../components/ui/Loader'
import { ErrorState } from '../components/ui/ErrorState'
import { ArrowLeft, Star, Users, Bed, Bath, Heart, CheckCircle } from 'lucide-react'
import { useFavorites } from '../context/AppContext'

export default function ListingDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: listing, isLoading, isError, error, refetch } = useListing(id)
  const { isFavorite, toggleFavorite } = useFavorites()
  const [imgIndex, setImgIndex] = useState(0)

  if (isLoading) return <Loader text="Loading property details..." />

  if (isError) return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <ErrorState
        message={error?.message}
        onRetry={refetch}
        isRateLimit={error?.response?.status === 429}
      />
    </div>
  )

  if (!listing) return null

  const fav = isFavorite(listing.id)
  const images = listing.images.length ? listing.images : [listing.imageUrl]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-500 hover:text-stone-800 font-body text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to listings
      </button>

      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-stone-900 mb-2">{listing.name}</h1>
          <div className="flex items-center gap-3 text-sm font-body text-stone-500">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              {listing.rating.toFixed(1)} · {listing.reviewCount} reviews
            </span>
            <span>·</span>
            <span>{listing.city}</span>
            {listing.isSuperhost && (
              <span className="bg-brand-50 text-brand-600 px-2 py-0.5 rounded-full text-xs font-medium">Superhost</span>
            )}
          </div>
        </div>
        <button onClick={() => toggleFavorite(listing.id)} className="flex items-center gap-2 btn-secondary py-2 px-4 shrink-0">
          <Heart className={`w-4 h-4 ${fav ? 'fill-brand-500 text-brand-500' : ''}`} />
          {fav ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className="mb-8">
        <div className="rounded-2xl overflow-hidden h-72 sm:h-96 mb-3">
          <img
            src={images[imgIndex]}
            alt={listing.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800' }}
          />
        </div>
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.slice(0, 6).map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${imgIndex === i ? 'border-brand-500' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between pb-6 border-b border-stone-100">
            <div>
              <h2 className="font-display text-xl text-stone-800 mb-1">
                {listing.roomType} hosted by {listing.hostName}
              </h2>
              <div className="flex items-center gap-4 text-sm font-body text-stone-500">
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{listing.capacity} guests</span>
                <span className="flex items-center gap-1"><Bed className="w-4 h-4" />{listing.bedrooms} bedrooms</span>
                <span className="flex items-center gap-1"><Bath className="w-4 h-4" />{listing.bathrooms} baths</span>
              </div>
            </div>
            {listing.hostAvatar && (
              <img src={listing.hostAvatar} alt={listing.hostName} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md" />
            )}
          </div>

          {listing.description && (
            <div>
              <h3 className="font-display text-xl text-stone-800 mb-3">About this place</h3>
              <p className="font-body text-stone-600 leading-relaxed text-sm">{listing.description}</p>
            </div>
          )}

          {listing.amenities.length > 0 && (
            <div>
              <h3 className="font-display text-xl text-stone-800 mb-4">Amenities</h3>
              <div className="grid grid-cols-2 gap-2">
                {listing.amenities.slice(0, 12).map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm font-body text-stone-600">
                    <CheckCircle className="w-4 h-4 text-brand-400 shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <BookingForm listing={listing} />
        </div>
      </div>
    </div>
  )
}