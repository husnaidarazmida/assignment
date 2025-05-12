"use client";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<"all" | "completed" | "not_completed">("all");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchTodos = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const todos = await res.json();
      setTodos(todos);
      console.log(todos);
    };
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "not_completed") return !todo.completed;
    return true;
  }).filter((todo) => {
    if (search === "") return true;
    return todo.title.toLowerCase().includes(search.toLowerCase());
  });
  
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-8">
      <main className="w-full max-w-2xl">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 flex items-center gap-1 text-md font-bold text-blue-600 hover:underline transition duration-200"
        >
          <ChevronLeftIcon className="w-7 h-7" />
          Back
        </button>
        
        <h1 className="text-3xl font-bold mt-8 mb-4 flex items-center gap-2">
          <img src="/clipboard.png" alt="Icon" className="w-8 h-8" />
          To-Do-List
        </h1>

        {/* search and filter */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 bg-white text-sm"
            // style={{ display: "flex", flex: 1, border: "1px solid #E5E7EB", borderRadius: "20px", padding: "10px", backgroundColor: "#FFFFFF" }}
          />

          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-300 rounded-full px-4 py-2 bg-white text-sm"
            // style={{ border: "1px solid #E5E7EB", borderRadius: "20px", padding: "10px", backgroundColor: "#FFFFFF" }}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="not_completed">Not Completed</option>
          </select>
        </div>

        {/* content */}
        <ul className="space-y-3">
          {filteredTodos.map((todo: { id: number; title: string; completed: boolean }) => (
            <li key={todo.id}>
              <Link href={`/todos/${todo.id}`} className="text-blue-500 hover:underline">
              {/* <div className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer bg-white"> */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px", borderRadius: "10px", border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    className="mt-1"
                  />
                  <span className="text-gray-800">{todo.title}</span>
                </div>
                </Link>
              </li>
          ))}
        </ul>
      </main>
    </div>
  )
}