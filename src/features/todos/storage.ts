import { createClientOnlyFn } from "@tanstack/react-start";
import type { Todo } from "./types";
import { delay } from "@/lib/helper";

export const createTodo = createClientOnlyFn((title: string) => {
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

export const getStoredTodos = createClientOnlyFn(
  async (): Promise<Array<Todo>> => {
    await delay(5000);
    const rawTodosStr = localStorage.getItem("todos");
    if (rawTodosStr) {
      const todos = JSON.parse(rawTodosStr);
      return todos;
    } else {
      return [];
    }
  },
);

export const updateTodo = createClientOnlyFn((newTitle: string, id: string) => {
  const rawTodosStr = localStorage.getItem("todos");
  if (!rawTodosStr) return;

  const todos: Array<Todo> = JSON.parse(rawTodosStr);
  const updatedTodos = todos.map((todo) => {
    if (todo.id === id) {
      return { ...todo, title: newTitle };
    } else {
      return todo;
    }
  });

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
});

export const deleteTodo = createClientOnlyFn((id: string) => {
  const rawTodosStr = localStorage.getItem("todos");
  if (!rawTodosStr) return;

  const todos = JSON.parse(rawTodosStr) as Array<Todo>;
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
});

export const deleteStoredTodos = createClientOnlyFn(() => {
  localStorage.removeItem("todos");
});
