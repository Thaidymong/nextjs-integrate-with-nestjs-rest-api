'use client';

import { Edit, Menu, Search, User } from 'lucide-react';
import { BottomNavBar } from '@/components/bottom-navbar';

export const HomeScreen= () => {
  return (
    <div className='min-h-screen bg-gray-50 pb-16'>
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between bg-gray-900 px-4 shadow-md">
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 text-white" />
          <span className="text-lg font-semibold">11:39</span>
          {/* Moon icon not directly available in Lucide, using a placeholder or omitting */}
        </div>
        <div className="flex items-center gap-4">
          <Edit className="h-6 w-6 text-white" />
          <Search className="h-6 w-6 text-white" />
          <User className="h-6 w-6 text-white" />
        </div>
      </header>

      <main className='space-y-4 p-4'>
        card
      </main>
      <BottomNavBar />
    </div>
  );
};
