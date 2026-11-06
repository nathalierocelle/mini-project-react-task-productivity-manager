export default function LoadingState({ label = 'Loading…', rows = 8 }) {
  return (
    <div role="status" aria-live="polite">
      <p className="mb-4 flex items-center gap-2 text-sm text-slate-400">
        <span className="size-4 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
        {label}
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: rows }, (_, index) => (
          <div key={index} className="h-24 animate-pulse rounded-xl bg-slate-800/70" />
        ))}
      </div>
    </div>
  )
}
