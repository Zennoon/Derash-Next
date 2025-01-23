'use client';
import { usePathname } from 'next/navigation'
import { managerSidebarItems } from '@/app/lib/constants'
import Link from 'next/link'
import React from 'react'

const ManagerSidebar = () => {
  const pathname = usePathname();
  return (
    <nav className='lg:fixed w-full lg:w-[70px] h-[20] lg:h-[100%] bg-transparent/10 dark:bg-transparent/30 lg:border-t border-gray-300 dark:border-gray-900 shadow-lg p-2'>
      <ul className='w-full flex lg:flex-col justify-stretch gap-1 lg:gap-3'>
        { managerSidebarItems.map((item, index) => (
          <li key={index} className='w-full flex items-center justify-center'>
            <Link title={ item.label } href={item.href} className={`w-full flex py-3 justify-center gap-2 ${item.href === pathname ? 'bg-indigo-500 text-gray-200 dark:bg-rose-700 dark:text-white hover:bg-indigo-500 dark:hover:bg-rose-700' : 'hover:bg-transparent/10 dark:hover:bg-rose-950/55 text-gray-700 dark:text-gray-400'} rounded-sm transition-colors font-light` }>
              <item.icon width={25} height={25}/>
              <span className='hidden sm:inline lg:hidden'>{item.label}</span>
            </Link>
          </li>
        )) }
      </ul>
    </nav>
  )
}

export default ManagerSidebar