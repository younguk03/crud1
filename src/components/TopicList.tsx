'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import RemoveBtn from './RemoveBtn'

interface Topic {
   _id: string
   title: string
   description: string
   createdAt: string
   updatedAt: string
}

export default function TopicList() {
   const [topics, setTopics] = useState<Topic[]>([])
   const [loading, setLoading] = useState(true)
   const [error, setError] = useState<string | null>(null)

   useEffect(() => {
      async function fetchTopics() {
         try {
            const res = await fetch('/api/topics');
            if (!res.ok) {
               throw new Error('Failed to fetch topics')
            }
            const data = await res.json()
            setTopics(data.topics)
         } catch (error) {
            console.error('Error loading topics: ', error);
            setError(`Failed to load topics`)
         } finally {
            setLoading(false)
         }

      } fetchTopics()
   }, [])

   if (loading) return <p>Loading topics</p>
   if (error) return <p>ErrorL {error}</p>
   if (topics.length === 0) return <p>No Topic found!</p>
   return (
      <div>
         {
            topics.map((topic: Topic) => (
               <div key={topic._id} className='p-4 border border-slate-300 my-3 flex justify-between items-start gap-5'>
                  <div>
                     <h2 className='text wxl font-bold'>{topic.title}</h2>
                     <div>{topic.description}</div>
                     <div className='flex gap-4'>
                        <p>Created: {topic.createdAt}</p>
                        <p>Updataed: {topic.updatedAt}</p>
                     </div>
                  </div>
                  <div className='flex gap-2'>
                     <RemoveBtn id={topic._id} />
                     <Link href={`/editTopic/${topic._id}`}>
                        <HiPencilAlt size={24} />
                     </Link>
                  </div>
               </div>
            ))
         }
      </div>
   )
}
