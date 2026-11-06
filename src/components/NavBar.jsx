import { Link, NavLink } from 'react-router'

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/tasks', label: 'Tasks', end: false },
  { to: '/users', label: 'Users', end: false },
]

function navLinkClass({ isActive }) {
  const base = 'rounded-md px-2 py-2 text-sm font-medium transition-colors sm:px-3'
  return isActive
    ? `${base} bg-pink-500/15 text-pink-300`
    : `${base} text-slate-400 hover:bg-slate-800 hover:text-white`
}

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2 text-base font-bold text-slate-100 sm:text-lg">
          <span className="grid size-7 place-items-center rounded-lg bg-pink-600 text-sm text-white">
            ✓
          </span>
          <span className="max-[359px]:sr-only">TaskFlow</span>
        </Link>
        <ul className="flex gap-0.5 sm:gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
