import React from 'react'

const Review = ({ review, className }: {
  review: {
    firstName: string | undefined,
    lastName: string | undefined,
    comment: string,
    createdAt: Date
  },
  className?: string
}) => {
  return (
    <div className={`w-full flex flex-col gap-2 items-start ${className}`}>
      <div className='w-full flex justify-between gap-5 border-b border-gray-300 dark:border-gray-600'>
        <p className='font-semibold'>{review.firstName} {review.lastName}</p>
        <p className='font-light hidden sm:block text-indigo-500 dark:text-rose-400'>{ review.createdAt.toDateString() }</p>
      </div>
      <p className='font-light text-gray-700 dark:text-gray-300'>{ review.comment }</p>
    </div>
  )
}

export default Review