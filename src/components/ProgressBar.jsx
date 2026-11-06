export default function ProgressBar({ percent, label }) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-slate-300">{label}</span>
        <span className="text-slate-400">{percent}%</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-2.5 overflow-hidden rounded-full bg-slate-800"
      >
        <div className="h-full rounded-full bg-pink-600" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
