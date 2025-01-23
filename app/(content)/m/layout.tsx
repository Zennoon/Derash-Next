import ManagerSidebar from '@/components/ui/ManagerSidebar'
import React from 'react'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='w-full'>
      <div className='absolute top-[12%] left-0 w-full h-[88%] flex flex-col lg:flex-row'>
        <ManagerSidebar />
        <div className='absolute top-20 lg:top-0 lg:left-[70px] w-full lg:w-[calc(100%-70px)]'>
         { children }  
        </div>
      </div>
    </div>
  )
}

export default Layout