'use client'

import { useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { BackgroundBeamsWithCollision } from './background-beams-with-collision'
import LitButton from './LitButton'
import Google from '../icons/Google'
import Discord from '../icons/Discord'
import Github from '../icons/Github'
import { signIn } from 'next-auth/react'
import StyledLogo from './StyledLogo'
import Link from 'next/link'
import { Triangle } from 'react-loader-spinner'
import { set } from 'zod'

const LoginForm = () => {
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    setPending(true);
    e.preventDefault();

    try {
      const response = await signIn('credentials', {
        ...values,
        redirect: false,
      });
      console.log(response);

      if (!response?.ok) {
        if (response?.error === 'Email') {
          setErrors((prevErrors) => {
            return {
              password: '',
              email: 'This email is not registered'
            }
          });
        } else if (response?.error === 'Password') {
          setErrors((prevErrors) => {
            return {
              email: '',
              password: 'Password is incorrect'
            }
          });
        } else if (response?.error === 'Invalid') {
          setErrors((prevErrors) => {
            return {
              ...prevErrors,
              email: 'The provided credentials are invalid',
              password: 'The provided credentials are invalid'
            }
          });
        }
      } else {
        router.replace('/redirect');
      }
    } catch (error) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          email: 'An error occurred. Please try again later',
          password: 'An error occurred. Please try again later'
        }
      });
    }
    setPending(false);
  }

  return (
    <div className='w-full min-h-screen'>
      <BackgroundBeamsWithCollision>
        <div className='min-w-[25%] flex flex-col gap-4 px-8 py-4 md:py-6 backdrop-blur-sm border border-gray-300 dark:border-n-2/50 rounded-lg'>
          <h3 className='h5 md:h4 font-light'>Welcome back to{' '}
            <Link href='/'><StyledLogo /></Link>!</h3>
          <p className='font-light'>Login to your account</p>
          <div className='flex flex-col gap-2'>
            <form className='flex flex-col gap-4 items-stretch w-full' onSubmit={handleSubmit} >
              <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" className={`bg-white transition-all dark:bg-transparent border dark:border-gray-700 dark:text-gray-200 p-1 rounded-md outline-none focus:outline-indigo-900 dark:focus:outline-rose-400 ${errors?.email && 'border-red-500 dark:border-red-400'}`} aria-describedby="email-error" onChange={(e) => {
                    setValues((prevValues) => {
                      return {
                        ...prevValues,
                        email: e.target.value
                      }
                    });
                    if (errors.email) {
                      setErrors((prevErrors) => {
                        return {
                          ...prevErrors,
                          email: ''
                        }
                      });
                    }
                  }} />
                  <div id="email-error" aria-live="polite" aria-atomic='true'>
                    { errors?.email && (
                      <p className="text-sm text-red-500 dark:text-red-300 transition-all">{errors.email}</p>
                    )}
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" className={`bg-white transition-all dark:bg-transparent border dark:border-gray-700 dark:text-gray-200 p-1 rounded-md outline-none focus:outline-indigo-900 dark:focus:outline-rose-400 ${errors?.password && 'border-red-500 dark:border-red-400'}`} aria-describedby="password-error" onChange={(e) => {
                    setValues((prevValues) => {
                      return {
                        ...prevValues,
                        password: e.target.value
                      }
                    });
                    if (errors.password) {
                      setErrors((prevErrors) => {
                        return {
                          ...prevErrors,
                          password: ''
                        }
                      });
                    }
                  }} />
                  <div id="password-error" aria-live="polite" aria-atomic='true'>
                    { errors?.password && (
                      <p className="text-sm text-red-500 dark:text-red-300">{errors.password}</p>
                    )}
                  </div>
                </div>
              </div>
              <LitButton className='self-center' type="submit" disabled={pending}>{pending && <Triangle color="white" height="20" width="20" />} Login</LitButton>
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