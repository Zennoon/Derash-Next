import SendAuthEmailButton from '@/components/ui/SendAuthEmailButton'
import React from 'react'
import prisma from '@/prisma/client';
import LitButton from '@/components/ui/LitButton';
import { LogIn } from 'lucide-react';

const AuthenticatePage = async (props: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) => {
  const searchParams = await props.searchParams;
  const email = searchParams?.email || '';
  const user = await prisma.user.findFirst({
    where: {
      email
    }
  });

  if (!user) {
    return (
      <div className='flex flex-col items-center gap-5 p-20 bg-transparent/5 rounded-lg backdrop-blur-sm border border-n-4'>
        <h2>The provided email is not associated with an account.</h2>
        <LitButton href='/register' className='p-1'>
          Create an account
        </LitButton>
      </div>
    )
  }
  if (user.verified) {
    return (
      <div className='flex flex-col items-center gap-5 p-20 bg-transparent/5 rounded-lg backdrop-blur-sm border border-n-4'>
        <h2>Your account has already been authenticated.</h2>
        <LitButton href='/login' className='p-1'>
          <LogIn size={24} />
          Log in
        </LitButton>
      </div>
    )
  }
  return (
    <div className='flex flex-col items-center gap-5 p-20 bg-transparent/5 rounded-lg backdrop-blur-sm border border-n-4'>
        <h2>Your account has not been authenticated</h2>
        
        <SendAuthEmailButton email={email} firstName={user.firstName}/>
    </div>
  )
}

export default AuthenticatePage