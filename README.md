# TaskFlow

TaskFlow is a responsive task and productivity manager that pulls todo data from the DummyJSON public API. You can see your overall progress at a glance, search and filter every task by status or assignee, tick tasks off, open any task's details, and view all tasks assigned to a specific person.

## Features

### Routes

| Route | Page | What it shows |
| --- | --- | --- |
| `/` | Dashboard | Task totals, completed vs. pending counts, overall progress bar, and the next pending tasks |
| `/tasks` | Tasks | Every task with its assignee, a filter bar (search, All / Pending / Completed, user dropdown), a "Showing X of Y" count, tick-to-complete checkboxes and pagination |
| `/tasks/:id` | Task detail (**dynamic**) | Reads `id` with `useParams`, fetches that task, and shows its status, assignee, a **Mark as done** button and previous/next navigation |
| `/users` | Users | Everyone who has tasks, sorted by workload, with name search and pagination |
| `/users/:id` | User (**dynamic**) | The assignee's profile, completion rate, and every task assigned to them |
| `*` | Not found | A friendly 404 page for unknown URLs |

### Public API

[DummyJSON](https://dummyjson.com/docs/todos) — no API key required.

| Endpoint | Used by |
| --- | --- |
| `GET /todos?limit=0` | Dashboard, Tasks |
| `GET /todos/:id` | Task detail |
| `GET /users?limit=0` | Users page, assignee names on task cards and the user filter |
| `GET /users/:id` | Task detail (assignee), User page |
| `GET /todos/user/:id` | User page |

### TanStack Query

All server data is fetched and cached by TanStack Query through custom hooks in `src/hooks/useTaskQueries.js`. Server data is **never copied into `useState`**.

| Hook | Query key |
| --- | --- |
| `useTodos()` | `['todos']` |
| `useTodo(id)` | `['todos', id]` |
| `useUserTodos(userId)` | `['todos', 'user', userId]` |
| `useUsers()` | `['users']` |
| `useUserNames()` | `['users']` + `select` → `{ id: name }` (shares the same cache entry) |
| `useUser(id)` | `['users', id]` |

- The Dashboard, Tasks and Users pages share the `['todos']` key, so tasks are fetched once and reused from the cache (the Users page derives each person's task count from it).
- Ids in query keys are normalised with `String()`, because route params are strings while API ids are numbers.
- `staleTime` is 60 seconds. Failed requests retry once, except 404s, which are never retried.

### State ownership (`useState`)

| State | Owner | Why there |
| --- | --- | --- |
| `doneOverrides` (local "mark done" ticks) | `AppLayout` | Read by the Dashboard, Tasks, Task detail and User pages, so it lives in their nearest common ancestor and is shared via `<Outlet context>` (read with `useDoneOverrides()`), avoiding prop drilling |
| `filters` (search, status, user) and `page` | `TasksPage` | Only the Tasks page uses them; `FilterBar` is presentational and reports changes through `onChange` |
| `search` and `page` | `UsersPage` | Only the Users page uses them |

The DummyJSON API is read-only, so ticks are kept in memory as an overlay (`applyDoneOverrides`) on top of the fetched tasks. Completion counts, progress and filters all update instantly, and the ticks reset on a full page reload. Everything else (filtered lists, counts, stats) is derived during render rather than stored.

### Loading, error and empty states

Every query renders its UI from TanStack Query's `isPending` / `isError` / `data`. There are no hand-rolled loading flags.

| State | How to see it |
| --- | --- |
| **Loading** | Load any page (in DevTools → Network, set throttling to *Slow 4G* to see it clearly). Shows a spinner with skeleton cards. |
| **Error** | Visit [`/tasks/99999`](http://localhost:5173/tasks/99999), where the API returns a 404 and the "Not found" error card appears. Alternatively, set DevTools → Network to *Offline* and reload any page to get the error card with a **Try again** button (which calls `refetch`). |
| **Empty** | On `/tasks`, search for `zzzz`. A "No tasks found" card appears with a **Clear filters** action (on `/users`, the same search gives "No users found"). |

## Screenshots

| Dashboard (`/`) | Tasks (`/tasks`) |
| --- | --- |
| ![Dashboard](docs/screenshots/dashboard.png) | ![Tasks list](docs/screenshots/tasks.png) |

| Task detail (`/tasks/:id`) | Users (`/users`) |
| --- | --- |
| ![Task detail](docs/screenshots/task-detail.png) | ![Users list](docs/screenshots/users.png) |

| User (`/users/:id`) | |
| --- | --- |
| ![User page](docs/screenshots/user.png) | |

| Mobile view | Error / empty states |
| --- | --- |
| ![Mobile](docs/screenshots/mobile.png) | ![Empty state](docs/screenshots/empty-state.png) |

## Setup

Requires Node.js 20.19+ (or 22.12+).

```bash
git clone <your-repo-url>
cd <your-repo>
npm install
npm run dev
```

Then open http://localhost:5173.

Other scripts:

```bash
npm run lint     # ESLint
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Project structure

```
src/
├── api/dummyjson.js          # fetch helpers + ApiError (carries HTTP status)
├── hooks/useTaskQueries.js   # useQuery hooks + query keys
├── utils/tasks.js            # pure helpers: filterTasks, getTaskStats
├── components/               # reusable UI (TaskCard, TaskList, FilterTabs, LoadingState, ...)
├── pages/                    # one component per route
├── router.jsx                # route definitions
└── main.jsx                  # QueryClient + RouterProvider
```

## Tech stack

React, React Router, TanStack Query, Tailwind CSS, Vite.

## Deployed App

