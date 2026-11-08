import { getFullName } from '../utils/users'
import Avatar from './Avatar'

export default function UserProfileCard({ user }) {
  const fullName = getFullName(user)

  return (
    <section className="flex flex-col items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 text-center shadow-sm sm:flex-row sm:p-6 sm:text-left">
      <Avatar key={user.image} src={user.image} name={fullName} className="size-20 text-2xl ring-4 ring-pink-500/30" />
      <div className="w-full min-w-0 sm:flex-1">
        <h1 className="text-2xl font-bold wrap-break-word">{fullName}</h1>
        {user.company && (
          <p className="text-sm wrap-break-word text-slate-400">
            {user.company.title} · {user.company.name}
          </p>
        )}
        <p className="mt-1 truncate text-sm text-slate-400">{user.email}</p>
      </div>
    </section>
  )
}
