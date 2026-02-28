import { createFileRoute } from "@tanstack/react-router";
import { createClientOnlyFn } from "@tanstack/react-start";
import { useState } from "react";

type Todo = {
  id: string;
  title: string;
};

const deleteStoredTodos = createClientOnlyFn(() => {
  localStorage.removeItem("todos");
});

const getStoredTodos = createClientOnlyFn(() => {
  console.log({ getStoredTodos });
  const rawTodosStr = localStorage.getItem("todos");
  if (rawTodosStr) {
    const todos = JSON.parse(rawTodosStr);
    return todos;
  }
});

const storeTodos = createClientOnlyFn((todos: Array<Todo>) => {
  localStorage.setItem("todos", JSON.stringify(todos));
});

const createTodo = createClientOnlyFn((title) => {
  const rawTodosStr = localStorage.getItem("todos");
  if (!rawTodosStr) {
    localStorage.setItem(
      "todos",
      JSON.stringify([{ title, id: crypto.randomUUID() }]),
    );
    return;
  }
  const todos = JSON.parse(rawTodosStr);
  todos.push({ title, id: crypto.randomUUID() });
  localStorage.setItem("todos", JSON.stringify(todos));
});

export const Route = createFileRoute("/todos")({
  component: RouteComponent,
  loader: () => {
    return getStoredTodos();
  },
  ssr: false,
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  const [todos, setTodos] = useState(
    Array.isArray(loaderData) ? loaderData : [],
  );
  const [todo, setTodo] = useState("");

  // useEffect(() => {
  //   storeTodos(todos);
  // }, [todos]);

  return (
    <center>
      <h1 className="text-xl font-semibold pb-8">List of Todos</h1>
      {/* <p>Select a todo</p> */}
      <div className="space-x-4 p-8">
        <button
          className="hover:underline cursor-pointer"
          onClick={() => {
            if (!todo) return;
            createTodo(todo);
            setTodo("");
            setTodos(() => {
              return getStoredTodos();
            });
          }}
        >
          Add
        </button>
        <input
          type="text"
          name="title"
          id="title"
          className="border rounded-sm border-gray-400"
          value={todo}
          onChange={(e) => setTodo(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (!todo) return;
            if (e.key === "Enter") {
              createTodo(todo);
              setTodo("");
              setTodos(() => {
                return getStoredTodos();
              });
            }
          }}
        />
      </div>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="italic">
              <span> - </span>
              <span>{todo.title}</span>
            </li>
          );
        })}
      </ul>
      {todos.length > 0 && (
        <button
          className="hover:underline py-8 cursor-pointer"
          onClick={() => {
            deleteStoredTodos();
            setTodos([]);
          }}
        >
          Delete all todos
        </button>
      )}
    </center>
  );
}
