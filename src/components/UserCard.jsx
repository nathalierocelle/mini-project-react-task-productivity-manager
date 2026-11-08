import { Link } from 'react-router'
import { getFullName } from '../utils/users'

export default function UserCard({ user, taskCount }) {
  const fullName = getFullName(user)

  return (
    <Link
      to={`/users/${user.id}`}
      className="flex h-full min-h-28 items-center gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm transition hover:border-pink-500/60 hover:shadow-md"
    >
      <img src={user.image} alt="" className="size-12 shrink-0 overflow-hidden rounded-full bg-slate-800 ring-2 ring-pink-500/30" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-100">{fullName}</p>
        <p className="truncate text-xs text-slate-400">{user.company?.title}</p>
      </div>
      <div className="shrink-0 text-right">
        <p className="text-lg font-bold text-pink-400">{taskCount}</p>
        <p className="text-xs text-slate-500">{taskCount === 1 ? 'task' : 'tasks'}</p>
      </div>
    </Link>
  )
}
