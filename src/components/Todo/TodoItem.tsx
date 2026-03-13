import type {
  TodoTask,
  ToggleProps,
  DeleteProps,
  EditProps,
} from "../../types";
import { Button } from "../ui";
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
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDeadline, setIsEditingDeadline] = useState(false);
  const [draftTitle, setDraftTitle] = useState(todo.title);
  const [draftDeadline, setDraftDeadline] = useState(
    todo.deadline.toLocaleString(),
  );

  const handleTitleSave = () => {
    if (draftTitle.trim()) {
      editTodo(todo.id, draftTitle, todo.deadline);
    }
    setIsEditingTitle(false);
  };

  const handleDeadlineSave = () => {
    if (draftDeadline) {
      editTodo(todo.id, todo.title, todo.deadline);
    }
    setIsEditingDeadline(false);
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
          {isEditingTitle ? (
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onBlur={() => handleTitleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTitleSave();
                if (e.key === "Escape") setIsEditingTitle(false);
              }}
            />
          ) : (
            <p
              onDoubleClick={() => setIsEditingTitle(true)}
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
            {isEditingDeadline ? (
              <input
                type="datetime-local"
                value={draftDeadline}
                onChange={(e) => setDraftDeadline(e.target.value)}
                onBlur={() => handleDeadlineSave()}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleDeadlineSave();
                  if (e.key === "Escape") setIsEditingDeadline(false);
                }}
              />
            ) : (
              <p
                className="text-sm text-slate-500"
                onDoubleClick={() => setIsEditingDeadline(true)}
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
