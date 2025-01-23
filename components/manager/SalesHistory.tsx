'use client';
import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from 'next-themes';

const SalesHistory = ({ history, span } : {
  history: {
    label: string,
    value: number
  }[],
  span: string
}) => {
  const horizontal = span === 'weekly' || span === 'semiAnnual';
  const [width, setWidth] = useState(window.innerWidth);
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
  window.addEventListener('resize', () => {
    setWidth(window.innerWidth);
  })

  return (
    <BarChart
      className='w-1/2 dark:stroke-gray-400 dark:font-extralight'
      dataset={history}
      series={[{ dataKey: 'value', color: dark ? '#fb7165' : '#7366f1', label: 'Value in $'}]}
      xAxis={(horizontal || (width < 700)) ? [] : [{ scaleType: 'band', dataKey: 'label', fill: '#fff' }]}
      yAxis={(horizontal || (width < 700)) ? [{ scaleType: 'band', dataKey: 'label' }] : []}
      height={300}
      layout={(horizontal || (width < 700)) ? 'horizontal' : 'vertical'}
      borderRadius={5}
      grid={{ horizontal: !horizontal }}
      sx={dark ? axisStyles.dark : axisStyles.light}
    />
  )
}

export default SalesHistory