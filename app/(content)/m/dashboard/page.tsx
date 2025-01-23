import { getManagerRestaurants, verifyManager } from '@/app/utils';
import SelectRestaurant from '@/components/manager/SelectRestaurant';
import OrdersCount from '@/components/manager/OrdersCount';
import TotalSales from '@/components/manager/TotalSales';
import SelectTimeSpan from '@/components/ui/SelectTimeSpan';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Suspense } from 'react';
import RestaurantRating from '@/components/manager/RestaurantRating';
import LatestReview from '@/components/manager/LatestReview';

const ManagerDashboardPage = async ({ searchParams }: {
  searchParams: Promise<Record<string, string>>
}) => {
  const params = await searchParams;
  const restaurantId = params['rId'] || '';
  const span = params['span'] || 'today';
  const restaurants = await getManagerRestaurants();
  let restaurant;

  if (restaurantId) {
    restaurant = await verifyManager(restaurantId);
  }

  return (
    <div className='w-full h-full p-8'>
      <div className='w-full flex flex-col lg:flex-row justify-between items-center'>
        <h1 className='h4 dark:text-gray-200 font-light'>Dashboard</h1>
        <div className='flex flex-col sm:flex-row gap-3'>
          <SelectRestaurant searchParams={params} restaurants={restaurants}/>
          <SelectTimeSpan searchParams={params} />
        </div>
      </div>
      { restaurantId ? (restaurant ? (
        <div className='flex flex-col gap-8 mt-4'>
          <div className='self-center flex items-end gap-4'>
            <Link href={`/m/restaurants/${restaurant.id}`} className='text-indigo-700 hover:text-indigo-400 dark:text-rose-500 dark:hover:text-rose-400 transition-colors text-2xl self-center'>{restaurant.name}</Link>
            <p>({span[0].toLocaleUpperCase().concat(span.slice(1))})</p>            
          </div>
          <div className='flex flex-col gap-5'>
            <Suspense fallback={<div className='w-full h-[300px] flex justify-center gap-10 flex-col lg:flex-row'>
              <Skeleton className='w-full lg:w-2/5 h-48 lg:h-[300px]' />
              <Skeleton className='w-full lg:w-1/2 h-[300px]' />
            </div>}>
              <TotalSales restaurantId={restaurantId} span={span} />
            </Suspense>
            <Suspense fallback={<div className='w-full h-[300px] flex justify-center gap-10 flex-col lg:flex-row'>
              <Skeleton className='w-full lg:w-2/5 h-48 lg:h-[300px]' />
              <Skeleton className='w-full lg:w-1/2 h-[300px]' />
            </div>}>
              <OrdersCount restaurantId={restaurantId} span={span} />
            </Suspense>
            <div className='w-full h-[300px] flex justify-center gap-10 flex-col lg:flex-row'>
              <RestaurantRating restaurant={restaurant} />
              <Suspense fallback={<Skeleton className='w-full lg:w-1/2 h-[300px]'/>}>
                <LatestReview restaurant={restaurant} />
              </Suspense>
            </div>
          </div>
        </div>
      ) : (
        <div>Restaurant not found!</div>
      )) : (
        <div>Display info for all restaurants</div>
      ) }
    </div>
  )
}

export default ManagerDashboardPage