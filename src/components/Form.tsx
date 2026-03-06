import { useState } from "react";

type FormProps = {
  addTodo: (title: string, deadline: Date) => void;
};

export default function Form({ addTodo }: FormProps) {
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
      <input
        type="text"
        placeholder="Write your next task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="datetime-local"
        value={deadlineValue}
        onChange={(e) => setDeadlineValue(e.target.value)}
        className="border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        Add
      </button>
    </form>
  );
}
