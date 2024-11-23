import { useQuery } from '@tanstack/react-query'
import { TService } from '@/schemas/index'

const fetchService = async (): Promise<TService[]> => {
  const response = await fetch(`/api/service`)
  const data = await response.json()

  return data.serviceList
}

const useService = () => {
  return useQuery({
    queryKey: ['service'],
    queryFn: () => fetchService(),
  })
}

export { useService, fetchService }
