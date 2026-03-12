import type { TodoTask } from "../types";

const STORAGE_KEY = "todos";

export function saveTodos(todos: TodoTask[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function getTodos(): TodoTask[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }
  return JSON.parse(stored, (key, value) => {
    if (key === "addedAt" || key === "deadline") {
      return new Date(value);
    }
    return value;
  });
}
