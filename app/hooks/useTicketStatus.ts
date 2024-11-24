import { TTicketStatus } from '@/schemas/index'
import { useQuery } from '@tanstack/react-query'

const fetchTicketStatus = async (): Promise<TTicketStatus[]> => {
  const response = await fetch(`/api/ticket/status`)
  const data = await response.json()

  return data.data
}

const useTicketStatus = () => {
  return useQuery({
    queryKey: ['ticket-status'],
    queryFn: fetchTicketStatus,
  })
}

export { useTicketStatus, fetchTicketStatus }
