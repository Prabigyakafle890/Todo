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
    <form
      onSubmit={handleSubmit}
      className="mb-7 grid gap-3 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm sm:mb-8 sm:grid-cols-[1.3fr_1fr_auto_auto]"
    >
      <div>
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
          <p className="mt-1 text-sm text-rose-600">{errors.title}</p>
        ) : null}
        <p className="mt-1 text-xs font-medium text-slate-500">
          {inputValue.length}/{MAX_LENGTH}
        </p>
      </div>
      <div>
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
          className="w-full rounded-xl border border-slate-200 bg-white/85 px-4 py-3 text-slate-800 shadow-sm transition placeholder:text-slate-400 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-200"
        />
        {errors.deadline ? (
          <p className="mt-1 text-sm text-rose-600">{errors.deadline}</p>
        ) : null}
      </div>
      <div className="self-start sm:self-center">{filterControl}</div>
      <Button className="w-full bg-linear-to-r from-teal-700 to-teal-600 px-6 sm:w-auto">
        Add
      </Button>
    </form>
  );
}
