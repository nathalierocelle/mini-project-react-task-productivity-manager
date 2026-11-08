export default function StatusBadge({ completed, doneLabel = 'Completed' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 transition-colors duration-200 ${
        completed
          ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/30'
          : 'bg-amber-500/10 text-amber-400 ring-amber-500/30'
      }`}
    >
      {completed ? doneLabel : 'Pending'}
    </span>
  )
}
