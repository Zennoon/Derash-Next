'use client';
import { sendAuthEmail } from '@/app/lib/actions';

type SendAuthEmailButtonProps = {
  email: string
}

const SendAuthEmailButton = ({email}: SendAuthEmailButtonProps) => {
  return (
    <button onClick={async () => await sendAuthEmail(email)}>Send Authentication Email</button>
  )
}

export default SendAuthEmailButton