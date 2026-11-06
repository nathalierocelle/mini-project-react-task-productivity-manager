import { useState } from 'react'
import { useTodos, useUsers } from '../hooks/useTaskQueries'
import { countTasksByUser, filterUsers } from '../utils/users'
import PageHeader from '../components/PageHeader'
import SearchInput from '../components/SearchInput'
import UserList from '../components/UserList'
import Pagination from '../components/Pagination'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

const PAGE_SIZE = 12

export default function UsersPage() {
  const usersQuery = useUsers()
  // Same ['todos'] key as Dashboard/Tasks, so this is usually served from cache.
  const todosQuery = useTodos()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  function handleSearchChange(nextSearch) {
    setSearch(nextSearch)
    setPage(1)
  }

  const header = <PageHeader title="Users" subtitle="Everyone with tasks, busiest first." />

  if (usersQuery.isPending || todosQuery.isPending) {
    return (
      <>
        {header}
        <LoadingState label="Loading users…" />
      </>
    )
  }

  const failedQuery = usersQuery.isError ? usersQuery : todosQuery.isError ? todosQuery : null
  if (failedQuery) {
    return (
      <>
        {header}
        <ErrorState error={failedQuery.error} onRetry={failedQuery.refetch} />
      </>
    )
  }

  const taskCounts = countTasksByUser(todosQuery.data)
  const usersWithTasks = usersQuery.data
    .filter((user) => taskCounts[user.id])
    .sort((a, b) => taskCounts[b.id] - taskCounts[a.id])
  const visibleUsers = filterUsers(usersWithTasks, search)
  const totalPages = Math.max(1, Math.ceil(visibleUsers.length / PAGE_SIZE))
  const pageUsers = visibleUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <>
      {header}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-400">
          {visibleUsers.length} {visibleUsers.length === 1 ? 'user' : 'users'}
        </p>
        <div className="w-full sm:max-w-xs">
          <SearchInput value={search} onChange={handleSearchChange} label="Search users" />
        </div>
      </div>

      {visibleUsers.length === 0 ? (
        <EmptyState
          title="No users found"
          message="No one matches that name."
          actionLabel="Clear search"
          onAction={() => handleSearchChange('')}
        />
      ) : (
        <>
          <UserList users={pageUsers} taskCounts={taskCounts} />
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </>
  )
}
