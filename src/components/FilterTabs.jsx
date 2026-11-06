export default function FilterTabs({ options, value, counts, onChange }) {
  return (
    <div role="tablist" aria-label="Filter tasks by status" className="flex gap-1 rounded-lg bg-slate-800 p-1">
      {options.map((option) => {
        const isActive = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition sm:flex-none ${
              isActive ? 'bg-slate-900 text-slate-100 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            {option.label}
            <span className="ml-1.5 text-xs text-slate-500">{counts[option.value]}</span>
          </button>
        )
      })}
    </div>
  )
}
