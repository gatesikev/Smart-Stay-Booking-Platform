import { useState } from 'react'
import { useFilters } from '../context/AppContext'
import { useListings } from '../hooks/useListings'
import ListingCard from '../components/listings/ListingCard'
import FilterPanel from '../components/layout/FilterPanel'
import { SkeletonGrid } from '../components/ui/Loader'
import { ErrorState } from '../components/ui/ErrorState'
import { SlidersHorizontal, X } from 'lucide-react'

const DEFAULT_PLACE_ID = 'Paris'

export default function Home({ searchQuery }) {
  const { filters } = useFilters()
  const [showFilters, setShowFilters] = useState(false)

  const placeId = searchQuery || DEFAULT_PLACE_ID

  const { data: listings = [], isLoading, isError, error, refetch } = useListings({ placeId })

  const filtered = listings.filter((l) => {
    if (l.pricePerNight < filters.minPrice) return false
    if (l.pricePerNight > filters.maxPrice) return false
    if (l.rating < filters.minRating) return false
    if (filters.roomType !== 'all' && l.roomType !== filters.roomType) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl text-stone-900 mb-3">
          Find your perfect <span className="text-brand-500 italic">stay</span>
        </h1>
        <p className="font-body text-stone-500 text-lg">
          Discover unique places to stay around the world
        </p>
      </div>

      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <FilterPanel />
        </aside>

        <div className="flex-1 min-w-0">
          <div className="lg:hidden mb-4 flex items-center justify-between">
            <p className="text-sm font-body text-stone-500">
              {isLoading ? 'Loading...' : `${filtered.length} stays found`}
            </p>
            <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary py-2 px-4">
              {showFilters ? <X className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
              {showFilters ? 'Hide' : 'Filters'}
            </button>
          </div>

          {showFilters && (
            <div className="lg:hidden mb-6">
              <FilterPanel />
            </div>
          )}

          {!isLoading && !isError && (
            <p className="hidden lg:block text-sm font-body text-stone-400 mb-5">
              {filtered.length} stays found
            </p>
          )}

          {isLoading && <SkeletonGrid count={8} />}

          {isError && (
            <ErrorState
              message={error?.message}
              isRateLimit={error?.response?.status === 429}
              onRetry={refetch}
            />
          )}

          {!isLoading && !isError && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-2xl text-stone-400 mb-2">No stays found</p>
              <p className="font-body text-stone-400 text-sm">Try adjusting your filters</p>
            </div>
          )}

          {!isLoading && !isError && filtered.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((listing, i) => (
                <div key={listing.id} style={{ animationDelay: `${i * 60}ms` }}>
                  <ListingCard listing={listing} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}