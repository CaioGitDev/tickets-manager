import { useQuery } from '@tanstack/react-query'
import { TLookup } from '@/schemas/index'

const fetchLookup = async (listName: string): Promise<TLookup[]> => {
  const response = await fetch(`/api/lookup?listName=${listName}`)
  const data = await response.json()

  return data.lookups
}

const useLookup = (listName: string) => {
  return useQuery({
    queryKey: ['lookup', listName],
    queryFn: () => fetchLookup(listName),
  })
}

export { useLookup, fetchLookup }
