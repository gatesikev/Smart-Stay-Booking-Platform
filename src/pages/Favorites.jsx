import { useFavorites } from '../context/AppContext'
import { useQueryClient } from '@tanstack/react-query'
import ListingCard from '../components/listings/ListingCard'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const { favoriteIds } = useFavorites()
  const queryClient = useQueryClient()

  const allCached = queryClient.getQueriesData({ queryKey: ['listings'] })
  const allListings = allCached.flatMap(([, data]) => data ?? [])
  const favorites = allListings.filter((l) => favoriteIds.includes(l.id))

  if (favoriteIds.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-brand-300" />
        </div>
        <h2 className="font-display text-2xl text-stone-700 mb-2">No favorites yet</h2>
        <p className="font-body text-stone-400 text-sm mb-6">Save listings you love by clicking the heart icon</p>
        <Link to="/" className="btn-primary">Explore Listings</Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl text-stone-900 mb-2">My Favorites</h1>
      <p className="font-body text-stone-400 text-sm mb-8">
        {favoriteIds.length} saved {favoriteIds.length === 1 ? 'place' : 'places'}
      </p>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="font-body text-stone-400 text-sm">Your saved listings will appear here once you browse and come back.</p>
          <Link to="/" className="btn-primary mt-4 inline-flex">Browse Now</Link>
        </div>
      )}
    </div>
  )
}