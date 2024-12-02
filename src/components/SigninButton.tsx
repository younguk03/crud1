
import { signIn } from '@/auth'
import Image from 'next/image'
import React from 'react'

export default function SigninButton() {
   return (
      <div className='flex flex-col gap-4 mt-10 items-center'>
         <form action={async () => {
            'use server'
            await signIn('google', { redirectTo: '/dashboard' })
         }}>
            <button type='submit' className='flex items-center justify-center rounded-lg pl-3 mb-4'>
               <Image src='/google-logo.png' width={30} height={30} alt='google' />
               <span className='bg-blue-500 text-white px-4 py-3'>Sign in with Google</span>
            </button>
         </form>
         <form action={async () => {
            'use server'
            await signIn('github', { redirectTo: '/dashboard' })
         }}>
            <button type='submit' className='flex items-center justify-center rounded-lg pl-3 mb-4'>
               <Image src='/github-logo.png' width={30} height={30} alt='google' />
               <span className='bg-blue-500 text-white px-4 py-3'>Sign in with Gihub</span>
            </button>
         </form>
      </div>
   )
}
