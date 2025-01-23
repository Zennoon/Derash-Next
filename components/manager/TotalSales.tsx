import { getTotalSales } from '@/app/utils'
import React from 'react'
import SalesHistory from './SalesHistory';

const TotalSales = async ({ restaurantId, span }: {
  restaurantId: string,
  span: string
}) => {
  const { totalSales, history } = await getTotalSales(restaurantId, span);

  return (
    <div className='flex flex-col lg:flex-row w-full justify-center gap-10'>
      <div className='flex flex-col gap-5 items-start w-full lg:w-2/5 bg-white dark:bg-transparent/40 backdrop-blur-lg p-3 rounded-sm shadow-md'>
        <span className='text-indigo-500 dark:text-rose-400 text-xl'>Total Sales</span>
        <p className='flex justify-center items-center flex-1 self-center text-3xl font-light text-gray-800 dark:text-gray-300'>${totalSales}</p>
      </div>
      <div className='flex flex-col p-3 gap-2 items-center w-full lg:w-1/2 bg-white dark:bg-transparent/40 rounded-sm shadow-md'>
        <span className='text-indigo-500 dark:text-rose-400 text-xl self-start'>Sales History <span className='text-gray-500 dark:text-gray-300 text-sm'>(values in $)</span></span>
        <SalesHistory history={history} span={span} />
      </div>
    </div>
  )
}

export default TotalSales