'use client'

import { searchParams } from '@/lib/search-params'
import { useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'

export const ROLE_OPTIONS = [
  { value: 'USER', label: 'Utilizador' },
  { value: 'SERVICE_MANAGER', label: 'Gestor de Area' },
  { value: 'TECHNICAL', label: 'Técnico' },
  { value: 'ADMINISTRATOR', label: 'Administrador' },
]

export function useUserTableFilters() {
  const [searchQuery, setSearchQuery] = useQueryState(
    'q',
    searchParams.q
      .withOptions({ shallow: false, throttleMs: 1000 })
      .withDefault(''),
  )

  const [roleFilter, setRoleFilter] = useQueryState(
    'gender',
    searchParams.gender.withOptions({ shallow: false }).withDefault(''),
  )

  const [page, setPage] = useQueryState(
    'page',
    searchParams.page.withDefault(1),
  )

  const resetFilters = useCallback(() => {
    setSearchQuery(null)
    setRoleFilter(null)

    setPage(1)
  }, [setSearchQuery, setRoleFilter, setPage])

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!roleFilter
  }, [searchQuery, roleFilter])

  return {
    searchQuery,
    setSearchQuery,
    roleFilter,
    setRoleFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
  }
}
