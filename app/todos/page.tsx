import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();
  
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-8">
      <main className="w-full max-w-2xl">
        <div className="flex justify-center">
          <Image
            src="/clipboard.png"
            alt="Clipboard icon"
            width={350}
            height={350}
          />
        </div>
        <h1 className="text-3xl font-bold mt-8 mb-4 text-center">To-Do-List</h1>
        <ul className="space-y-3">
          {todos.map((todo: { id: number; title: string; completed: boolean }) => (
            <li key={todo.id} className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="mt-1"
              />
              <Link href={`/todos/${todo.id}`} className="text-blue-500 hover:underline">
                {todo.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}