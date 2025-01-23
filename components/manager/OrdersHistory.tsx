'use client';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { LineChart } from '@mui/x-charts/LineChart';

const OrdersHistory = ({ history, span } : {
  history: {
    label: string,
    totalOrdersCount: number,
    completedOrdersCount: number
  }[],
  span: string
}) => {
  const { theme } = useTheme();
  const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)'));
  const axisStyles = {
    light: {
      '& .MuiAxis-root': {
        stroke: '#000000'
      },
      '& .MuiAxis-tickLabel': {
        fill: '#000000'
      }
    },
    dark: {
      '& .MuiAxis-root': {
        stroke: '#ffffff'
      },
      '& .MuiAxis-tickLabel': {
        fill: '#ffffff'
      }
    }
  };

  return (
    <LineChart
      className='w-1/2 dark:stroke-gray-400 dark:font-extralight'
      dataset={history}
      series={[
        { dataKey: 'totalOrdersCount', color: dark ? '#fb7165' : '#7366f1', label: 'Number of orders'},
        { dataKey: 'completedOrdersCount', color: dark ? '#7366f1' : '#fb7165', label: 'Number of completed orders'}
      ]}
      xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
      height={300}
      grid={{ horizontal: true }}
      sx={dark ? axisStyles.dark : axisStyles.light}
    />
  )
}

export default OrdersHistory