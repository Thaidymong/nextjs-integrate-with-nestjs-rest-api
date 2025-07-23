'use client';

import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { useTransition } from 'react';

export default function Error() {
  const [isPending, startTransition] = useTransition();
  const handleReload = () => {
    startTransition(async () => {
      window.location.reload();
    });
  };
  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      <Image
        src='/maintenance.svg'
        alt='404 Not Found'
        width={200}
        height={200}
        priority
        className='mb-2'
      />
      <h1 className='text-2xl font-bold'>500 - ទំព័របញ្ហា</h1>
      <p className='text-lg'>ទំព័រនេះមានបញ្ហាបច្ចេកទេស</p>
      <Button className='mt-4 rounded px-4 py-2 text-white' onClick={handleReload}>
        {isPending && (
          <>
            <RefreshCw className='animate-spin' />
            <span>កំណត់ដំណើរការ</span>
          </>
        )}
        {!isPending && (
          <>
            <RefreshCw />
            <span>ព្យាយាមម្តងទៀត</span>
          </>
        )}
      </Button>
    </div>
  );
}
