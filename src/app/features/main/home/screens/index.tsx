'use client';

import Image from 'next/image';
import { Text } from 'lucide-react';
import { BottomNavBar } from '@/components/bottom-navbar';

export const HomeScreen= () => {
  return (
    <div className='min-h-screen bg-gray-50 pb-16'>
      <header className='sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-primary p-4 shadow-sm'>
        <div className='flex items-center justify-start gap-2 sm:gap-0'>
          {/* <Image
            src='/logo.jpg'
            width={1000}
            height={1000}
            alt='Logo'
            style={{ height: '100%', width: '100%' }}
            className='sm:p-2 rounded-full'
            priority
          /> */}

          <div className='flex flex-col'>
            <p className='text-[10px] text-[#04D939]'>Good Afternoon!</p>
            <p className='text-xs text-white'>What's on your mind?</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <div
            className='flex flex-col items-center p-2'
          >
            <Text className='h-6 w-6 text-white' />
          </div>
        </div>
      </header>

      <main className='space-y-4 p-4'>
        card
      </main>

      <BottomNavBar />
    </div>
  );
};
