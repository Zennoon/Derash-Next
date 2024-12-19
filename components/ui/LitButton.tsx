import Link from 'next/link'
import React from 'react'

const LitButton = ({ href, label, className }: {
  href?: string,
  label: string,
  className?: string
}) => {
  return (
    <div className={`${className} transition duration-200 hover:scale-105`}>
      { href ? (
        <Link href={href} className="block p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2 rounded-[6px] bg-gradient-to-r from-indigo-500 to-purple-600 relative group text-white font-light tracking-wide"
        >
          {label}
        </div>
      </Link>
      ) : (
        <button className="p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            {label}
          </div>
        </button>
      ) }
    </div>
  )
}

export default LitButton
