import { Link, useParams } from 'react-router'
import { useTodo, useTodos } from '../hooks/useTaskQueries'
import { useDoneOverrides } from '../hooks/useDoneOverrides'
import { applyDoneOverrides, getAdjacentTasks } from '../utils/tasks'
import StatusBadge from '../components/StatusBadge'
import TaskDetails from '../components/TaskDetails'
import MarkDoneButton from '../components/MarkDoneButton'
import TaskNavLink from '../components/TaskNavLink'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'

export default function TaskDetailPage() {
  const { id } = useParams()
  const { data: fetchedTask, isPending, isError, error, refetch } = useTodo(id)
  const { doneOverrides, toggleDone } = useDoneOverrides()
  // Shares the cached ['todos'] list for the position and the previous/next titles.
  const { data: allTasks } = useTodos()
  const [task] = fetchedTask ? applyDoneOverrides([fetchedTask], doneOverrides) : []
  const { previous, next, position } = task && allTasks ? getAdjacentTasks(allTasks, task.id) : {}

  return (
    <>
      <Link to="/tasks" className="mb-4 inline-block rounded-md text-sm font-medium text-pink-400 hover:text-pink-300">
        ← Back to tasks
      </Link>

      {isPending && <LoadingState label={`Loading task #${id}…`} rows={1} />}
      {isError && <ErrorState error={error} onRetry={refetch} />}

      {task && (
        <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm sm:p-6">
          <p className="text-sm font-medium text-slate-400">Task #{task.id}</p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
              <h1 className="text-xl leading-snug font-bold wrap-break-word sm:text-2xl">{task.todo}</h1>
              <StatusBadge completed={task.completed} doneLabel="Done" />
            </div>
            <div className="shrink-0">
              <MarkDoneButton done={task.completed} onToggle={() => toggleDone(task)} />
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-6">
            <TaskDetails task={task} position={position} total={allTasks?.length} />
          </div>

          {allTasks && (
            <nav aria-label="Task navigation" className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-800 pt-5">
              <div className="min-w-0">{previous && <TaskNavLink task={previous} direction="previous" />}</div>
              <div className="min-w-0">{next && <TaskNavLink task={next} direction="next" />}</div>
            </nav>
          )}
        </article>
      )}
    </>
  )
}
