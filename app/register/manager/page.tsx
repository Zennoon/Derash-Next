import AnimatedRestaurant from '@/components/ui/AnimatedRestaurant'
import ManagerRegisterForm from '@/components/ui/ManagerRegisterForm'
import StyledLogo from '@/components/ui/StyledLogo'
import Link from 'next/link'
import React from 'react'

const ManagerRegisterPage = () => {
  return (
    <div className="h-[100%] min-h-full w-[100vw] text-black flex">
      <div className={`min-h-screen h-[100%] lg:w-[50%] lg:p-4 p-10 flex flex-col items-center justify-between overflow-hidden`}>
        <div className="self-start flex justify-between ml-5 pt-1 pb-1">
          <Link href='/'>
            <StyledLogo className="" />
          </Link>
        </div>
        <ManagerRegisterForm />
        <p className="self-center dark:text-gray-300">Already have an account? <Link href='/login' className="text-indigo-500 hover:text-purple-500 dark:text-rose-400 dark:hover:text-rose-300 transition-colors duration-100 font-semibold">Sign in</Link></p>
      </div>
      <AnimatedRestaurant />
    </div>
  )
}

export default ManagerRegisterPage