'use client';

import Image from 'next/image';
// import { Headset } from 'lucide-react';
// import { RecentAttendances, FeatureButtonsScrollable } from '../components';
// import { AttendanceRecord } from '@/__generated__/graphql';
// import { BottomNavBar } from '@/components/bottom-navbar';
import { BottomNavBar } from '@/components/bottom-navbar';
// import { MenuGrid } from '../components/menu-grid';

// type HomeScreenProps = {
//   attendances: AttendanceRecord[] | null;
// };

export const HomeScreen= () => {
  return (
    <div className='min-h-screen bg-gray-50 pb-16'>
      <header className='sticky top-0 z-10 flex h-24 items-center justify-between border-b bg-primary p-4 shadow-sm'>
        <div className='flex items-center justify-start gap-2 sm:gap-0'>
          <Image
            src='/logo.jpg'
            width={1000}
            height={1000}
            alt='Logo'
            style={{ height: '100%', width: '20%' }}
            className='sm:p-2 rounded-full'
            priority
          />

          <div className='flex flex-col'>
            {/* <p className='text-[15pt] font-bold text-white'>Nextjs App</p>
            <p className='text-xs text-white'>Nextjs App</p> */}
          </div>
        </div>
        {/* <div className='flex items-center gap-2'>
          <button
            className='flex flex-col items-center p-2'
            onClick={() => (window.location.href = 'tel:012212015')}>
            <Headset className='h-6 w-6 text-white' />
            <span className='text-xs text-white'>ជំនួយ</span>
          </button>
        </div> */}
      </header>

      <main className='space-y-4 p-4'>
        {/* <ProfileCard />
        <MenuGrid />
        <FeatureButtonsScrollable />
        <RecentAttendances attendances={attendances} /> */}
        card
      </main>

      <BottomNavBar />
    </div>
  );
};
