import AnimatedCars from "@/components/ui/AnimatedCars"
import DriverRegisterForm from "@/components/ui/DriverRegisterForm"
import StyledLogo from "@/components/ui/StyledLogo"
import Image from "next/image"
import Link from "next/link"

const DriverRegisterPage = () => {
  return (
    <div className="h-[100%] min-h-full w-[100vw] text-black flex">
      <div className={`min-h-screen h-[100%] lg:w-[50%] lg:p-4 p-10 flex flex-col items-center justify-between overflow-hidden`}>
      <div className="self-start flex justify-between ml-5 pt-1 pb-1">
          <Link href='/'>
            <StyledLogo className="" />
          </Link>
        </div>
        <DriverRegisterForm />
        <p className="self-center dark:text-gray-300">Already have an account? <Link href='/login' className="text-indigo-500 hover:text-purple-500 dark:text-rose-400 dark:hover:text-rose-300 transition-colors duration-100 font-semibold">Sign in</Link></p>
      </div>
      <AnimatedCars />
    </div>
  )
}

export default DriverRegisterPage