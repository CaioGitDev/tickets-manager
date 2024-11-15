import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { searchParamsCache } from '@/lib/search-params'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import UserTable from '@/app/dashboard/user/_components/user-table'

type TUserListingPage = {}

// https://github.com/Kiranism/next-shadcn-dashboard-starter/blob/main/app/dashboard/employee/_components/employee-listing-page.tsx
