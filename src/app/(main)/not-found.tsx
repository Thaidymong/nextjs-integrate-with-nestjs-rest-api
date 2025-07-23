'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <Image
        src='/404-ERROR.svg'
        alt='404 Not Found'
        width={200}
        height={200}
        priority
        className='mb-2'
      />
      <h1 className='text-2xl font-bold'>404 - ទំព័ររកមិនឃើញ</h1>
      <p className='text-lg'>ទំព័រដែលអ្នកកំពុងរកមិនមានទេ</p>
      <button
        className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
        onClick={() => router.back()}>
        ទៅទំព័រដើម
      </button>
    </div>
  );
}
