import TaskCard from './TaskCard'

// Pass `userNames` to show an assignee chip on each card (omit it on a single user's page).
export default function TaskList({ tasks, userNames, onToggleDone }) {
  const showAssignee = userNames !== undefined

  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            task={task}
            showAssignee={showAssignee}
            assigneeName={userNames?.[task.userId]}
            onToggleDone={onToggleDone}
          />
        </li>
      ))}
    </ul>
  )
}
