'use client'
import { createManager, CustomerManagerState } from "@/app/lib/actions"
import { useActionState } from "react"
import PhoneNumberInput from "./PhoneNumberInput"
import LitButton from "./LitButton"
import { Triangle } from "react-loader-spinner"

const ManagerRegisterForm = () => {
  const initialState: CustomerManagerState = {
    errors: {},
    message: null,
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNum: ''
    }
  }
  const [state, formAction, pending] = useActionState(createManager, initialState);

  return (
    <div className="flex flex-col gap-4 min-w-[50%]">
    <h4 className="h4 border-b pb-1">Start your journey</h4>
    <p className="text-n-5">Create a manager account.</p>
    <form action={formAction}>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName">First name</label>
            <input type="text" id="firstName" name="firstName" placeholder="John" className={`bg-white border p-1 rounded-md outline-none focus:outline-indigo-900 ${state?.errors?.firstName && 'border-red-500'}`} aria-describedby="firstName-error" defaultValue={state?.values?.firstName} />
            <div id="firstName-error" aria-live="polite" aria-atomic='true'>
              { state?.errors?.firstName &&
                  state?.errors.firstName.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>{error}</p>
                  )) }
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName">Last name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Doe" className={`bg-white border p-1 rounded-md outline-none focus:outline-indigo-900 ${state?.errors?.lastName && 'border-red-500'}`} aria-describedby="lastName-error" defaultValue={state?.values?.lastName} />
            <div id="lastName-error" aria-live="polite" aria-atomic='true'>
              { state?.errors?.lastName &&
                  state?.errors.lastName.map((error: string) => (
                    <p className="text-sm text-red-500" key={error}>{error}</p>
                  )) }
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="johnDoe@email.com" className={`bg-white border p-1 rounded-md outline-none focus:outline-indigo-900 ${state?.errors?.email && 'border-red-500'}`} aria-describedby="email-error" defaultValue={state?.values?.email} />
          <div id="email-error" aria-live="polite" aria-atomic='true'>
            { state?.errors?.email &&
                state?.errors.email.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>{error}</p>
                )) }
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="********" className={`bg-white border p-1 rounded-md outline-none focus:outline-indigo-900 ${state?.errors?.password && 'border-red-500'}`} aria-describedby="password-error" defaultValue={state?.values?.password} />
          <div id="password-error" aria-live="polite" aria-atomic='true'>
            { state?.errors?.password &&
                state?.errors.password.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>{error}</p>
                )) }
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="phoneNum">Phone number</label>
          <PhoneNumberInput id="phoneNum" name='phoneNum' className={`relative h-[100%] ${state?.errors?.phoneNum && 'border-red-500'}`} />
          <div id="phoneNum-error" aria-live="polite" aria-atomic='true'>
            { state?.errors?.phoneNum &&
                state?.errors.phoneNum.map((error: string) => (
                  <p className="text-sm text-red-500" key={error}>{error}</p>
                )) }
          </div>
        </div>
        <LitButton className="self-center" type="submit" disabled={pending}>
          <span>Register</span> 
          {pending ? <Triangle color="white" height="20" width="20" /> : null}
        </LitButton>
      </div>
    </form>
  </div>
  )
}

export default ManagerRegisterForm