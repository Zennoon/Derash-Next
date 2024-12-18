import { validateAuthToken } from '@/app/utils';
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
        <div>You have been authenticated</div>
      )
    }
  }
  return (
    <div>ValidateTokenPage</div>
  )
}

export default ValidateAuthTokenPage