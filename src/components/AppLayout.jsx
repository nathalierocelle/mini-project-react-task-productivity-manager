import { useState } from 'react'
import { Outlet } from 'react-router'
import NavBar from './NavBar'

export default function AppLayout() {
  // { [taskId]: boolean } — local "mark done" ticks. Lives here because the Dashboard,
  // Tasks, Task detail and User pages all read it (their nearest common ancestor).
  const [doneOverrides, setDoneOverrides] = useState({})

  function toggleDone(task) {
    setDoneOverrides((previous) => ({ ...previous, [task.id]: !task.completed }))
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <NavBar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <Outlet context={{ doneOverrides, toggleDone }} />
      </main>
      <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        Data from{' '}
        <a
          href="https://dummyjson.com/docs/todos"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-slate-200"
        >
          DummyJSON
        </a>
      </footer>
    </div>
  )
}
