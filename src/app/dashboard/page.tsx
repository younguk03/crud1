import { auth } from '@/auth'
import React from 'react'

export default async function page() {
   
   const session = await auth()
   if (!session) return <div className='text-2xl'>Not authenticated...</div>
   return (
      <div>
         <h1 className='text-3xl font-bold'>Dashboard Page: {session?.user?.name}</h1>
         
         <pre>
            {JSON.stringify(session, null, 2)}
         </pre>
      </div>
   )
}
