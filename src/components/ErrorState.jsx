import { Link } from 'react-router'
import { isClientError } from '../api/dummyjson'

export default function ErrorState({ error, onRetry }) {
  const isNotFound = isClientError(error)

  return (
    <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
      <p className="text-3xl">⚠️</p>
      <h2 className="mt-2 text-lg font-semibold text-red-300">
        {isNotFound ? 'Not found' : 'Something went wrong'}
      </h2>
      <p className="mt-1 text-sm text-red-300">{error?.message ?? 'Unable to load data.'}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {!isNotFound && onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Try again
          </button>
        )}
        <Link
          to="/tasks"
          className="rounded-lg border border-red-500/40 bg-slate-900 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-500/10"
        >
          Back to tasks
        </Link>
      </div>
    </div>
  )
}
