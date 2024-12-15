'use client'
import { createCustomer, CustomerState } from "@/app/lib/actions"
import { useActionState } from "react"

const CustomerRegisterForm = () => {
  const initialState: CustomerState = {
    errors: {},
    message: null,
  }

  const [state, formAction, pending] = useActionState(createCustomer, initialState);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-3">
        <input type="text" name="firstName" placeholder="First name" />
        <input type="text" name="lastName" placeholder="Last name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="text" name="phoneNum" placeholder="Phone number" />
        <button type="submit">Register</button>
      </div>
    </form>
  )
}

export default CustomerRegisterForm