import { createContext, useContext, useReducer, useState, useEffect } from 'react'

const DEFAULT_FILTERS = {
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  roomType: 'all',
  location: '',
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ids: state.ids.includes(action.id)
          ? state.ids.filter((i) => i !== action.id)
          : [...state.ids, action.id],
      }
    case 'LOAD':
      return { ids: action.ids }
    default:
      return state
  }
}

const FavoritesContext = createContext(null)
const FiltersContext = createContext(null)

export function AppContextProvider({ children }) {
  const [favState, favDispatch] = useReducer(favoritesReducer, { ids: [] })
  const [filters, setFiltersState] = useState(DEFAULT_FILTERS)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('smartstay_favorites')
      if (stored) favDispatch({ type: 'LOAD', ids: JSON.parse(stored) })
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    localStorage.setItem('smartstay_favorites', JSON.stringify(favState.ids))
  }, [favState.ids])

  const toggleFavorite = (id) => favDispatch({ type: 'TOGGLE', id })
  const isFavorite = (id) => favState.ids.includes(id)
  const setFilters = (partial) => setFiltersState((prev) => ({ ...prev, ...partial }))
  const resetFilters = () => setFiltersState(DEFAULT_FILTERS)

  return (
    <FavoritesContext.Provider value={{ favoriteIds: favState.ids, isFavorite, toggleFavorite }}>
      <FiltersContext.Provider value={{ filters, setFilters, resetFilters }}>
        {children}
      </FiltersContext.Provider>
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within AppContextProvider')
  return ctx
}

export function useFilters() {
  const ctx = useContext(FiltersContext)
  if (!ctx) throw new Error('useFilters must be used within AppContextProvider')
  return ctx
}