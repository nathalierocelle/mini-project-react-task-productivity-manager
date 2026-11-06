import { Link, useParams } from 'react-router'
import { useUser } from '../hooks/useTaskQueries'
import UserProfileCard from '../components/UserProfileCard'
import UserTasks from '../components/UserTasks'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'

export default function UserPage() {
  const { id } = useParams()
  const { data: user, isPending, isError, error, refetch } = useUser(id)

  if (isPending) return <LoadingState label="Loading profile…" rows={3} />
  if (isError) return <ErrorState error={error} onRetry={refetch} />

  return (
    <>
      <Link to="/users" className="mb-4 inline-block text-sm font-medium text-pink-400 hover:text-pink-300">
        ← Back to users
      </Link>
      <UserProfileCard user={user} />
      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Assigned tasks</h2>
        <UserTasks userId={id} firstName={user.firstName} />
      </section>
    </>
  )
}
