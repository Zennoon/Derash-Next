'use client';

import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { navItems } from '@/app/lib/constants';
import MenuSvg from './MenuSvg';

const NavBar = () => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const { data: session } = useSession();

  const toggleNav = () => {
    // TODO: Add a scroll lock to disable scrolling when nav is open
    if (openNav) {
      setOpenNav(false);
    } else {
      setOpenNav(true);
    }
  }

  const handleClick = () => {
    setOpenNav(false);
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 border-b border-n-6 bg-transparent/20`}>
      <div className='flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4'>
        <a className='block w-[12rem] xl:mr-8' href="/">
          <Image
            src='/derash-logo.png'
            alt='Derash Logo'
            width='48'
            height='48'
          />
        </a>
        <nav className={`${openNav ? 'flex' : 'hidden'} bg-transparent/90 lg:bg-transparent lg:flex fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:mx-auto`}>
          <div className='relative z-2 flex flex-col lg:flex-row lg:gap-6 items-center justify-center m-auto'>
            {navItems.map((navItem, i) => (
              <div
                key={i}
                className={`lg:flex flex-col  justify-center items-center gap-0.5 relative text-2xl transition-colors hover:text-gray-200
                            ${navItem.onlyMobile ? 'lg:hidden' : ''} lg:-mr-0.25
                            lg:text-xs lg:font-semibold ${navItem.href === pathname ? 'z-2 text-n-1': 'text-n-1/50'}
                            lg:leading-5 ${navItem.signedOutOnly ? (session ? 'hidden' : '') : ''} ${navItem.signedInOnly ? (session ? '' : 'hidden') : ''}`}>
                <a
                  key={i}
                  href={navItem.href}
                  className='block px-4 py-4 md:py-6 xl:px-6'
                  onClick={ handleClick }
                >
                  {navItem.label}
                </a>
                <span className={`w-1 h-1 rounded-full ${pathname === navItem.href ? 'bg-n-1': ''}`}></span>
              </div>
            ))}
          </div>
        </nav>
        <div className='mr-8 lg:text-sm hidden text-n-1/50 transition-colors lg:flex gap-6'>
          {session ? (
            <a href="/logout" className='hover:text-n-1 '>Log out</a>
          ) : (
            <>
              <a
                href='/signup'
                className='hover:text-n-1 '
              >
                New Account
              </a>
              <a
                href='/signup'
                className='hover:text-n-1 '
              >
                Sign in
              </a>
            </>
          )}
        </div>
        <button
          className='ml-auto lg:hidden'
          onClick={toggleNav}
        >
          <MenuSvg openNavigation={openNav} />
        </button>
      </div>
    </header>
  )
}

export default NavBar