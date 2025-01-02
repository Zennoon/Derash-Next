'use client'

import React from 'react'
import { BackgroundBeamsWithCollision } from './background-beams-with-collision'
import LitButton from './LitButton'
import Google from '../icons/Google'
import Discord from '../icons/Discord'
import Github from '../icons/Github'
import { signIn } from 'next-auth/react'
import StyledLogo from './StyledLogo'
import Link from 'next/link'

const LoginForm = () => {
  return (
    <div className='w-full min-h-screen'>
      <BackgroundBeamsWithCollision>
        <div className='min-w-[25%] flex flex-col gap-4 px-8 py-4 md:py-6 backdrop-blur-sm border border-gray-300 dark:border-n-2/50 rounded-lg'>
          <h3 className='h5 md:h4 font-light'>Welcome back to{' '}
            <Link href='/'><StyledLogo /></Link>!</h3>
          <p className='font-light'>Login to your account</p>
          <div className='flex flex-col gap-2'>
            <form className='flex flex-col gap-4 items-stretch w-full'>
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" className='bg-white transition-all dark:bg-transparent border dark:border-gray-700 dark:text-gray-200 p-1 rounded-md outline-none focus:outline-indigo-900 dark:focus:outline-rose-400' />
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" className='bg-white transition-all dark:bg-transparent border dark:border-gray-700 dark:text-gray-200 p-1 rounded-md outline-none focus:outline-indigo-900 dark:focus:outline-rose-400' />
                </div>
              </div>
              <LitButton className='self-center' type="submit">Login</LitButton>
            </form>
            <div className='flex items-center my-4'>
              <hr className='w-full border-gray-400 dark:border-n-2/50' />
              <p className='mx-4 font-extralight'>or</p>
              <hr className='w-full border-gray-400 dark:border-n-2/50' />
            </div>
            <div className='flex flex-col gap-3'>
              <LitButton className='self-center flex justify-center gap-2' onClick={async () => {
                signIn('google', { callbackUrl: '/redirect' })
              }}><Google /> Sign in with Google</LitButton>
              <LitButton className='self-center flex justofy-center gap-2' onClick={async () => {
                signIn('discord', { callbackUrl: '/redirect' })
              }}><Discord /> Sign in with Discord</LitButton>
              <LitButton className='self-center flex justofy-center gap-2' onClick={async () => {
                signIn('github', { callbackUrl: '/redirect' })
              }}><Github /> Sign in with Github</LitButton>              
            </div>
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  )
}

export default LoginForm