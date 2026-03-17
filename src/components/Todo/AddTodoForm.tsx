import { useState, type ReactNode } from "react";
import DatePicker from "react-datepicker";
import { Button, Input } from "../ui";

type FormProps = {
  addTodo: (title: string, deadline: Date) => void;
  filterControl?: ReactNode;
};

type FormErrors = {
  title?: string;
  deadline?: string;
};

export default function AddTodoForm({ addTodo, filterControl }: FormProps) {
  const [inputValue, setInputValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState<Date | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const MAX_LENGTH = 100;

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newErrors: FormErrors = {};
    if (!inputValue.trim()) {
      newErrors.title = "Title is required.";
    }
    if (inputValue.trim().length > MAX_LENGTH) {
      newErrors.title = "Title cannot exceed 100 characters.";
    }

    if (!deadlineValue) {
      newErrors.deadline = "Deadline is required";
    }
    if (deadlineValue && deadlineValue < new Date()) {
      newErrors.deadline = "Deadline cannot be in the past.";
    }

    setErrors(newErrors);

    if (
      inputValue.trim() &&
      deadlineValue &&
      !newErrors.title &&
      !newErrors.deadline
    ) {
      addTodo(inputValue.trim(), deadlineValue);
      setInputValue("");
      setDeadlineValue(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Write your next task"
          value={inputValue}
          maxLength={MAX_LENGTH}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={() => {
            if (errors.title) {
              setErrors((prev) => ({ ...prev, title: undefined }));
            }
          }}
        />
        {errors.title ? (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        ) : null}
        <p className="text-sm mt-1 text-gray-500">
          {inputValue.length}/{MAX_LENGTH}
        </p>
      </div>
      <div className="flex-1">
        <DatePicker
          selected={deadlineValue}
          onChange={(date: Date | null) => setDeadlineValue(date)}
          onCalendarClose={() => {
            if (errors.deadline) {
              setErrors((prev) => ({ ...prev, deadline: undefined }));
            }
          }}
          showTimeSelect
          timeIntervals={15}
          minDate={new Date()}
          dateFormat="MMMM d, yyyy h:mm aa"
          placeholderText="Pick a deadline"
          className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.deadline ? (
          <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
        ) : null}
      </div>
      <div>{filterControl}</div>
      <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 space-y-6">
        Add
      </Button>
    </form>
  );
}
