'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

const timeline = gsap.timeline({
  repeat: -1,
});

const AnimatedCars = () => {
  const [reverse, setReverse] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const containerWidth = Math.min(window.innerWidth / 2, 300);
    gsap.to('.moveForward', {
      x: (containerWidth - 100),
      duration: 3,
      onComplete: () => setReverse(!reverse),
    });

    gsap.to('.moveBackward', {
      x: -(containerWidth - 100),
      duration: 3,
    })

  }, [reverse]);
  return (
    <div className='hidden lg:flex items-center max-w-[50%] justify-center flex-1 p-6'>
      <div ref={containerRef} className='flex flex-col gap-1'>
        <Image src={reverse ? '/car-cartoon.png' : '/car-cartoon-flipped.png'} width='100' height='100' alt='Cartoon Car' className={`${reverse ? 'moveBackward self-end' : 'moveForward self-start'}`} />
        <Image src={reverse ? '/car-cartoon-flipped.png' : '/car-cartoon.png'} width='100' height='100' alt='Cartoon Car' className={`${reverse ? 'moveForward self=start' : 'moveBackward self-end'}`} />
        <Image src={reverse ? '/car-cartoon.png' : '/car-cartoon-flipped.png'} width='100' height='100' alt='Cartoon Car' className={`${reverse ? 'moveBackward self-end' : 'moveForward self-start'}`} />
        <Image src={reverse ? '/car-cartoon-flipped.png' : '/car-cartoon.png'} width='100' height='100' alt='Cartoon Car' className={`${reverse ? 'moveForward self=start' : 'moveBackward self-end'}`} />
        <Image src={reverse ? '/car-cartoon.png' : '/car-cartoon-flipped.png'} width='100' height='100' alt='Cartoon Car' className={`${reverse ? 'moveBackward self-end' : 'moveForward self-start'}`} />
        <Image src={reverse ? '/car-cartoon-flipped.png' : '/car-cartoon.png'} width='100' height='100' alt='Cartoon Car' className={`${reverse ? 'moveForward self=start' : 'moveBackward self-end'}`} />
      </div>
    </div>
  )
}

export default AnimatedCars