import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createClientOnlyFn } from "@tanstack/react-start";
import { useState } from "react";

type Todo = {
  id: string;
  title: string;
};

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

const getStoredTodos = createClientOnlyFn((): Array<Todo> => {
  const rawTodosStr = localStorage.getItem("todos");
  if (rawTodosStr) {
    const todos = JSON.parse(rawTodosStr);
    return todos;
  } else {
    return [];
  }
});

const updateTodo = createClientOnlyFn((newTitle: string, id: string) => {
  const rawTodosStr = localStorage.getItem("todos");
  if (!rawTodosStr) return;

  const todos = JSON.parse(rawTodosStr) as Array<Todo>;
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, title: newTitle };
    } else {
      return todo;
    }
  });

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
});

const deleteTodo = createClientOnlyFn((id: string) => {
  const rawTodosStr = localStorage.getItem("todos");
  if (!rawTodosStr) return;

  const todos = JSON.parse(rawTodosStr) as Array<Todo>;
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
});

const deleteStoredTodos = createClientOnlyFn(() => {
  localStorage.removeItem("todos");
});

export const Route = createFileRoute("/todos")({
  component: RouteComponent,
  loader: () => {
    return getStoredTodos();
  },
  ssr: false,
});

function RouteComponent() {
  var todos = Route.useLoaderData();
  const router = useRouter();
  const [todo, setTodo] = useState("");

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
            router.invalidate();
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
            if (e.key !== "Enter") return;
            createTodo(todo);
            setTodo("");
            router.invalidate();
          }}
        />
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
            // setTodos([]);
            router.invalidate();
          }}
        >
          Delete all todos
        </button>
      )}
    </center>
  );
}

function TodoItem({
  todo,
  handleUpdateTodo,
  handleDeleteTodo,
}: {
  todo: Todo;
  handleUpdateTodo: (newTitle: string, id: string) => void;
  handleDeleteTodo: (id: string) => void;
}) {
  const [todoTitle, setTodoTitle] = useState(todo.title);
  // const [isChanged, setIsChanged] = useState(false);

  const router = useRouter();

  // if (todoTitle !== todo.title) setIsChanged(true);

  return (
    <li className="p-2">
      <input value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} />
      <button
        onClick={() => {
          handleUpdateTodo(todoTitle, todo.id);
          router.invalidate();
        }}
        className="hover:underline cursor-pointer"
      >
        Save
      </button>
      <button
        className="ml-4 cursor-pointer"
        onClick={() => {
          handleDeleteTodo(todo.id);
          router.invalidate();
        }}
      >
        {" x "}
      </button>
    </li>
  );
}
