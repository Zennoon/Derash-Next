'use client';
import { useRouter } from 'next/navigation';
import { sendAuthEmail } from '@/app/lib/actions';
import LitButton from './LitButton';
import { Mail } from 'lucide-react';

type SendAuthEmailButtonProps = {
  email: string;
  firstName: string;
}

const SendAuthEmailButton = ({email, firstName}: SendAuthEmailButtonProps) => {
  const router = useRouter();
  return (
    <LitButton onClick={async () => { 
      await sendAuthEmail(email, firstName);
      router.push('/authenticate/sent');
    }} className='flex gap-2'>
      <Mail size={24} />
      Send Authentication Email
    </LitButton>
  )
}

export default SendAuthEmailButton