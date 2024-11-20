'use client'
import { useUsers } from '@/app/hooks/useUser'
import { Separator } from '@/components/ui/separator'
import { DataGrid } from 'devextreme-react/data-grid'

import '@/app/theme/dx.fluent.custom-theme.css'

export default function UsersPage() {
  const { data, isPending, isFetching } = useUsers(10)

  if (isPending) return <div>Loading...</div>
  if (isFetching) return <div>Fetching...</div>

  console.log(data)

  return (
    <div className="space-y-2">
      <h2 className="text-3xl font-bold tracking-tight text-white">Users</h2>
      <Separator />
    </div>
  )
}
