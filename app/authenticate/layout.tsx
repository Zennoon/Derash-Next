import React from 'react'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <BackgroundBeamsWithCollision className='flex flex-col items-center justify-center h-screen'>
      {children}
    </BackgroundBeamsWithCollision>
  )
}

export default Layout