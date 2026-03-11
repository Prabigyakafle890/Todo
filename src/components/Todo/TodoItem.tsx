import type {
  TodoItem,
  ToggleProps,
  DeleteProps,
  EditProps,
} from "../../types";
import { Button } from "../ui/Button";
import { useState } from "react";
import EditTodo from "./EditTodo";

export default function TodoItems({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
}: {
  todo: TodoItem;
  toggleTodo: ToggleProps;
  deleteTodo: DeleteProps;
  editTodo: EditProps;
}) {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <EditTodo
        todo={todo}
        onSave={(title: string, deadline: Date) => {
          editTodo(todo.id, title, deadline);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

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
        onClick={() => setIsEditing(true)}
        className="text-green-500 hover:text-green-700"
      >
        Edit
      </Button>

      <Button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </Button>
    </li>
  );
}
