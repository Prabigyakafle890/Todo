import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import type { TodoItem } from "../../types";

type EditFormProps = {
  todo: TodoItem;
  onSave: (title: string, deadline: Date) => void;
  onCancel: () => void;
};

export default function EditTodo({ todo, onSave, onCancel }: EditFormProps) {
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDeadline, setEditedDeadline] = useState(todo.deadline);

  const handleEdit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editedTitle.trim()) {
      onSave(editedTitle.trim(), editedDeadline);
    }
  };

  return (
    <form
      onSubmit={handleEdit}
      className="mt-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm"
    >
      <div
        className="flex flex-col gap-3 rounded-xl bg-slate-50 p-4;
	}"
      >
        <Input
          type="text"
          placeholder="Edit your task"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />

        <Input
          type="datetime-local"
          value={editedDeadline.toISOString()}
          onChange={(e) => setEditedDeadline(new Date(e.target.value))}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-3;">
        <Button className="rounded-lg bg-emerald-600 px-6 py-3 text-white transition hover:bg-emerald-700">
          Save
        </Button>
        <Button
          type="button"
          onClick={onCancel}
          className="rounded-lg bg-slate-600 px-6 py-3 text-white transition hover:bg-slate-700"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
