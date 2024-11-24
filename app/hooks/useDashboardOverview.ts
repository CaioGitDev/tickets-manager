import { useQuery } from '@tanstack/react-query'
import { TDashboardOverview } from '@/schemas/index'

const fetchDashboardOverview = async (): Promise<TDashboardOverview[]> => {
  const response = await fetch(`/api/dashboard/overview`)
  const data = await response.json()

  return data.data
}

const useDashboardOverview = () => {
  return useQuery({
    queryKey: ['dashboardOverview'],
    queryFn: fetchDashboardOverview,
  })
}

export { useDashboardOverview, fetchDashboardOverview }
