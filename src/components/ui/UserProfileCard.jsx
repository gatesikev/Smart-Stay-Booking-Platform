import { User, BookOpen, Heart, LogOut } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../store/index'

export default function UserProfileCard() {
  const { user, isAuthenticated } = useSelector((s) => s.auth)
  const dispatch = useDispatch()

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-5 text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto">
          <User className="w-7 h-7 text-stone-400" />
        </div>
        <p className="font-body text-stone-600 text-sm">Sign in to manage your bookings</p>
        <Link to="/login" className="btn-primary w-full justify-center">Sign In</Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center overflow-hidden">
          {user?.avatar
            ? <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            : <User className="w-6 h-6 text-brand-500" />
          }
        </div>
        <div>
          <p className="font-body font-medium text-stone-800">{user?.name}</p>
          <p className="font-body text-xs text-stone-400">{user?.email}</p>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <Link to="/bookings" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-stone-50 text-sm font-body text-stone-600 transition-colors">
          <BookOpen className="w-4 h-4 text-brand-500" /> My Bookings
        </Link>
        <Link to="/favorites" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-stone-50 text-sm font-body text-stone-600 transition-colors">
          <Heart className="w-4 h-4 text-brand-500" /> Favorites
        </Link>
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 text-sm font-body text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  )
}