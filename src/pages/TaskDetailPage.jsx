import { Link, useParams } from 'react-router'
import { useTodo } from '../hooks/useTaskQueries'
import { useDoneOverrides } from '../hooks/useDoneOverrides'
import { applyDoneOverrides } from '../utils/tasks'
import StatusBadge from '../components/StatusBadge'
import TaskOwner from '../components/TaskOwner'
import MarkDoneButton from '../components/MarkDoneButton'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'

export default function TaskDetailPage() {
  const { id } = useParams()
  const { data: fetchedTask, isPending, isError, error, refetch } = useTodo(id)
  const { doneOverrides, toggleDone } = useDoneOverrides()
  const [task] = fetchedTask ? applyDoneOverrides([fetchedTask], doneOverrides) : []

  return (
    <div className="mx-auto max-w-2xl">
      <Link to="/tasks" className="mb-4 inline-block text-sm font-medium text-pink-400 hover:text-pink-300">
        ← Back to tasks
      </Link>

      {isPending && <LoadingState label={`Loading task #${id}…`} rows={1} />}
      {isError && <ErrorState error={error} onRetry={refetch} />}

      {task && (
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm font-medium text-slate-400">Task #{task.id}</span>
            <StatusBadge completed={task.completed} />
          </div>

          <h1 className="mt-4 text-xl leading-snug font-bold wrap-break-word sm:text-2xl">{task.todo}</h1>

          <dl className="mt-6 grid gap-4 border-t border-slate-800 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium tracking-wide text-slate-400 uppercase">Status</dt>
              <dd className="mt-1 text-sm">{task.completed ? 'Done' : 'Still to do'}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium tracking-wide text-slate-400 uppercase">Assigned to</dt>
              <dd className="mt-1 text-sm">
                <TaskOwner userId={task.userId} />
              </dd>
            </div>
          </dl>

          <MarkDoneButton done={task.completed} onToggle={() => toggleDone(task)} />

          <nav className="mt-8 flex justify-between border-t border-slate-800 pt-4 text-sm">
            {task.id > 1 ? (
              <Link to={`/tasks/${task.id - 1}`} className="font-medium text-pink-400 hover:text-pink-300">
                ← Previous task
              </Link>
            ) : (
              <span />
            )}
            <Link to={`/tasks/${task.id + 1}`} className="font-medium text-pink-400 hover:text-pink-300">
              Next task →
            </Link>
          </nav>
        </article>
      )}
    </div>
  )
}
