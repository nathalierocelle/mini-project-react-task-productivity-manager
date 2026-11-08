import { Link } from 'react-router'
import StatusBadge from './StatusBadge'
import DoneCheckbox from './DoneCheckbox'
import AssigneeChip from './AssigneeChip'

export default function TaskCard({ task, showAssignee, assigneeName, onToggleDone }) {
  return (
    <article className="flex h-full min-h-28 gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4 shadow-sm transition hover:border-pink-500/60">
      <DoneCheckbox
        checked={task.completed}
        label={`Mark task ${task.id} as ${task.completed ? 'not done' : 'done'}`}
        onChange={() => onToggleDone(task)}
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <Link
          to={`/tasks/${task.id}`}
          title={task.todo}
          className={`line-clamp-2 text-sm leading-relaxed wrap-break-word hover:text-pink-300 ${
            task.completed ? 'text-slate-500 line-through' : 'text-slate-200'
          }`}
        >
          {task.todo}
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex min-w-0 items-center gap-2">
            <span>#{task.id}</span>
            {showAssignee && <AssigneeChip userId={task.userId} name={assigneeName} />}
          </div>
          <StatusBadge completed={task.completed} />
        </div>
      </div>
    </article>
  )
}
