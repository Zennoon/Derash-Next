import { Button, Html } from '@react-email/components'
import React from 'react'

const AuthToken = (token: string) => {
  return (
    <Html>
      <Button
        href={`https://localhost:3000/authenticate/${token}`}
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Click me
      </Button>
    </Html>
  )
}

export default AuthToken