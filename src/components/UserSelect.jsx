import { ALL_USERS } from '../utils/tasks'

export default function UserSelect({ options, value, onChange }) {
  return (
    <label className="block w-full lg:w-52">
      <span className="sr-only">Filter by user</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 focus:outline-none"
      >
        <option value={ALL_USERS}>User: All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
