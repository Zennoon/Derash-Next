import AnimatedRestaurant from '@/components/ui/AnimatedRestaurant'
import ManagerRegisterForm from '@/components/ui/ManagerRegisterForm'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ManagerRegisterPage = () => {
  return (
    <div className="h-[100%] min-h-full w-[100vw] bg-n-1 text-black flex">
      <div className={`min-h-screen h-[100%] lg:w-[50%] lg:p-4 p-10 flex flex-col items-center justify-between overflow-hidden`}>
        <div className="self-start flex gap-3 border-t border-b ml-5 pt-1 pb-1">
          <Image
            src='/derash-logo.png'
            alt='Derash logo'
            width='36'
            height='36'
          />
          <h5 className={`h5 text-n-5 antialiased`}>Derash</h5>
        </div>
        <ManagerRegisterForm />
        <p className="self-center">Already have an account? <Link href='/login' className="text-indigo-500 hover:text-purple-500 transition-colors duration-100 font-semibold">Sign in</Link></p>
      </div>
      <AnimatedRestaurant />
    </div>
  )
}

export default ManagerRegisterPage