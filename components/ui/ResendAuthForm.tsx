'use client'

import { useState } from 'react';
import LitButton from './LitButton';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

const ResendAuthForm = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const handleClick = async () => {
    router.replace(`/authenticate?email=${email}`);
  }

  return (
    <form className='flex flex-col gap-2 items-stretch'>
      <input type="email" id="email" name="email" placeholder='johnDoe@email.com' className='bg-white transition-all p-2 dark:bg-transparent border dark:border-gray-700 dark:text-gray-200 p-1 rounded-md outline-none focus:outline-indigo-900 dark:focus:outline-rose-400' onChange={(e) => setEmail(e.target.value)}  />
      <LitButton className='p-1' onClick={handleClick}>
        Resend authentication email
      </LitButton>
    </form>
  )
}

export default ResendAuthForm