import { useState } from 'react'
import { useTodos, useUserNames } from '../hooks/useTaskQueries'
import { useDoneOverrides } from '../hooks/useDoneOverrides'
import {
  INITIAL_FILTERS,
  applyDoneOverrides,
  filterTasks,
  getAssigneeOptions,
} from '../utils/tasks'
import PageHeader from '../components/PageHeader'
import FilterBar from '../components/FilterBar'
import TaskList from '../components/TaskList'
import Pagination from '../components/Pagination'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

const PAGE_SIZE = 12

export default function TasksPage() {
  // Server data lives in TanStack Query; only UI state lives here.
  const { data: fetchedTasks, isPending, isError, error, refetch } = useTodos()
  // Names are a nice-to-have: cards show "User #id" until (or if) they load.
  const { data: userNames } = useUserNames()
  const { doneOverrides, toggleDone } = useDoneOverrides()
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [page, setPage] = useState(1)

  function handleFiltersChange(patch) {
    setFilters((previous) => ({ ...previous, ...patch }))
    setPage(1)
  }

  function clearFilters() {
    setFilters(INITIAL_FILTERS)
    setPage(1)
  }

  const header = <PageHeader title="Tasks" subtitle="Browse, search, filter and tick off tasks." />

  if (isPending) {
    return (
      <>
        {header}
        <LoadingState label="Fetching tasks…" />
      </>
    )
  }

  if (isError) {
    return (
      <>
        {header}
        <ErrorState error={error} onRetry={refetch} />
      </>
    )
  }

  // Derived values: computed from server data + UI state, never stored in state.
  const tasks = applyDoneOverrides(fetchedTasks, doneOverrides)
  const matchesIgnoringStatus = filterTasks(tasks, { ...filters, status: 'all' })
  const counts = {
    all: matchesIgnoringStatus.length,
    pending: matchesIgnoringStatus.filter((task) => !task.completed).length,
    completed: matchesIgnoringStatus.filter((task) => task.completed).length,
  }
  const visibleTasks = filterTasks(tasks, filters)
  const totalPages = Math.max(1, Math.ceil(visibleTasks.length / PAGE_SIZE))
  const pageTasks = visibleTasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      {header}

      <FilterBar
        filters={filters}
        counts={counts}
        assigneeOptions={getAssigneeOptions(tasks, userNames)}
        onChange={handleFiltersChange}
      />

      <p className="mt-4 mb-3 text-sm text-slate-400">
        Showing {visibleTasks.length} of {tasks.length} tasks
      </p>

      {visibleTasks.length === 0 ? (
        <EmptyState
          title="No tasks match your filters"
          message="Try a different search, status or user."
          actionLabel="Clear filters"
          onAction={clearFilters}
        />
      ) : (
        <>
          <TaskList tasks={pageTasks} userNames={userNames ?? {}} onToggleDone={toggleDone} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </>
  )
}
