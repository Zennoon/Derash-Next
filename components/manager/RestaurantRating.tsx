import { getCustomerRating } from '@/app/utils'
import { Restaurant } from '@prisma/client';
import React from 'react'
import Rating from '../ui/Rating';

const RestaurantRating = async ({ restaurant }: {
  restaurant: Restaurant
}) => {
  const rating = getCustomerRating(restaurant);
  return (
    <div className='flex flex-col p-3 gap-2 items-center w-full lg:w-2/5 bg-white dark:bg-transparent/40 rounded-sm shadow-md'>
      <span className='text-indigo-500 dark:text-rose-400 text-xl self-start'>Customer Rating</span>
      <div className='h-full flex flex-col justify-center gap-3'>
        <Rating name={restaurant.name} readOnly value={rating}/>
        <p className='flex justify-center items-center self-center text-3xl font-light text-gray-800 dark:text-gray-300'>{rating} Stars</p>
      </div>
    </div>
  )
}

export default RestaurantRating