import type {
  TodoTask,
  ToggleProps,
  DeleteProps,
  EditProps,
} from "../../types";
import DatePicker from "react-datepicker";
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
  const [draftDeadline, setDraftDeadline] = useState<Date | null>(
    todo.deadline,
  );

  const handleTitleSave = () => {
    if (draftTitle.trim()) {
      editTodo(todo.id, draftTitle, todo.deadline);
    }
    setIsEditingTitle(false);
  };

  const handleDeadlineSave = () => {
    if (draftDeadline) {
      editTodo(todo.id, todo.title, draftDeadline);
    }
    setIsEditingDeadline(false);
  };

  const handleDeadlineCancel = () => {
    setDraftDeadline(todo.deadline);
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
              <div className="mt-2 flex flex-col gap-2">
                <DatePicker
                  selected={draftDeadline}
                  onChange={(date: Date | null) => setDraftDeadline(date)}
                  showTimeSelect
                  timeIntervals={15}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  wrapperClassName="w-full"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={handleDeadlineSave}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDeadlineCancel}
                    className="bg-slate-200 text-slate-700 px-3 py-2 rounded-lg hover:bg-slate-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
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
