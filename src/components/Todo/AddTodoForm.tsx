import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

type FormProps = {
  addTodo: (title: string, deadline: Date) => void;
};

export default function AddTodoForm({ addTodo }: FormProps) {
  const [inputValue, setInputValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim(), new Date(deadlineValue));
      setInputValue("");
      setDeadlineValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <Input
        type="text"
        placeholder="Write your next task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Input
        type="datetime-local"
        value={deadlineValue}
        onChange={(e) => setDeadlineValue(e.target.value)}
      />

      <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 space-y-6">
        Add
      </Button>
    </form>
  );
}
