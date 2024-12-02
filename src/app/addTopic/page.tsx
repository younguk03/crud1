'use client'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AddTopic() {
   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')

   const router = useRouter()
   const {data:session} = useSession()

   if (!session){
      redirect(
         ('/login')
      )
   }

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!title || !description) {
         alert('Title and description are required.')
      }

      try {
         const res = await fetch('/api/topics', {
            method: 'POST',
            headers: {
               'Content-type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
         })

         if (res.ok) {
            router.push('/')
            router.refresh()
         } else {
            throw new Error('Failed to create a topic')
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
         <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Topic title"
            className="border border-slate-500 p-4"
         />

         <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Topic description"
            className="border border-slate-500 p-4 h-40"
         />

         <button
            type="submit"
            className="bg-green-800 rounded-lg text-white font-bold py-3 px-6 w-fit"
         >
            Add Topic
         </button>
      </form>
   )
}