import UserCard from './UserCard'

export default function UserList({ users, taskCounts }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <li key={user.id}>
          <UserCard user={user} taskCount={taskCounts[user.id] ?? 0} />
        </li>
      ))}
    </ul>
  )
}
