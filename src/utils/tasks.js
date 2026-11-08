export const STATUS_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
]

export const ALL_USERS = 'all'

export const INITIAL_FILTERS = { search: '', status: 'all', userId: ALL_USERS }

// The API is read-only, so local "mark done" ticks are layered on top of the fetched tasks.
export function applyDoneOverrides(tasks, doneOverrides) {
  return tasks.map((task) =>
    task.id in doneOverrides ? { ...task, completed: doneOverrides[task.id] } : task,
  )
}

export function filterTasks(tasks, { search, status, userId }) {
  const query = search.trim().toLowerCase()

  return tasks.filter((task) => {
    const matchesStatus =
      status === 'all' ||
      (status === 'completed' && task.completed) ||
      (status === 'pending' && !task.completed)
    const matchesUser = userId === ALL_USERS || String(task.userId) === userId
    const matchesSearch = query === '' || task.todo.toLowerCase().includes(query)
    return matchesStatus && matchesUser && matchesSearch
  })
}

export function getTaskStats(tasks) {
  const total = tasks.length
  const completed = tasks.filter((task) => task.completed).length
  const pending = total - completed
  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)
  return { total, completed, pending, completionRate }
}

// Dropdown options: one per user who has tasks, sorted by name.
export function getAssigneeOptions(tasks, userNames = {}) {
  const userIds = [...new Set(tasks.map((task) => task.userId))]
  return userIds
    .map((id) => ({ value: String(id), label: userNames[id] ?? `User #${id}` }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

// Neighbours of a task in list order, plus its 1-based position (all undefined if not found).
export function getAdjacentTasks(tasks, id) {
  const index = tasks.findIndex((task) => task.id === id)
  if (index === -1) return {}
  return { previous: tasks[index - 1], next: tasks[index + 1], position: index + 1 }
}
