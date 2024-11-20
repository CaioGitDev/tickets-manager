import { VwUserGetAll } from '@/schemas/index'
import { useQuery } from '@tanstack/react-query'

const fetchUsers = async (limit = 10): Promise<VwUserGetAll[]> => {
  const response = await fetch(`/api/user?limit=${limit}`)
  const data = await response.json()

  return data.users
}

const useUsers = (limit = 10) => {
  return useQuery({
    queryKey: ['users', limit],
    queryFn: () => fetchUsers(limit),
  })
}

export { useUsers, fetchUsers }
