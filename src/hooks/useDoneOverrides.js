import { useOutletContext } from 'react-router'

// Reads the "mark done" state that AppLayout shares with every page through <Outlet context>.
export function useDoneOverrides() {
  return useOutletContext()
}
