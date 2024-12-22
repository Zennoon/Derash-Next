import { dosis } from "@/app/fonts"
import CustomerRegisterForm from "@/components/ui/CustomerRegisterForm"
import Image from "next/image"
import Link from "next/link"

const CustomerRegisterPage = () => {
  return (
    <div className="h-[100%] min-h-full w-[100vw] bg-n-1 text-black flex">
      <div className={`min-h-screen h-[100%] lg:w-[50%] p-4 flex flex-col items-center justify-between overflow-hidden`}>
        <div className="self-start flex gap-3 border-t border-b ml-5 pt-1 pb-1">
          <Image
            src='/derash-logo.png'
            alt='Derash logo'
            width='36'
            height='36'
          />
          <h5 className={`h5 text-n-5 antialiased`}>Derash</h5>
        </div>
        <CustomerRegisterForm />
        <p className="">Already have an account? <Link href='/login' className="text-indigo-500 hover:text-purple-500 transition-colors duration-100 font-semibold">Sign in</Link></p>
      </div>
      <div className="hidden lg:block bg-black flex-1">
      </div>
    </div>
  )
}

export default CustomerRegisterPage
