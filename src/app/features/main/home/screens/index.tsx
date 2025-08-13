'use client';

import { Menu, MessageCircleMore, Search } from 'lucide-react';
import { BottomNavBar } from '@/components/bottom-navbar';
import Image from 'next/image'

export const HomeScreen= () => {
  return (
    <div className='min-h-screen bg-gray-50 pb-16'>
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-gray-900 px-4 shadow-md">
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 text-white" />
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="/logo.jpg"
            className='h-8 w-8 rounded-full'
            width={500}
            height={500}
            alt="logo"
          />
        </div>
        <div className="flex items-center gap-4">
          <Search className="h-6 w-6 text-white" />
          <MessageCircleMore className="h-6 w-6 text-white" />
        </div>
      </header>

      <main className='space-y-4 p-4'>
        card
      </main>
      {/* <BottomNavBar /> */}
    </div>
  );
};
