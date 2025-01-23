'use client';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from 'next-themes';

const SalesHistory = ({ history } : {
  history: {
    label: string,
    value: number
  }[]
}) => {
  const { theme } = useTheme();
  return (
    <ResponsiveContainer width='100%' height='100%' className='min-h-64'>
      <BarChart width={150} height={80} data={history} margin={{ bottom: 20 }}>
        <XAxis dataKey='label' fill={(theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)'))) ? '#ffffff' : '#000000'}/>
        <YAxis />
        <Tooltip wrapperStyle={{
          backgroundColor: '#000'
        }} contentStyle={{
          color: (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)'))) ? '#dddddd' : '#222222',
          backgroundColor: (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)'))) ? '#222222' : '#fff'
        }} />
        <Bar dataKey='value' fill={(theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)'))) ? '#fb7165' : '#7366f1'} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default SalesHistory