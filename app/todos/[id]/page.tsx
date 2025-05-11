import * as React from "react";

function generateStaticParams() {}
 
export default async function Page({params}: {params: {id: string}}) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  const todos = await res.json();

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Detail</h1>
      <p><strong>ID:</strong> {todos.id}</p>
      <p><strong>Title:</strong> {todos.title}</p>
      <p><strong>Status:</strong> {todos.completed ? "✅ Completed" : "❌ Not Completed"}</p>
    </div>
  );
}