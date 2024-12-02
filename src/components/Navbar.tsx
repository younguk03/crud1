'use client'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
   const { status, data: session } = useSession()

   return (
      <div className="flex justify-between items-center bg-red-900 px-8 py-4">
         <Link className="text-white text-lg font-bold " href="/"> MongoDB CRUD
         </Link>
         <Link className="bg-yellow-200 text-lg font-bold px-4 py-2 rounded-md" href="/addTopic">
            Add Topic
         </Link>
         <div className='flex gap-4'>
            {
               //인증된 상태(로그인 된 상태)
               status === 'authenticated' ? (
                  <>
                     <div className='flex gap-2 items-center'>
                        <Image
                           className="rounded-full"
                           src={session?.user?.image ?? '/default-avatar.png'}
                           width={40}
                           height={40}
                           alt={session?.user?.name ?? 'user'}
                        />
                        <span className="text-white font-bold">
                           {session?.user?.name}
                        </span>
                        
                        <button onClick={() => signOut()} className='bg-blue-600 hover:bg-blue-700 text-white px-4'>
                           Sign-out
                        </button>
                     </div>
                  </>
               ) : (
                  <>
                     <Link href='/login' className='bg-blue-600 text-white pr-3 pl-3 p-2 rounded-md'>Login</Link>
                  </>
               )
            }
         </div>
      </div>
   )
}
