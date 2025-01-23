import { getOrdersCount } from '@/app/utils'
import OrdersHistory from './OrdersHistory';

const OrdersCount = async ({ restaurantId, span }: {
  restaurantId: string,
  span: string
}) => {
  const { totalOrdersCount, completedOrdersCount, history } = await getOrdersCount(restaurantId, span);
  return (
    <div className='flex flex-col lg:flex-row w-full justify-center gap-10'>
      <div className='flex flex-col gap-5 w-full lg:w-2/5'>
        <div className='flex flex-1 flex-col gap-5 items-start bg-white dark:bg-transparent/40 backdrop-blur-lg p-3 rounded-sm shadow-md'>
          <span className='text-indigo-500 dark:text-rose-400 text-xl'>Total accepted orders</span>
          <p className='flex justify-center items-center flex-1 self-center text-3xl font-light text-gray-800 dark:text-gray-300'>{totalOrdersCount} Orders</p>
        </div>
        <div className='flex flex-1 flex-col gap-5 items-start bg-white dark:bg-transparent/40 backdrop-blur-lg p-3 rounded-sm shadow-md'>
          <span className='text-indigo-500 dark:text-rose-400 text-xl'>Completed orders</span>
          <p className='flex justify-center items-center flex-1 self-center text-3xl font-light text-gray-800 dark:text-gray-300'>{completedOrdersCount} Orders</p>
        </div>
      </div>
      <div className='flex flex-col p-3 gap-2 items-center w-full lg:w-1/2 bg-white dark:bg-transparent/40 rounded-sm shadow-md'>
        <span className='text-indigo-500 dark:text-rose-400 text-xl self-start'>Orders History</span>
        <OrdersHistory history={history} span={span} />
      </div>
    </div>
  )
}

export default OrdersCount