import { Link } from 'react-router'
import { useTodos, useUserNames } from '../hooks/useTaskQueries'
import { useDoneOverrides } from '../hooks/useDoneOverrides'
import { applyDoneOverrides, getTaskStats } from '../utils/tasks'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import TaskList from '../components/TaskList'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

const UP_NEXT_COUNT = 8

export default function DashboardPage() {
  const { data: fetchedTasks, isPending, isError, error, refetch } = useTodos()
  const { data: userNames } = useUserNames()
  const { doneOverrides, toggleDone } = useDoneOverrides()

  if (isPending) return <LoadingState label="Loading your dashboard…" />
  if (isError) return <ErrorState error={error} onRetry={refetch} />
  if (fetchedTasks.length === 0) {
    return <EmptyState title="No tasks yet" message="Once tasks are added, your stats will show up here." />
  }

  const tasks = applyDoneOverrides(fetchedTasks, doneOverrides)
  const stats = getTaskStats(tasks)
  const upNext = tasks.filter((task) => !task.completed).slice(0, UP_NEXT_COUNT)

  return (
    <>
      <PageHeader title="Dashboard" subtitle="An overview of everything on your plate." />

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total tasks" value={stats.total} />
        <StatCard label="Completed" value={stats.completed} accent="emerald" />
        <StatCard label="Pending" value={stats.pending} accent="amber" />
        <StatCard label="Done rate" value={`${stats.completionRate}%`} accent="pink" />
      </section>

      <section className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm sm:p-5">
        <ProgressBar percent={stats.completionRate} label="Overall progress" />
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Up next</h2>
          <Link to="/tasks" className="text-sm font-medium text-pink-400 hover:text-pink-300">
            View all →
          </Link>
        </div>
        {upNext.length === 0 ? (
          <EmptyState title="All caught up!" message="Every task is completed. 🎉" />
        ) : (
          <TaskList tasks={upNext} userNames={userNames ?? {}} onToggleDone={toggleDone} />
        )}
      </section>
    </>
  )
}
