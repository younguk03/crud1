import { auth } from '@/auth'
import EditTopicForm from '@/components/EditTopicForm'
import { redirect } from 'next/navigation'
import React from 'react'
//use client가 없으니까 auth를 쓰면 됨

const apiUrl = process.env.API_URL

const getTopciById = async (id: string) => {
   try {
      const res = await fetch(`${apiUrl}/api/topics/${id}`, {
         cache: "no-store" //기존에 cache한걸 가지오지 말고 DB에서 새로 가져오라는 의밈
      })
      if (!res.ok) {
         throw new Error('Failed to fetch topic.')
      }
      return res.json()
   } catch (error) {
      console.log(error)
   }
}

export default async function EditTopicPage({ params,
}: {
   params: { id: string }
}) {

   const session = await auth()
   if (!session) {
      redirect('/login')
   }
   const { id } = await params;
   const { topic } = await getTopciById(id);
   const { title, description } = topic;
   return <EditTopicForm id={id} title={title} description={description} />
}
