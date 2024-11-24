import { useQuery } from '@tanstack/react-query'
import { TDashboardTicketTriage } from '@/schemas/index'

const fetchDashboardTicketTriage = async (): Promise<
  TDashboardTicketTriage[]
> => {
  const response = await fetch(`/api/dashboard/ticket/triage`)
  const data = await response.json()

  return data.data
}

const useDashboardTicketTriage = () => {
  return useQuery({
    queryKey: ['dashboardTicketTriage'],
    queryFn: fetchDashboardTicketTriage,
  })
}

export { useDashboardTicketTriage, fetchDashboardTicketTriage }
