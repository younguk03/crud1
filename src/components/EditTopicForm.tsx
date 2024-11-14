'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EditTopicFormProps {
   id: string
   title: string
   description: string
}
// , setNewTitle
export default function EditTopicForm({
   id,
   title,
   description,
}: EditTopicFormProps) {
   const [newTitle] = useState(title); //useState는 컴포넌트의 상태를 간편하게 생성하고 업데이트 해주는 도구를 제공해준다.
   const [newDescription, setNewDescription] = useState(description);
   const router = useRouter();
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
         const res = await fetch(`/api/topics/${id}`, {
            method: 'PUT',
            headers: {
               'Content-type': 'application/json',
            },
            body: JSON.stringify({ newTitle, newDescription }),
         })
         if (!res.ok) {
            throw new Error('Failed to update topic')
         }
         router.push('/');
         router.refresh();
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
         <input type="text" className='border border-slate-500 p-4' placeholder='TopicList'
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewDescription(e.target.value)}
            value={newTitle} />
         <textarea className='border border-slate-500 p-4' placeholder='TopicList'
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewDescription(e.target.value)}
            value={newDescription} />
         <button className='bg-blue-800 text-white font-bold px-6 py-3 w-fit rounded-md'
            type='submit'>
            Edit Topic
         </button>
      </form>
   )
}
