import { useState } from "react";
import { createFileRoute, useRouter } from "@tanstack/react-router";

import { TodoItem } from "@/features/todos/todo-item";
import {
  createTodo,
  deleteStoredTodos,
  deleteTodo,
  getStoredTodos,
  updateTodo,
} from "@/features/todos/storage";
import { RenderTimeStamp } from "@/lib/helper";

export const Route = createFileRoute("/todos")({
  component: RouteComponent,
  loader: async () => {
    // await delay(2000);
    return getStoredTodos();
  },
  ssr: false,
  pendingComponent: () => <p>Loading...</p>,
  staleTime: 0,
  preloadStaleTime: 30_000,
});

function RouteComponent() {
  const todos = Route.useLoaderData();
  const router = useRouter();
  const [newTodo, setNewTodo] = useState("");

  return (
    <center>
      <RenderTimeStamp />
      <h1 className="text-xl font-semibold pb-8">List of Todos</h1>
      {/* <p>Select a todo</p> */}
      <div className="space-x-4 p-8">
        <input
          type="text"
          name="title"
          id="title"
          className="border rounded-sm border-gray-400"
          value={newTodo}
          onChange={(e) => setNewTodo(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (!newTodo) return;
            if (e.key !== "Enter") return;
            createTodo(newTodo);
            setNewTodo("");
            router.invalidate();
          }}
        />
        <button
          className="hover:underline cursor-pointer"
          onClick={() => {
            if (!newTodo) return;
            createTodo(newTodo);
            setNewTodo("");
            router.invalidate();
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => {
          return (
            <TodoItem
              todo={todo}
              handleUpdateTodo={updateTodo}
              handleDeleteTodo={deleteTodo}
              key={todo.id}
            />
          );
        })}
      </ul>
      {todos.length > 0 && (
        <button
          className="hover:underline my-8 cursor-pointer"
          onClick={() => {
            deleteStoredTodos();
            router.invalidate();
          }}
        >
          Delete all todos
        </button>
      )}
    </center>
  );
}
