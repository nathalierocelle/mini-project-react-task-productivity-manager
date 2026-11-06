import { useUserTodos } from '../hooks/useTaskQueries'
import { useDoneOverrides } from '../hooks/useDoneOverrides'
import { applyDoneOverrides, getTaskStats } from '../utils/tasks'
import ProgressBar from './ProgressBar'
import TaskList from './TaskList'
import LoadingState from './LoadingState'
import ErrorState from './ErrorState'
import EmptyState from './EmptyState'

export default function UserTasks({ userId, firstName }) {
  const { data: fetchedTasks, isPending, isError, error, refetch } = useUserTodos(userId)
  const { doneOverrides, toggleDone } = useDoneOverrides()

  if (isPending) return <LoadingState label="Loading tasks…" rows={3} />
  if (isError) return <ErrorState error={error} onRetry={refetch} />
  if (fetchedTasks.length === 0) {
    return <EmptyState title="No tasks assigned" message={`${firstName} has nothing on their list right now.`} />
  }

  const tasks = applyDoneOverrides(fetchedTasks, doneOverrides)
  const { completionRate } = getTaskStats(tasks)

  return (
    <>
      <div className="mb-4 rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm">
        <ProgressBar percent={completionRate} label={`${tasks.length} tasks assigned`} />
      </div>
      <TaskList tasks={tasks} onToggleDone={toggleDone} />
    </>
  )
}
