'use client'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from '@tanstack/react-table'
import { CellAction } from '@/app/dashboard/user/_components/user-table/cell-action'
import { VwUserGetAll } from '@/schemas'

export const columns: ColumnDef<VwUserGetAll>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'NAME',
  },
  {
    accessorKey: 'email',
    header: 'EMAIL',
  },
  {
    accessorKey: 'role',
    header: 'ROLE',
  },
  {
    accessorKey: 'service',
    header: 'SERVICE',
  },
  {
    accessorKey: 'active',
    header: 'ACTIVE',
  },
  {
    accessorKey: 'created_at',
    header: 'CREATED AT',
  },
  {
    accessorKey: 'updated_at',
    header: 'UPDATED AT',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
