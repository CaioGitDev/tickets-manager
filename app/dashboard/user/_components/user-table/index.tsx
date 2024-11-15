'use client'

import { DataTable } from '@/components/ui/table/data-table'
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box'
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset-filter'
import { DataTableSearch } from '@/components/ui/table/data-table-search'
import { VwUserGetAll } from '@/schemas'
import {
  ROLE_OPTIONS,
  useUserTableFilters,
} from '@/app/dashboard/user/_components/user-table/use-user-table-filters'
import { columns } from '@/app/dashboard/user/_components/user-table/columns'

export default function UserTable({
  data,
  totalItems,
}: {
  data: VwUserGetAll[]
  totalItems: number
}) {
  const {
    roleFilter,
    setRoleFilter,
    isAnyFilterActive,
    resetFilters,
    searchQuery,
    setPage,
    setSearchQuery,
  } = useUserTableFilters()

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          searchKey="name"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setPage={setPage}
        />
        <DataTableFilterBox
          filterKey="gender"
          title="Gender"
          options={ROLE_OPTIONS}
          setFilterValue={setRoleFilter}
          filterValue={roleFilter}
        />
        <DataTableResetFilter
          isFilterActive={isAnyFilterActive}
          onReset={resetFilters}
        />
      </div>
      <DataTable columns={columns} data={data} totalItems={totalItems} />
    </div>
  )
}
