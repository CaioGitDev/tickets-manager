import { useQuery } from '@tanstack/react-query'
import { TRole } from '@/schemas/index'

const fetchRole = async (): Promise<TRole[]> => {
  const response = await fetch(`/api/role`)
  const data = await response.json()

  return data.RoleList
}

const useRole = () => {
  return useQuery({
    queryKey: ['role'],
    queryFn: () => fetchRole(),
  })
}

export { useRole, fetchRole }
