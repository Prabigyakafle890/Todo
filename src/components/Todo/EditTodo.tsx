import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import type { TodoItem } from "../../types";

type EditFormProps = {
  todo: TodoItem;
  onSave: (title: string) => void;
  onCancel: () => void;
};

export default function EditTodo({ todo, onSave, onCancel }: EditFormProps) {
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editedTitle.trim()) {
      onSave(editedTitle.trim());
    }
  };

  return (
    <form onSubmit={handleEdit}>
      <Input
        type="text"
        placeholder="Edit your task"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <Button className="bg-green-600 hover:bg-green-700">Save</Button>
      <Button
        onClick={onCancel}
        className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 ml-2"
      >
        Cancel
      </Button>
    </form>
  );
}
