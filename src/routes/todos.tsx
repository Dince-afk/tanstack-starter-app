import { createFileRoute } from "@tanstack/react-router";
import { createClientOnlyFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";

type Todo = {
  title: string;
};

const getTodos = createClientOnlyFn(() => {
  const rawTodosStr = localStorage.getItem("todos");
  if (rawTodosStr) {
    const todos = JSON.parse(rawTodosStr);
    return todos;
  }
  localStorage.setItem(
    "todos",
    JSON.stringify([{ title: "Go shopping", id: crypto.randomUUID() }]),
  );
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
    return getTodos();
  },
  ssr: false,
});

function RouteComponent() {
  const loaderData = Route.useLoaderData();
  const [todos, setTodos] = useState(
    Array.isArray(loaderData) ? loaderData : [],
  );
  const [todo, setTodo] = useState("");

  useEffect(() => {
    setTodos(getTodos());
  }, []);
  //   const todos = Route.useLoaderData();

  return (
    <center>
      <h1>List of todos</h1>
      {/* <p>Select a todo</p> */}
      <div>
        <input
          type="text"
          name="title"
          id="title"
          value={todo}
          onChange={(e) => setTodo(e.currentTarget.value)}
        />
        <button
          onClick={() => {
            createTodo(todo);
            setTodo("");
            setTodos(() => {
              return getTodos();
            });
          }}
        >
          Add
        </button>
      </div>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>{todo.title}</li>;
        })}
      </ul>
    </center>
  );
}
