import { AlertTriangle, RefreshCw, WifiOff } from 'lucide-react'

export function ErrorState({ message, onRetry, isRateLimit }) {
  const isRate = isRateLimit || message?.toLowerCase().includes('rate')

  return (
    <div className="flex flex-col items-center justify-center py-20 gap-5 text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
        {isRate
          ? <WifiOff className="w-8 h-8 text-red-400" />
          : <AlertTriangle className="w-8 h-8 text-red-400" />
        }
      </div>
      <div>
        <h3 className="font-display text-xl text-stone-800 mb-2">
          {isRate ? 'API Rate Limit Reached' : 'Something went wrong'}
        </h3>
        <p className="text-stone-500 font-body text-sm max-w-sm">
          {isRate
            ? 'Too many requests. Please wait a moment before trying again.'
            : message ?? "We couldn't load the listings. Please try again."}
        </p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn-primary">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      )}
    </div>
  )
}