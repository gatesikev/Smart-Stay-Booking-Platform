import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/index'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated } = useSelector((s) => s.auth)

  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  if (isAuthenticated) {
    navigate('/')
    return null
  }

  const handleSubmit = () => {
    setError('')
    if (!form.email || !form.password) return setError('Please fill in all fields.')
    if (isSignUp && !form.name) return setError('Please enter your name.')

    dispatch(login({
      id: `user_${Date.now()}`,
      name: form.name || form.email.split('@')[0],
      email: form.email,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${form.name || form.email}`,
    }))
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-stone-50 to-brand-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-float p-8 space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-display font-bold text-xl">S</span>
            </div>
            <h1 className="font-display text-3xl text-stone-900">
              {isSignUp ? 'Create account' : 'Welcome back'}
            </h1>
            <p className="font-body text-stone-400 text-sm mt-1">
              {isSignUp ? 'Join SmartStay today' : 'Sign in to your SmartStay account'}
            </p>
          </div>

          <div className="space-y-4">
            {isSignUp && (
              <div>
                <label className="text-xs font-body font-medium text-stone-500 block mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-field"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-body font-medium text-stone-500 block mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs font-body font-medium text-stone-500 block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="input-field pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 font-body bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button onClick={handleSubmit} className="btn-primary w-full justify-center py-3 text-base">
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </div>

          <p className="text-center text-sm font-body text-stone-400">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button onClick={() => setIsSignUp(!isSignUp)} className="text-brand-500 hover:text-brand-600 font-medium transition-colors">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <p className="text-center text-xs font-body text-stone-400 mt-6">
          <Link to="/" className="hover:text-brand-500 transition-colors">← Back to listings</Link>
        </p>
      </div>
    </div>
  )
}