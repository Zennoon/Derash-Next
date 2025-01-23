import React from 'react'
import LoginForm from '@/components/ui/LoginForm'
import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const session = await getServerSession(options);

  if (session) { 
    redirect('/redirect');
  }
  return (
    <LoginForm />
  )
}

export default LoginPage