export default function EmptyState({ title, message, actionLabel, onAction }) {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-900 p-8 text-center sm:p-12">
      <p className="text-3xl">🗂️</p>
      <h2 className="mt-2 text-lg font-semibold text-slate-200">{title}</h2>
      {message && <p className="mt-1 text-sm text-slate-400">{message}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-lg bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
