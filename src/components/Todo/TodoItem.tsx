import type {
  TodoTask,
  ToggleProps,
  DeleteProps,
  EditProps,
} from "../../types";
import { Button } from "../ui/Button";
import { useState } from "react";

export default function TodoItem({
  todo,
  toggleTodo,
  deleteTodo,
  editTodo,
}: {
  todo: TodoTask;
  toggleTodo: ToggleProps;
  deleteTodo: DeleteProps;
  editTodo: EditProps;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [draftDeadline, setDraftDeadline] = useState(
    todo.deadline.toLocaleString(),
  );

  const handleSave = () => {
    if (draftTitle.trim()) {
      editTodo(todo.id, draftTitle, todo.deadline);
    }
    if (draftDeadline) {
      editTodo(todo.id, todo.title, todo.deadline);
    }
    setIsEditing(false);
  };

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
          {isEditing ? (
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onBlur={() => handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") setIsEditing(false);
              }}
            />
          ) : (
            <p
              onDoubleClick={() => setIsEditing(true)}
              className={
                todo.completed ? "line-through text-gray-400" : "text-slate-800"
              }
            >
              {todo.title}
            </p>
          )}

          <p className="text-sm text-slate-500">
            {todo.addedAt.toLocaleString()}
          </p>
          <div>
            {isEditing ? (
              <input
                type="datetime-local"
                value={draftDeadline}
                onChange={(e) => setDraftDeadline(e.target.value)}
                onBlur={() => handleSave}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") setIsEditing(false);
                }}
              />
            ) : (
              <p
                className="text-sm text-slate-500"
                onDoubleClick={() => setIsEditing(true)}
              >
                Due:{" "}
                {todo.deadline ? todo.deadline.toLocaleString() : "No deadline"}
              </p>
            )}
          </div>
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
