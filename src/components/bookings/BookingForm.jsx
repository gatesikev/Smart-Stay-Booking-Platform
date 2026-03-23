import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBooking } from '../../store/index'
import { Calendar, Users, CheckCircle } from 'lucide-react'

export default function BookingForm({ listing }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((s) => s.auth)

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(1)
  const [booked, setBooked] = useState(false)
  const [error, setError] = useState('')

  const today = new Date().toISOString().split('T')[0]
  const nights = checkIn && checkOut
    ? Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
    : 0
  const total = nights * listing.pricePerNight

  const handleBook = () => {
    setError('')
    if (!isAuthenticated) return navigate('/login')
    if (!checkIn || !checkOut) return setError('Please select check-in and check-out dates.')
    if (nights <= 0) return setError('Check-out must be after check-in.')
    if (guests > listing.capacity) return setError(`Max capacity is ${listing.capacity} guests.`)

    dispatch(addBooking({
      id: `bk_${Date.now()}`,
      listingId: listing.id,
      listingName: listing.name,
      listingImage: listing.imageUrl,
      city: listing.city,
      checkIn,
      checkOut,
      guests,
      totalPrice: total,
      currency: listing.currency,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }))
    setBooked(true)
  }

  if (booked) {
    return (
      <div className="bg-white rounded-2xl shadow-card p-6 text-center space-y-4">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto">
          <CheckCircle className="w-7 h-7 text-green-500" />
        </div>
        <h3 className="font-display text-xl text-stone-800">Booking Confirmed!</h3>
        <p className="text-sm text-stone-500 font-body">
          Your stay at <strong>{listing.name}</strong> has been booked.
        </p>
        <button onClick={() => navigate('/bookings')} className="btn-primary w-full justify-center">
          View My Bookings
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 space-y-4 sticky top-20">
      <div>
        <span className="font-display text-2xl text-stone-900">{listing.currency} {listing.pricePerNight}</span>
        <span className="text-stone-400 font-body text-sm"> / night</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-body font-medium text-stone-500 block mb-1">
            <Calendar className="w-3 h-3 inline mr-1" />Check-in
          </label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="input-field py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-body font-medium text-stone-500 block mb-1">
            <Calendar className="w-3 h-3 inline mr-1" />Check-out
          </label>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="input-field py-2 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-body font-medium text-stone-500 block mb-1">
          <Users className="w-3 h-3 inline mr-1" />Guests
        </label>
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="input-field py-2 text-sm"
        >
          {Array.from({ length: listing.capacity }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>

      {error && (
        <p className="text-xs text-red-500 font-body bg-red-50 px-3 py-2 rounded-lg">{error}</p>
      )}

      {nights > 0 && (
        <div className="bg-stone-50 rounded-xl p-4 space-y-2 text-sm font-body">
          <div className="flex justify-between text-stone-600">
            <span>{listing.currency} {listing.pricePerNight} × {nights} nights</span>
            <span>{listing.currency} {total}</span>
          </div>
          <div className="flex justify-between font-medium text-stone-800 pt-2 border-t border-stone-200">
            <span>Total</span>
            <span>{listing.currency} {total}</span>
          </div>
        </div>
      )}

      <button onClick={handleBook} className="btn-primary w-full justify-center text-base py-3">
        {isAuthenticated ? 'Reserve Now' : 'Sign In to Book'}
      </button>
    </div>
  )
}