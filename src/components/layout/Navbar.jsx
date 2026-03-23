import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Heart, Menu, X, User, LogOut, BookOpen } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/index'

export default function Navbar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { isAuthenticated, user } = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) onSearch?.(query.trim())
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">S</span>
            </div>
            <span className="font-display text-xl text-stone-900 hidden sm:block">SmartStay</span>
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search destinations..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-stone-200 bg-stone-50 text-sm font-body focus:outline-none focus:ring-2 focus:ring-brand-400 focus:bg-white transition-all"
              />
            </div>
          </form>

          <nav className="hidden md:flex items-center gap-2">
            <Link to="/favorites" className="btn-secondary py-2 px-4">
              <Heart className="w-4 h-4" /> Favorites
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/bookings" className="btn-secondary py-2 px-4">
                  <BookOpen className="w-4 h-4" /> Bookings
                </Link>
                <div className="flex items-center gap-2 pl-2 border-l border-stone-200">
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center overflow-hidden">
                    {user?.avatar
                      ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      : <User className="w-4 h-4 text-brand-600" />
                    }
                  </div>
                  <span className="text-sm font-body text-stone-700">{user?.name}</span>
                  <button onClick={() => dispatch(logout())} className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-700 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-4">Sign In</Link>
            )}
          </nav>

          <button className="md:hidden p-2 rounded-lg hover:bg-stone-100 transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-3 border-t border-stone-100 flex flex-col gap-2 animate-fade-up">
            <Link to="/favorites" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-50 text-sm font-body" onClick={() => setMenuOpen(false)}>
              <Heart className="w-4 h-4 text-brand-500" /> Favorites
            </Link>
            {isAuthenticated ? (
              <>
                <Link to="/bookings" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-50 text-sm font-body" onClick={() => setMenuOpen(false)}>
                  <BookOpen className="w-4 h-4 text-brand-500" /> My Bookings
                </Link>
                <button onClick={() => { dispatch(logout()); setMenuOpen(false) }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-stone-50 text-sm font-body text-red-500">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary mx-2" onClick={() => setMenuOpen(false)}>Sign In</Link>
            )}
          </div>
        )}
      </div>
    </header>
  )
}