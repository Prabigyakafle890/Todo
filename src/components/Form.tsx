import React from "react";
import { useState } from "react";

type FormProps = {
  addTodo: (title: string) => void;
};

export default function Form({ addTodo }: FormProps) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue("");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          placeholder="Write your next task"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
}
