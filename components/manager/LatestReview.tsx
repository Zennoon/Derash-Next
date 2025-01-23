import { getLatestCustomerReview } from '@/app/utils'
import { Restaurant } from '@prisma/client'
import React from 'react'
import Review from '../ui/Review'

const LatestReview = async ({ restaurant }: {
  restaurant: Restaurant
}) => {
  const latestReview = await getLatestCustomerReview(restaurant);
  return (
    <div className='flex flex-col p-3 gap-5 items-center w-full lg:w-1/2 bg-white dark:bg-transparent/40 rounded-sm shadow-md'>
      <span className='text-indigo-500 dark:text-rose-400 text-xl self-start'>Latest Review</span>
      <div className='p-3 flex-1 flex items-center'>
        { (latestReview) ? (<Review review={latestReview} />) : <p>No reviews yet...</p> }
      </div>
    </div>
)
}

export default LatestReview