import React from 'react'
import { dosis } from '@/app/fonts'

const ColoredLogo = ({ width, height }: {
  width: string,
  height: string
}) => {
  return (
    <div className={`w-${width} h-${height} ${dosis.className}`}>ColoredLogo</div>
  )
}

export default ColoredLogo