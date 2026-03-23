import { configureStore, createSlice } from '@reduxjs/toolkit'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function loadBookings() {
  try {
    const stored = localStorage.getItem('smartstay_bookings')
    return stored ? JSON.parse(stored) : []
  } catch { return [] }
}

function saveBookings(bookings) {
  localStorage.setItem('smartstay_bookings', JSON.stringify(bookings))
}

function loadUser() {
  try {
    const u = localStorage.getItem('smartstay_user')
    return u ? JSON.parse(u) : null
  } catch { return null }
}

// ─── Bookings Slice ───────────────────────────────────────────────────────────
const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: { items: loadBookings() },
  reducers: {
    addBooking(state, action) {
      state.items.push(action.payload)
      saveBookings(state.items)
    },
    cancelBooking(state, action) {
      const booking = state.items.find((b) => b.id === action.payload)
      if (booking) {
        booking.status = 'cancelled'
        saveBookings(state.items)
      }
    },
    removeBooking(state, action) {
      state.items = state.items.filter((b) => b.id !== action.payload)
      saveBookings(state.items)
    },
  },
})

export const { addBooking, cancelBooking, removeBooking } = bookingsSlice.actions

// ─── Auth Slice ───────────────────────────────────────────────────────────────
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: !!localStorage.getItem('smartstay_user'),
    user: loadUser(),
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true
      state.user = action.payload
      localStorage.setItem('smartstay_user', JSON.stringify(action.payload))
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
      localStorage.removeItem('smartstay_user')
    },
  },
})

export const { login, logout } = authSlice.actions

// ─── Store ────────────────────────────────────────────────────────────────────
export const store = configureStore({
  reducer: {
    bookings: bookingsSlice.reducer,
    auth: authSlice.reducer,
  },
})