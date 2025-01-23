'use client';

import React from 'react'
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { navItems } from '@/app/lib/constants';
import MenuSvg from './MenuSvg';
import Link from 'next/link';
import LitButton from './LitButton';
import UserAvatar from './UserAvatar';
import { ModeToggle } from './ThemeToggle';
import StyledLogo from './StyledLogo';

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
    <header className={`shadow-sm h-[12%] fixed top-0 left-0 w-full px-4 z-50 border-b border-gray-300 dark:border-n-6 bg-transparent/5 backdrop-blur-sm dark:bg-transparent/20`}>
      <div className='flex h-full items-center px-4'>
        <Link className='block w-[12rem] xl:mr-8' href="/">
          <StyledLogo />
        </Link>
        <nav className={`${openNav ? 'flex' : 'hidden'} bg-transparent/5 lg:bg-transparent lg:flex fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:mx-auto`}>
          <div className='relative w-full lg:bg-transparent z-2 flex flex-col lg:flex-row lg:gap-6 justify-center m-auto'>
            {navItems.map((navItem, i) => (
              <div
                key={i}
                className={`bg-white dark:bg-black lg:bg-transparent lg:dark:bg-transparent lg:flex flex-col text-center space-y-2 justify-center items-center relative text-2xl transition-colors
                            ${navItem.onlyMobile ? 'lg:hidden' : ''} lg:-mr-0.25 py-4 md:py-6
                            lg:text-xs lg:font-semibold ${navItem.href === pathname || (navItem.label === 'Dashboard' && pathname.includes('dashboard')) ? 'z-2 text-n-6 dark:text-n-1': 'text-n-8/50 dark:text-gray-400'}
                            lg:leading-5 ${navItem.signedOutOnly ? (session ? 'hidden' : '') : ''} ${navItem.signedInOnly ? (session ? '' : 'hidden') : ''}`}>
                <Link
                  key={i}
                  href={navItem.href}
                  className='block px-4 xl:px-6 hover:text-gray-700 dark:hover:text-gray-100 transition-colors'
                  onClick={ handleClick }
                >
                  {navItem.label}
                </Link>
                <span className={`w-1 h-1 rounded-full hover:w-5 ${pathname === navItem.href || (navItem.label === 'Dashboard' && pathname.includes('dashboard')) ? 'bg-indigo-500 dark:bg-rose-400': ''}`}></span>
              </div>
            ))}
            <div className='lg:hidden text-center bg-white dark:bg-black'>
              <ModeToggle/>
            </div>
          </div>
        </nav>
        <div className='mr-8 lg:text-sm hidden text-n-8/70 dark:text-n-1/50 lg:flex items-center gap-6'>
          {session ? (
            <Link href="/logout" className='transition duration-200 hover:scale-110'>
              <UserAvatar />
            </Link>
          ) : (
            <>
              <Link
                href='/register'
                className='hover:text-n-8 dark:hover:text-gray-200 transition-colors'
              >
                New Account
              </Link>
              <LitButton
                href='/login'
              >Sign in</LitButton>
            </> 
          )}
          <ModeToggle />
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