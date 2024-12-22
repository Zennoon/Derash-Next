import React from 'react'
import Link from 'next/link';
import { accountTypes } from '../lib/constants';
import { CheckCircle, ChefHat, Pizza, Truck } from 'lucide-react';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import LitButton from '@/components/ui/LitButton';

const ChooseAccountPage = () => {
  return (
    <BackgroundBeamsWithCollision className='p-0 m-0'>
      <div className='p-10 flex flex-col gap-8 justify-center items-center'
      style={{
        background: 'radial-gradient(circle, rgba(13,13,13,1) 0%, rgba(57,16,16,1) 0%, rgba(23,22,22,1) 100%, rgba(49,64,68,1) 100%)'
      }}
        >
        <h1 className='lg:text-4xl text-3xl text-n-2'>Choose the account</h1>
        <div className='flex flex-col lg:flex-row'>
          { accountTypes.map((accountType, i) => (
            <div
              key={i}
              className={`${i === 0 ? 'lg:rounded-l-xl' : (i === 2 ? 'lg:rounded-r-xl' : '')} backdrop-blur-sm p-10 border border-n-2/50`}
            >
              <div className='flex justify-between items-center mb-[2rem] gap-24'>
                <h5 className='h5 font-light'>{accountType.name}</h5>
                { i === 0 ? <Pizza className='w-14 h-14' /> : (i === 1 ? <ChefHat className='w-14 h-14' /> : <Truck className='w-14 h-14' />) }
              </div>
              <p className='pb-4 border-b border-n-4 font-extralight'>{accountType.tagline}</p>
              <div className='flex justify-center align-center p-10 border-b border-n-4 mb-10'>
                <LitButton href={accountType.href} label='Choose'></LitButton>
              </div>
              <div className='space-y-5'>
                {accountType.features.map((feature, i) => (
                  <p key={i} className='flex items-center gap-3 text-sm font-light text-n-2'><CheckCircle className='w-5 h-5'/><span>{feature}</span></p>
                ))}
              </div>
            </div>
          )) }
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  )
}

export default ChooseAccountPage;