const SESSION_NOTE = 'Changes are saved for this session only. The DummyJSON API is read-only.'

function InfoTip() {
  return (
    <span className="group relative shrink-0">
      <button
        type="button"
        aria-label={SESSION_NOTE}
        className="grid size-9 place-items-center rounded-full text-slate-500 transition-colors hover:text-slate-300 focus-visible:text-slate-300"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <span
        aria-hidden="true"
        className="pointer-events-none invisible absolute top-full left-0 z-10 mt-2 w-64 rounded-lg bg-slate-800 px-3 py-2 text-xs leading-relaxed text-slate-200 opacity-0 shadow-lg ring-1 ring-slate-700 transition-opacity duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 sm:right-0 sm:left-auto"
      >
        {SESSION_NOTE}
      </span>
    </span>
  )
}

export default function MarkDoneButton({ done, onToggle }) {
  return (
    <div className="flex items-center gap-2 sm:justify-end">
      <InfoTip />
      <button
        type="button"
        onClick={onToggle}
        className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors duration-200 sm:flex-none ${
          done
            ? 'border-slate-600 bg-transparent text-slate-200 hover:bg-slate-800'
            : 'border-transparent bg-pink-600 text-white hover:bg-pink-500'
        }`}
      >
        {done ? 'Mark as pending' : 'Mark as done'}
      </button>
    </div>
  )
}
