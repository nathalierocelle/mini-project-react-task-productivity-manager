import { Link } from 'react-router'
import { useUser } from '../hooks/useTaskQueries'
import { getFullName } from '../utils/users'
import Avatar from './Avatar'

function DetailField({ label, children }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-medium tracking-wide text-slate-400 uppercase">{label}</dt>
      <dd className="mt-1.5 flex min-h-8 items-center text-sm text-slate-200">{children}</dd>
    </div>
  )
}

function Assignee({ userId, user, isPending, isError }) {
  if (isPending) return <span className="text-slate-500">Loading…</span>
  if (isError) return <span className="text-slate-400">User #{userId}</span>

  const fullName = getFullName(user)
  return (
    <Link
      to={`/users/${userId}`}
      className="flex min-w-0 items-center gap-2 rounded-md font-medium text-pink-400 hover:text-pink-300"
    >
      <Avatar key={user.image} src={user.image} name={fullName} />
      <span className="truncate">{fullName}</span>
    </Link>
  )
}

// `position` and `total` come from the cached task list and may be undefined while it loads.
export default function TaskDetails({ task, position, total }) {
  const { data: user, isPending, isError } = useUser(task.userId)
  const role = isPending ? '…' : (user?.company?.title ?? '—')

  return (
    <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <DetailField label="Assigned to">
        <Assignee userId={task.userId} user={user} isPending={isPending} isError={isError} />
      </DetailField>
      <DetailField label="Role">
        <span className="truncate">{role}</span>
      </DetailField>
      <DetailField label="Position">{position && total ? `${position} of ${total}` : '—'}</DetailField>
    </dl>
  )
}
