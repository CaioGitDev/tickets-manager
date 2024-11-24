import { TTicketPriority } from '@/schemas/index'
import { useQuery } from '@tanstack/react-query'

const fetchTicketPriority = async (): Promise<TTicketPriority[]> => {
  const response = await fetch(`/api/ticket/priority`)
  const data = await response.json()

  return data.data
}

const useTicketPriority = () => {
  return useQuery({
    queryKey: ['ticket-priority'],
    queryFn: () => fetchTicketPriority(),
  })
}

export { useTicketPriority, fetchTicketPriority }
