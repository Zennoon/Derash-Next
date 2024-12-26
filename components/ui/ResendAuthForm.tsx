'use client'

import { useState } from 'react';
import LitButton from './LitButton';
import { useRouter } from 'next/navigation';
import { redirect } from 'next/navigation';

const ResendAuthForm = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const handleClick = async () => {
    // redirect(`/authenticate?email=${email}`);
    router.replace(`/authenticate?email=${email}`);
    // useRouter().push(`/authenticate?email=${email}`);
  }

  return (
    <form className='flex flex-col gap-2 items-stretch'>
      <input type="email" id="email" name="email" placeholder='johnDoe@email.com' className='p-2 rounded-sm ring-0 focus:outline-none focus:outline-1 focus:outline-n-3' onChange={(e) => setEmail(e.target.value)}  />
      <LitButton className='p-1' onClick={handleClick}>
        Resend authentication email
      </LitButton>
    </form>
  )
}

export default ResendAuthForm