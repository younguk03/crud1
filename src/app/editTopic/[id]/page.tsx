import { getTopic } from '@/action/topicActions'
import EditTopicForm from '@/components/EditTopicForm'
import React from 'react'


export default async function EditTopicPage({ params,
}: {
   params: { id: string }
}) {
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
}
