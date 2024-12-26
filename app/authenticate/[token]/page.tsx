import { validateAuthToken } from '@/app/utils';
import LitButton from '@/components/ui/LitButton';
import ResendAuthForm from '@/components/ui/ResendAuthForm';
import { LogIn, Mail } from 'lucide-react';
import React from 'react'

const ValidateAuthTokenPage = async (props: {
  params: { token?: string };
  searchParams?: { [key: string]: string | undefined };
}) => {
  const params = await props.params;
  const { token } = params;

  if (token) {
    const result = await validateAuthToken(token);

    if (result) {
      return (
        <div className='flex flex-col items-center gap-5 p-20 bg-transparent/5 rounded-lg backdrop-blur-sm border border-n-4'>
          <h2>Your account has been successfully verified.</h2>
          <LitButton href='/login' className='p-1'>
            <LogIn size={24} />
            Log in
          </LitButton>
        </div>
      )
    }
  }
  return (
    <div className='flex flex-col items-center gap-5 p-20 bg-transparent/5 rounded-lg backdrop-blur-sm border border-n-4'>
      <h5 className='h5'>The token has expired, or is invalid.</h5>
      <p className='text-gray-400'>Enter your email to resend the authentication email.</p>
      <ResendAuthForm />
    </div>
  )
}

export default ValidateAuthTokenPage