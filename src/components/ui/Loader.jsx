export function SkeletonCard() {
  return (
    <div className="card">
      <div className="shimmer h-56 w-full" />
      <div className="p-4 space-y-3">
        <div className="shimmer h-4 rounded-full w-3/4" />
        <div className="shimmer h-3 rounded-full w-1/2" />
        <div className="shimmer h-3 rounded-full w-1/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="shimmer h-5 rounded-full w-1/4" />
          <div className="shimmer h-8 w-8 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-stone-200 border-t-brand-500 animate-spin" />
      <p className="text-stone-500 font-body text-sm">{text}</p>
    </div>
  )
}

export function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}