import type { TodoItem, ToggleProps, DeleteProps } from "../types";
import { Button } from "../ui/Button";

export default function TodoItems({
  todo,
  toggleTodo,
  deleteTodo,
}: {
  todo: TodoItem;
  toggleTodo: ToggleProps;
  deleteTodo: DeleteProps;
}) {
  return (
    <li className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mt-1"
        />

        <div>
          <p
            className={
              todo.completed ? "line-through text-gray-400" : "text-slate-800"
            }
          >
            {todo.title}
          </p>

          <p className="text-sm text-slate-500">
            {todo.addedAt.toLocaleString()}
          </p>

          <p className="text-sm text-slate-500">
            Due:{" "}
            {todo.deadline ? todo.deadline.toLocaleString() : "No deadline"}
          </p>
        </div>
      </div>

      <Button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </Button>
    </li>
  );
}
