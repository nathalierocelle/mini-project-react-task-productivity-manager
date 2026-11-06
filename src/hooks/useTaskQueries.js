import { useQuery } from '@tanstack/react-query'
import { fetchTodo, fetchTodos, fetchUser, fetchUserTodos, fetchUsers } from '../api/dummyjson'
import { toUserNameMap } from '../utils/users'

// Route params are strings and API ids are numbers; String() keeps one cache entry per item.
const taskKeys = {
  all: ['todos'],
  detail: (id) => ['todos', String(id)],
  byUser: (userId) => ['todos', 'user', String(userId)],
}

const userKeys = {
  all: ['users'],
  detail: (id) => ['users', String(id)],
}

export function useTodos() {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: fetchTodos,
  })
}

export function useTodo(id) {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => fetchTodo(id),
  })
}

export function useUser(id) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => fetchUser(id),
  })
}

export function useUserTodos(userId) {
  return useQuery({
    queryKey: taskKeys.byUser(userId),
    queryFn: () => fetchUserTodos(userId),
  })
}

export function useUsers() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: fetchUsers,
  })
}

// Shares the ['users'] cache with useUsers(); `select` reshapes it into { id: name }.
export function useUserNames() {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: fetchUsers,
    select: toUserNameMap,
  })
}
