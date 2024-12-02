<<<<<<< HEAD
import { auth } from '@/auth'
=======
import { getTopic } from '@/action/topicActions'
>>>>>>> a7e50e1e7df88c03e02e57bfe6331ba951dd003c
import EditTopicForm from '@/components/EditTopicForm'
import { redirect } from 'next/navigation'
import React from 'react'
//use client가 없으니까 auth를 쓰면 됨

export default async function EditTopicPage({ params,
}: {
   params: { id: string }
}) {
<<<<<<< HEAD

   const session = await auth()
   if (!session) {
      redirect('/login')
   }
   const { id } = await params;
   const { topic } = await getTopciById(id);
   const { title, description } = topic;
   return <EditTopicForm id={id} title={title} description={description} />
=======
   const { topic } = await getTopic(params.id)
   return (
      <div className="max-w-3xl mx-auto mt-8">
         <h1 className="text-2xl font-bold mb-4">토픽 수정</h1>
         <EditTopicForm
            id={topic._id}
            title={topic.title}
            description={topic.description}
         />
      </div>
   )
>>>>>>> a7e50e1e7df88c03e02e57bfe6331ba951dd003c
}
