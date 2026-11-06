import { Link } from 'react-router'

export default function AssigneeChip({ userId, name }) {
  return (
    <Link
      to={`/users/${userId}`}
      className="max-w-full truncate rounded-full bg-pink-500/10 px-2.5 py-0.5 text-xs font-medium text-pink-300 ring-1 ring-pink-500/30 hover:bg-pink-500/20"
    >
      {name ?? `User #${userId}`}
    </Link>
  )
}
