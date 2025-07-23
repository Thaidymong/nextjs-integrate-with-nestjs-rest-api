'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff, Loader2, ScanLine, Headset } from 'lucide-react';
// import { login } from '@/features/auth/login/actions';
import { cn } from '@/lib/utils';
import { type LoginFormValues, loginSchema } from '../schema';
import { toast } from 'sonner';
import Image from 'next/image';

export const LoginScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // const onSubmit = (input: LoginFormValues) => {
  //   startTransition(async () => {
  //     const { data, error } = await login(input);
  //     if (data?.accessToken) {
  //       router.push('/');
  //       router.refresh();
  //     } else if (error) {
  //       toast.error(error.message, {
  //         duration: 5000,
  //         position: 'top-right',
  //         style: {
  //           fontSize: '11pt',
  //           fontFamily: "koh_santepheap, 'Noto Sans Khmer', sans-serif",
  //         },
  //       });
  //     }
  //   });
  // };

  return (
    <div className='relative flex min-h-screen flex-col bg-background px-4 md:px-6'>
      <main className='flex flex-1 items-center'>
        <div className='mx-auto w-full max-w-[400px] space-y-6'>
          <div className='flex items-center justify-center'>
            <Image
              src='/logo.jpg'
              alt='Next.js Logo'
              width={500}
              height={500}
              priority
              className='mb-4 h-[100%] w-[30%]'
            />
          </div>
          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-bold md:text-3xl'>Aura</h1>
            <p className='text-sm text-muted-foreground md:text-base'>
              Welcome to our Nextjs App
            </p>
          </div>

          <form className='space-y-4'>
            <div className='space-y-2'>
              <Input
                type='text'
                placeholder='username'
                className={cn('h-12', {
                  // 'border-destructive': errors.username,
                })}
                // {...register('username')}
              />
              {errors.username && (
                <p className='text-xs text-destructive'>{errors.username.message}</p>
              )}
            </div>

            <div className='space-y-2'>
              <div className='relative'>
                <Input
                  // type={showPassword ? 'text' : 'password'}
                  placeholder='password'
                  className={cn('h-12 pr-12', {
                    // 'border-destructive': errors.password,
                  })}
                  // {...register('password')}
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground'
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className='h-5 w-5' /> : <Eye className='h-5 w-5' />}
                </Button>
              </div>
              {errors.password && (
                <p className='text-xs text-destructive'>{errors.password.message}</p>
              )}
            </div>

            <Button
              type='submit'
              className='h-12 w-full text-base font-medium text-white bg-[#04D939]'
              disabled={isPending}>
              {isPending && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
              Signup
            </Button>
          </form> 

        </div>
      </main>
      
      <footer className='p-4 text-center text-sm text-muted-foreground'>
        &copy; 2025 All rights reserved
      </footer>
    </div>
  );
};
