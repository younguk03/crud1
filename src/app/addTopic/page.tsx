<<<<<<< HEAD
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
=======
import AddTopicForm from '@/components/AddTopicForm'
>>>>>>> a7e50e1e7df88c03e02e57bfe6331ba951dd003c

export default function AddTopicPage() {
   return (
      <div className="max-w-3xl mx-auto mt-8">
         <h1 className="text-2xl font-bold mb-4">새 토픽 추가</h1>
         <AddTopicForm />
      </div>
   )
}