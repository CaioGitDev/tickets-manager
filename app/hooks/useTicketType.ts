import { TTicketType } from '@/schemas'
import { useQuery } from '@tanstack/react-query'

const fetchTicketType = async (): Promise<TTicketType[]> => {
  const response = await fetch(`/api/ticket/type`)
  const data = await response.json()

  return data.data
}

const useTicketType = () => {
  return useQuery({
    queryKey: ['ticket-type'],
    queryFn: () => fetchTicketType(),
  })
}

export { useTicketType, fetchTicketType }
