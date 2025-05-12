'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();

  const [todo, setTodo] = React.useState<any>(null);

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`)
      .then((res) => res.json())
      .then(setTodo);
  }, [params.id]);

  if (!todo) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl relative">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex items-center gap-1 text-md font-bold text-blue-600 hover:underline transition duration-200"
        >
          <ChevronLeftIcon className="w-7 h-7" />
          Back
        </button>

        <div className="mt-5">
          <h1 className="text-3xl font-bold mb-6">{todo.title}</h1>

          <div className="space-y-4 text-gray-700 text-lg">
            <p><span className="font-semibold">ID:</span> {todo.id}</p>
            <p><span className="font-semibold">User ID:</span> {todo.userId}</p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className={todo.completed ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {todo.completed ? "✅ Completed" : "❌ Not Completed"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
