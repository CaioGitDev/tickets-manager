import { TTicketCategory } from '@/schemas/index'
import { useQuery } from '@tanstack/react-query'

const fetchTicketCategory = async (): Promise<TTicketCategory[]> => {
  const response = await fetch(`/api/ticket/category`)
  const data = await response.json()

  return data.data
}

const useTicketCategory = () => {
  return useQuery({
    queryKey: ['ticket-category'],
    queryFn: () => fetchTicketCategory(),
  })
}

export { useTicketCategory, fetchTicketCategory }
