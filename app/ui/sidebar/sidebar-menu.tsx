'use client'

import UserAvatar from '@/public/svg/user-avatar.svg'
import { FiMoreVertical } from 'react-icons/fi'
import { LuChevronFirst, LuChevronLast } from 'react-icons/lu'
import Image from 'next/image'
import { useState } from 'react'
import { SidebarContext } from '@/app/context/sidebar-context'

export default function SidebarMenu({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [expanded, setExpanded] = useState(false)

  return (
    <aside className="h-screen">
      <nav className={`h-full flex flex-col  border-r shadow-sm`}>
        <div className="p-4 pb-2 flex justify-between items-center">
          {expanded && (
            <span className={`font-semibold text-purple-500 text-lg w-52 ml-3`}>
              TICKET MANAGER
            </span>
          )}
          <button
            onClick={() => setExpanded((current) => !current)}
            className="p-1.5 rounded-lg bg-purple-950"
          >
            {expanded ? (
              <LuChevronFirst size={20} />
            ) : (
              <LuChevronLast size={20} />
            )}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t flex p-3">
          <Image
            src={UserAvatar}
            alt="user avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center 
            overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Caio Rosa</h4>
              <span className="text-xs text-gray-600">Desenvolvimento</span>
            </div>
            <FiMoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}
