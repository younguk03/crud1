import { useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi2'

export default function RemoveBtn({ id }: { id: string }) {
   const router = useRouter()

   async function removeTopic() {
      const confirmed = confirm(`${id} - 이 토픽을 지울까요?`) //알림창이 뜸
      if (confirmed) {
         const res = await fetch(`/api/topics?id=${id}`, {
            method: 'DELETE'
         })
         if (res.ok) {
            router.push('./')
            router.refresh()
         }

      }
   }
   return (
      <button className='text-red-500' onClick={removeTopic}>
         <HiOutlineTrash size={24} />
      </button>
   )
}
