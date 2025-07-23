'use client';

import { cn } from '@/lib/utils';
import { Bell, FileText, Home, ScanLine, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const navItems = [
  {
    href: '/',
    icon: Home,
    label: 'Home',
  },
  {
    href: '/posts',
    icon: FileText,
    label: 'Posts',
  },
  {
    href: '/scan',
    icon: ScanLine,
    label: 'ស្កេន',
  },
  {
    href: '/notifications',
    icon: Bell,
    label: 'Notification',
  },
  {
    href: '/profile',
    icon: User,
    label: 'Profile',
  },
];

export const BottomNavBar = () => {
  const pathname = usePathname();
  const [isIOS, setIsiOS] = React.useState(false);

  useEffect(() => {
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !('MSStream' in window);
    setIsiOS(isIOSDevice);
  }, []);

  return (
    <div className={cn('fixed inset-x-0 bottom-0 z-40 mx-auto max-w-[500px]', isIOS && 'bg-white')}>
      <div
        // className={cn(
        //   'fixed inset-x-0 z-40 mx-auto max-w-[500px]',
        //   isIOS ? 'bottom-4' : 'bottom-0'
        // )}
      >
        {/* <div className='relative h-[72px] sm:h-[96px]'>
          <div className='absolute inset-x-0 bottom-0 h-[60px] border-t border-none bg-white sm:h-[80px]' />

          Scan button wrapper with shadow effect
          <div className='absolute left-1/2 top-0 z-10 -translate-x-1/2'>
            <div className='relative h-[56px] w-[56px] sm:h-[72px] sm:w-[72px]'>
              Outer white circle with shadow
              <div
                className='absolute inset-0 rounded-full bg-white'
                style={{
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />

              <Link
                href='/scan'
                className={cn(
                  'absolute inset-[3px] flex items-center justify-center rounded-full bg-[#2980B9] transition-all duration-200 sm:inset-[4px]',
                  pathname === '/scan' ? 'bg-[#2980B9]' : 'hover:bg-[#287bb3]'
                )}
                aria-label='ស្កេន'>
                <ScanLine className='h-6 w-6 text-white sm:h-8 sm:w-8' />
              </Link>
            </div>
          </div>
        </div> */}

        <nav className='absolute inset-x-0 bottom-0 grid h-[60px] grid-cols-5 items-center px-2 sm:h-[80px] sm:px-6 bg-primary'>
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isMiddle = index === 2;

            if (isMiddle) {
              return <div key='spacer' className='flex justify-center' />;
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group flex flex-col items-center gap-1 transition-all duration-200 sm:gap-1.5',
                  pathname === item.href
                    ? 'text-[#04D939]'
                    : 'text-muted-foreground hover:text-[#04D939]'
                )}
                aria-current={pathname === item.href ? 'page' : undefined}>
                <Icon
                  className={cn(
                    'h-5 w-5 transition-transform duration-300 group-hover:scale-110',
                    pathname === item.href && 'scale-110'
                  )}
                />
                <span
                  className={cn(
                    'text-xs leading-tight',
                    pathname === item.href && 'font-bold',
                    isMiddle && 'sr-only'
                  )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Safe area spacing */}
      {/* <div className='h-[72px] sm:h-[96px]' /> */}
    </div>
  );
};
