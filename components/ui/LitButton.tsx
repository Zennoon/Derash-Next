import Link from 'next/link'
import React from 'react'

const LitButton = ({ href, className, type, children, disabled, onClick }: {
  href?: string,
  className?: string,
  type?: "button" | "reset" | "submit",
  children: string | React.ReactNode[],
  disabled?: boolean,
  onClick?: () => void,
}) => {
  return (
    <div className={`${className} transition duration-200 hover:scale-105`}>
      { href ? (
        <Link href={href} className="p-[3px] relative">
        <div className="px-6 py-2 rounded-[6px] bg-gradient-to-r from-indigo-500 to-purple-600 relative group text-white font-light tracking-wide flex items-center gap-2"
        >
          {children}
        </div>
      </Link>
      ) : (
        <button className="p-[3px] relative" type={type || 'button'} disabled={disabled} onClick={onClick}>
          <div className="px-8 py-2 rounded-[6px] bg-gradient-to-r from-indigo-500 to-purple-600 relative group text-white font-light tracking-wide flex items-center gap-2">
            {children}
          </div>
        </button>
      ) }
    </div>
  )
}

export default LitButton
