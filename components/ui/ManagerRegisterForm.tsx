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
    <h4 className="h4 border-b border-gray-400 pb-1 dark:text-gray-200 font-extralight">Start your journey</h4>
    <p className="text-n-5 dark:text-gray-400">Create a manager account.</p>
    <form action={formAction}>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between gap-5">
          <div className="flex flex-col gap-1">
            <label className="dark:text-gray-200" htmlFor="firstName">First name</label>
            <input type="text" id="firstName" name="firstName" placeholder="John" className={`bg-white transition-all dark:bg-transparent border dark:border-gray-700 dark:text-gray-200 p-1 rounded-md outline-none focus:outline-indigo-900 dark:focus:outline-rose-400 ${state?.errors?.firstName && 'border-red-500 dark:border-red-400'}`} aria-describedby="firstName-error" defaultValue={state?.values?.firstName} />
            <div id="firstName-error" aria-live="polite" aria-atomic='true'>
              { state?.errors?.firstName &&
                  state?.errors.firstName.map((error: string) => (
                    <p className="text-sm text-red-500 dark:text-red-300" key={error}>{error}</p>
                  )) }
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="dark:text-gray-200" htmlFor="lastName">Last name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Doe" className={`bg-white transition-all dark:bg-transparent border dark:border-gray-700 dark:text-gray-200 p-1 rounded-md outline-none focus:outline-indigo-900 dark:focus:outline-rose-400 ${state?.errors?.lastName && 'border-red-500 dark:border-red-400'}`} aria-describedby="lastName-error" defaultValue={state?.values?.lastName} />
            <div id="lastName-error" aria-live="polite" aria-atomic='true'>
              { state?.errors?.lastName &&
                  state?.errors.lastName.map((error: string) => (
                    <p className="text-sm text-red-500 dark:text-red-300" key={error}>{error}</p>
                  )) }
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="dark:text-gray-200" htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="johnDoe@email.com" className={`bg-white transition-all dark:bg-transparent border dark:border-gray-700 dark:text-gray-200 p-1 rounded-md outline-none focus:outline-indigo-900 dark:focus:outline-rose-400 ${state?.errors?.email && 'border-red-500 dark:border-red-400'}`} aria-describedby="email-error" defaultValue={state?.values?.email} />
          <div id="email-error" aria-live="polite" aria-atomic='true'>
            { state?.errors?.email &&
                state?.errors.email.map((error: string) => (
                  <p className="text-sm text-red-500 dark:text-red-300" key={error}>{error}</p>
                )) }
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="dark:text-gray-200" htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="********" className={`bg-white transition-all dark:bg-transparent border dark:border-gray-700 dark:text-gray-200 p-1 rounded-md outline-none focus:outline-indigo-900 dark:focus:outline-rose-400 ${state?.errors?.password && 'border-red-500 dark:border-red-400'}`} aria-describedby="password-error" defaultValue={state?.values?.password} />
          <div id="password-error" aria-live="polite" aria-atomic='true'>
            { state?.errors?.password &&
                state?.errors.password.map((error: string) => (
                  <p className="text-sm text-red-500 dark:text-red-300" key={error}>{error}</p>
                )) }
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="dark:text-gray-200" htmlFor="phoneNum">Phone number</label>
          <PhoneNumberInput id="phoneNum" name='phoneNum' className={`relative h-[100%] ${state?.errors?.phoneNum && 'border-red-500 dark:border-red-400'}`} />
          <div id="phoneNum-error" aria-live="polite" aria-atomic='true'>
            { state?.errors?.phoneNum &&
                state?.errors.phoneNum.map((error: string) => (
                  <p className="text-sm text-red-500 dark:text-red-300" key={error}>{error}</p>
                )) }
          </div>
        </div>
        <LitButton className="self-center" type="submit" disabled={pending}>
          {pending && <Triangle color="white" height="20" width="20" />}
          Register
        </LitButton>
      </div>
    </form>
  </div>
  )
}

export default ManagerRegisterForm