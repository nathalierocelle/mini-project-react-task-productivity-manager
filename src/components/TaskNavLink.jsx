import { Link } from 'react-router'

export default function TaskNavLink({ task, direction }) {
  const isNext = direction === 'next'

  return (
    <Link
      to={`/tasks/${task.id}`}
      className={`group -m-2 block min-w-0 rounded-lg p-2 transition-colors hover:bg-slate-800/60 ${
        isNext ? 'text-right' : ''
      }`}
    >
      <span className="block text-sm font-medium text-pink-400 group-hover:text-pink-300">
        {isNext ? 'Next task →' : '← Previous task'}
      </span>
      <span className="mt-0.5 block truncate text-xs text-slate-400">{task.todo}</span>
    </Link>
  )
}
