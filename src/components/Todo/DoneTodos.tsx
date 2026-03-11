import type { TodoItem } from "../../types";

export default function CompletedTodos({ todos }: { todos: TodoItem[] }) {
  const total_todos = todos.length;
  const completed = todos.filter((todo) => todo.completed);
  const completed_todos = completed.length;

  return (
    <div className="text-center mb-6">
      <h2 className="text-lg text-slate-600 font-medium">
        {completed_todos}/ {total_todos} completed
      </h2>
    </div>
  );
}
