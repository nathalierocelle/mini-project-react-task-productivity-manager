export default function MarkDoneButton({ done, onToggle }) {
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={onToggle}
        className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium transition sm:w-auto ${
          done
            ? 'border border-slate-700 text-slate-300 hover:bg-slate-800'
            : 'bg-pink-600 text-white hover:bg-pink-500'
        }`}
      >
        {done ? 'Mark as not done' : 'Mark as done'}
      </button>
      <p className="mt-2 text-xs text-slate-500">
        Saved for this session only. The DummyJSON API is read-only.
      </p>
    </div>
  )
}
