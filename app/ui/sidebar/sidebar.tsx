'use client'

import * as lucid from 'react-icons/lu'
import { usePathname } from 'next/navigation'

import SidebarMenu from '@/app/ui/sidebar/sidebar-menu'
import SideBarItem from '@/app/ui/sidebar/item/sidebar-item'

const iconMapping: { [key: string]: JSX.Element } = {
  Gauge: <lucid.LuGauge />,
  Ticket: <lucid.LuFileSpreadsheet />,
  Settings: <lucid.LuSettings />,
}

const menuItems = [
  {
    id: '1',
    html_code: '1',
    name: 'Dashboard',
    description: 'Dashboard',
    icon_name: 'Gauge',
    path: '/dashboard',
    created_at: '2022-02-22T00:00:00.000Z',
  },
  {
    id: '2',
    html_code: '2',
    name: 'Tickets',
    description: 'Tickets',
    icon_name: 'Ticket',
    path: '/tickets',
    created_at: '2022-02-22T00:00:00.000Z',
  },
  {
    id: '3',
    html_code: '3',
    name: 'Settings',
    description: 'Settings',
    icon_name: 'Settings',
    path: '/settings',
    created_at: '2022-02-22T00:00:00.000Z',
  },
]

export default function Index() {
  const pathname = usePathname()
  const isActive = (currentPath: string) => currentPath === pathname

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SideBarItem
          key={item.id}
          icon={iconMapping[item.icon_name]}
          text={item.name}
          active={isActive(item.path)}
        />
      ))}
    </SidebarMenu>
  )
}
