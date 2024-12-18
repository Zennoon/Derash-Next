'use client';
import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeProvder = ({children, ...props}: React.ComponentProps<typeof NextThemesProvider>) => {
  return (
    <NextThemesProvider {...props}>
      { children }
    </NextThemesProvider>
  )
}

export default ThemeProvder
