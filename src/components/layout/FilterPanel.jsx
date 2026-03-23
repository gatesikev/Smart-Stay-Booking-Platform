import { SlidersHorizontal, RotateCcw } from 'lucide-react'
import { useFilters } from '../../context/AppContext'

const ROOM_TYPES = ['all', 'Entire place', 'Private room', 'Shared room']

export default function FilterPanel() {
  const { filters, setFilters, resetFilters } = useFilters()

  return (
    <aside className="bg-white rounded-2xl shadow-card p-5 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-brand-500" />
          <h2 className="font-display text-base text-stone-800">Filters</h2>
        </div>
        <button onClick={resetFilters} className="text-xs text-stone-400 hover:text-brand-500 flex items-center gap-1 transition-colors">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <label className="text-sm font-body font-medium text-stone-700">Price per night</label>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <p className="text-xs text-stone-400 mb-1">Min</p>
            <input
              type="number"
              min={0}
              value={filters.minPrice}
              onChange={(e) => setFilters({ minPrice: Number(e.target.value) })}
              className="input-field py-2"
              placeholder="0"
            />
          </div>
          <span className="text-stone-300 mt-5">—</span>
          <div className="flex-1">
            <p className="text-xs text-stone-400 mb-1">Max</p>
            <input
              type="number"
              min={0}
              value={filters.maxPrice}
              onChange={(e) => setFilters({ maxPrice: Number(e.target.value) })}
              className="input-field py-2"
              placeholder="1000"
            />
          </div>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-3">
        <label className="text-sm font-body font-medium text-stone-700">
          Minimum Rating: <span className="text-brand-500">{filters.minRating > 0 ? `${filters.minRating}★` : 'Any'}</span>
        </label>
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={filters.minRating}
          onChange={(e) => setFilters({ minRating: Number(e.target.value) })}
          className="w-full accent-brand-500"
        />
        <div className="flex justify-between text-xs text-stone-400">
          <span>Any</span><span>5★</span>
        </div>
      </div>

      {/* Room Type */}
      <div className="space-y-3">
        <label className="text-sm font-body font-medium text-stone-700">Room Type</label>
        <div className="flex flex-col gap-2">
          {ROOM_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setFilters({ roomType: type })}
              className={`text-left px-3 py-2 rounded-xl text-sm font-body transition-all ${
                filters.roomType === type
                  ? 'bg-brand-50 text-brand-600 border border-brand-200 font-medium'
                  : 'text-stone-600 hover:bg-stone-50 border border-transparent'
              }`}
            >
              {type === 'all' ? 'All Types' : type}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}