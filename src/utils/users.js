export function getFullName(user) {
  return `${user.firstName} ${user.lastName}`
}

export function filterUsers(users, search) {
  const query = search.trim().toLowerCase()
  if (query === '') return users
  return users.filter((user) => getFullName(user).toLowerCase().includes(query))
}

// Builds { [userId]: numberOfTasks } from the full task list.
export function countTasksByUser(tasks) {
  const counts = {}
  for (const task of tasks) {
    counts[task.userId] = (counts[task.userId] ?? 0) + 1
  }
  return counts
}

// Builds { [userId]: 'First Last' } — used as a TanStack Query `select`.
export function toUserNameMap(users) {
  return Object.fromEntries(users.map((user) => [user.id, getFullName(user)]))
}
