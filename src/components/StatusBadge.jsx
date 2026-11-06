export default function StatusBadge({ completed }) {
  return completed ? (
    <span className="inline-flex shrink-0 items-center rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/30">
      Completed
    </span>
  ) : (
    <span className="inline-flex shrink-0 items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-400 ring-1 ring-amber-500/30">
      Pending
    </span>
  )
}
