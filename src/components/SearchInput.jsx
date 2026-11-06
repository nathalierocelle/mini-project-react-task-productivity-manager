export default function SearchInput({ value, onChange, label = 'Search tasks' }) {
  return (
    <label className="block w-full">
      <span className="sr-only">{label}</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={`${label}…`}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm shadow-sm placeholder:text-slate-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:outline-none"
      />
    </label>
  )
}
