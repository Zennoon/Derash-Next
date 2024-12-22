import Image from 'next/image'
import React from 'react'

const Avatar = ({ src }: {
  src?: string | null
}) => {
  return (
    <div className='p-[2px] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full'>
      <Image width='36' height='36' className='rounded-full' src={src || '/default-avatar.jpg'} alt='avatar' />
    </div>
  )
}

export default Avatar