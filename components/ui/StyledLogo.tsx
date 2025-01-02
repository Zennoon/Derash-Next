import React from 'react'
import { engagement } from '@/app/fonts'

const StyledLogo = ({ className }: {
  className?: string
}) => {
  return (
    <span className={`${engagement.className} text-2xl transition-colors text-indigo-500 dark:text-rose-600 hover:text-indigo-400 dark:hover:text-rose-500 font-extrabold ${className}`}>Derash</span>
  )
}

export default StyledLogo