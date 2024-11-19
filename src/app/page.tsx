import { getAllTopics } from "@/action/topicActions";
import TopicsList from "@/components/TopicsList";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'WebDev Topics | MongoDB CRUD Example',
  description: 'A simple CRUD application susing Next.js and MongoDB'
}

export default async function Home() {
  const { topics } = await getAllTopics()
  return (
    <main className="containter mx-auto p-4">
      <h1 className="text-3xl font-bold">WebDev Topics</h1>
      <p className="mb-4">MongoDB CRUD Example</p>
      <Suspense fallback={<div>로딩 중...</div>}>
        <TopicsList topics={topics} />
      </Suspense>
    </main>
  );
}
