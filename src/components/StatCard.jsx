const ACCENTS = {
  pink: 'text-pink-400',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
  slate: 'text-slate-100',
}

export default function StatCard({ label, value, accent = 'slate' }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm sm:p-5">
      <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">{label}</p>
      <p className={`mt-1 text-2xl font-bold sm:text-3xl ${ACCENTS[accent]}`}>{value}</p>
    </div>
  )
}
