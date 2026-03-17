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
    <li className="flex items-start justify-between gap-4 rounded-2xl border border-white/80 bg-white/75 p-4 shadow-sm backdrop-blur-sm transition hover:shadow-md">
      <div className="flex min-w-0 items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-400"
        />

        <div className="min-w-0">
          {isEditingTitle ? (
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleTitleSave();
                if (e.key === "Escape") setIsEditingTitle(false);
              }}
            />
          ) : (
            <p
              onDoubleClick={() => setIsEditingTitle(true)}
              className={
                todo.completed
                  ? "cursor-pointer text-base text-slate-400 line-through"
                  : "cursor-pointer text-base font-medium text-slate-800"
              }
            >
              {todo.title}
            </p>
          )}

          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-400">
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
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm transition focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
                  wrapperClassName="w-full"
                />
                <div className="flex gap-2">
                  <Button type="button" onClick={handleDeadlineSave}>
                    Save
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDeadlineCancel}
                    className="bg-slate-200 text-slate-700 hover:bg-slate-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p
                className="mt-1 cursor-pointer text-sm text-slate-600"
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
        className="shrink-0 bg-transparent px-2 py-1 text-sm font-semibold text-rose-600 shadow-none hover:bg-rose-50 hover:text-rose-700"
      >
        Delete
      </Button>
    </li>
  );
}
