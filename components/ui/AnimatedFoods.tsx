'use client';

import { foodImages } from '@/app/lib/constants'
import Image from 'next/image'
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const timeline = gsap.timeline({
  repeat: -1
});

const AnimatedFoods = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const containerHeight = containerRef.current?.offsetHeight || 500;
    timeline.to('.food-image', {
      y: containerHeight - 120,
      rotate: 720,
      stagger: 0.2,
      duration: 1,
      scale: 1.4
    });
    timeline.to('.food-image', {
      y: 0,
      rotate: 0,
      stagger: 0.2,
      duration: 1,
      scale: 1,
    })
  }, [])

  return (
    <div ref={containerRef} className="hidden lg:flex items-start justify-between bg-gradient-to-r from-indigo-50 to-purple-200 flex-1 p-6">
      {foodImages.map((image, i) => (
        <Image src={image.href} key={i} width='48' height='48' className="food-image" alt={image.label} />
      ))}
    </div>
  )
}

export default AnimatedFoods