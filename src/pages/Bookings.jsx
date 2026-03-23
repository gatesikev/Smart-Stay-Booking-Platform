import { useSelector, useDispatch } from 'react-redux'
import { cancelBooking, removeBooking } from '../store/index'
import { Calendar, MapPin, Users, XCircle, Trash2, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

const STATUS_STYLES = {
  confirmed: 'bg-green-50 text-green-600',
  pending: 'bg-amber-50 text-amber-600',
  cancelled: 'bg-stone-100 text-stone-400',
}

export default function Bookings() {
  const { items } = useSelector((s) => s.bookings)
  const dispatch = useDispatch()

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-stone-300" />
        </div>
        <h2 className="font-display text-2xl text-stone-700 mb-2">No bookings yet</h2>
        <p className="font-body text-stone-400 text-sm mb-6">Your confirmed stays will appear here</p>
        <Link to="/" className="btn-primary">Browse Listings</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="font-display text-3xl text-stone-900 mb-8">My Bookings</h1>
      <div className="space-y-4">
        {items.map((booking) => (
          <div key={booking.id} className={`card p-5 flex gap-4 ${booking.status === 'cancelled' ? 'opacity-60' : ''}`}>
            <img
              src={booking.listingImage}
              alt={booking.listingName}
              className="w-24 h-24 rounded-xl object-cover shrink-0"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400' }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-body font-medium text-stone-800 text-sm leading-snug line-clamp-1">
                  {booking.listingName}
                </h3>
                <span className={`text-xs font-body font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_STYLES[booking.status]}`}>
                  {booking.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-3 text-xs font-body text-stone-500 mb-3">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{booking.city}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{booking.checkIn} → {booking.checkOut}</span>
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{booking.guests} guests</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-display text-lg text-stone-800">{booking.currency} {booking.totalPrice}</span>
                <div className="flex items-center gap-2">
                  {booking.status !== 'cancelled' && (
                    <button onClick={() => dispatch(cancelBooking(booking.id))} className="flex items-center gap-1 text-xs font-body text-amber-600 hover:text-amber-700 transition-colors">
                      <XCircle className="w-3.5 h-3.5" /> Cancel
                    </button>
                  )}
                  <button onClick={() => dispatch(removeBooking(booking.id))} className="flex items-center gap-1 text-xs font-body text-red-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}