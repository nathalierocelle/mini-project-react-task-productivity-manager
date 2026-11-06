import { Link } from 'react-router'
import { useUser } from '../hooks/useTaskQueries'

export default function TaskOwner({ userId }) {
  const { data: user, isPending, isError } = useUser(userId)

  if (isPending) return <span className="text-slate-500">Loading…</span>
  if (isError) return <span className="text-slate-400">User #{userId}</span>

  return (
    <Link to={`/users/${userId}`} className="inline-flex items-center gap-2 font-medium text-pink-400 hover:text-pink-300">
      <img src={user.image} alt="" className="size-6 overflow-hidden rounded-full bg-slate-800" />
      {user.firstName} {user.lastName}
    </Link>
  )
}
