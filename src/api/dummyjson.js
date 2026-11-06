const BASE_URL = 'https://dummyjson.com'

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path) {
  const response = await fetch(`${BASE_URL}${path}`)
  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message = data?.message ?? `Request failed with status ${response.status}`
    throw new ApiError(message, response.status)
  }

  return data
}

export async function fetchTodos() {
  const data = await request('/todos?limit=0')
  return data.todos
}

export function fetchTodo(id) {
  return request(`/todos/${id}`)
}

export function fetchUser(id) {
  return request(`/users/${id}?select=firstName,lastName,email,image,company`)
}

export async function fetchUserTodos(userId) {
  const data = await request(`/todos/user/${userId}`)
  return data.todos
}

export async function fetchUsers() {
  const data = await request('/users?limit=0&select=firstName,lastName,email,image,company')
  return data.users
}
