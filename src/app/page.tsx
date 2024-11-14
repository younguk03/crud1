import TopicList from "@/components/TopicList";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">WebDev Topics</h1>
      <p className="mb-4">Mongo CRUD Example</p>
      <TopicList />
    </div>
  );
}
