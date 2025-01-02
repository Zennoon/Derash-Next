'use client';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image';

const timeline = gsap.timeline({
  repeat: -1,
});

const AnimatedRestaurant = () => {
  useGSAP(() => {
    timeline.to('.restaurant-image', {
      scale: 1.5,
      stagger: 0.5
    });

    timeline.to('.restaurant-image', {
      scale: 1,
      stagger: 0.5
    })
  }, []);
  return (
    <div className="hidden lg:flex items-center justify-center flex-1 p-6">
      <div className='relative w-48 flex justify-center'>
        <Image src='/restaurant-cartoon.png' width='200' height='200' alt='Cartoon Restaurant' className='restaurant-image -mr-14' />
        <Image src='/restaurant-cartoon.png' width='200' height='200' alt='Cartoon Restaurant' className='restaurant-image z-2' />
        <Image src='/restaurant-cartoon.png' width='200' height='200' alt='Cartoon Restaurant' className='restaurant-image -ml-14' />
      </div>
    </div>
  )
}

export default AnimatedRestaurant