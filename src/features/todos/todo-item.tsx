import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import type { Todo } from "./types";

export function TodoItem({
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
