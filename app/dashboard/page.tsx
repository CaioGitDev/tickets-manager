'use client'
import { useUsers } from '@/app/hooks/useUser'

export default function Dashboard() {
  const { data, isPending, isFetching } = useUsers(10)

  if (isPending) return <div>Loading...</div>
  if (isFetching) return <div>Fetching...</div>

  console.log(data)

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}
