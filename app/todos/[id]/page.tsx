'use client';

import * as React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useParams } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const [details, setDetails] = React.useState<any>(null);

  React.useEffect(() => {
    loadData();
  }, [params?.id]);

  const loadData = async () => {
    const {id} = params;
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const data = await res.json();
    setDetails(data);
    console.log(data);
  };

  if (!details) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold mb-6">{details.title}</h1>

          <div className="space-y-4 text-gray-700 text-lg">
            <p><span className="font-semibold">ID:</span> {details.id}</p>
            <p><span className="font-semibold">User ID:</span> {details.userId}</p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span className={details.completed ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                {details.completed ? "✅ Completed" : "❌ Not Completed"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
