import SendAuthEmailButton from '@/components/ui/SendAuthEmailButton'
import React from 'react'

const AuthenticatePage = async (props: {
  params: { slug: string };
  searchParams?: { [key: string]: string | undefined };
}) => {
  const searchParams = await props.searchParams;
  const email = searchParams?.email || '';
  console.log(email)
  return (
    <div>
        <h2>Your account has not been authenticated</h2>
        
        <SendAuthEmailButton email={email}/>
    </div>
  )
}

export default AuthenticatePage