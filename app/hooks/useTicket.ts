import { TVwTicketGetAll } from '@/schemas'
import { useQuery } from '@tanstack/react-query'

const fetchTickets = async (): Promise<TVwTicketGetAll[]> => {
  const response = await fetch(`/api/ticket`)
  const data = await response.json()

  return data.data
}

const useTickets = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: () => fetchTickets(),
  })
}

export { useTickets, fetchTickets }
