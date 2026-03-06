import { useEffect, useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import type { TodoItem } from "./types";
import { getTodos, saveTodos } from "./utils/storage";
import DisplayTime from "./components/DisplayTime";
import DisplayList from "./components/DisplayList";

function getRand() {
  return new Date().getTime().toString() + Math.floor(Math.random() * 1000000);
}
function App() {
  const [todos, setTodos] = useState<TodoItem[]>(() => getTodos());

  const addTodo = (title: string) => {
    setTodos([
      ...todos,
      { id: getRand(), title, completed: false, addedAt: new Date() },
    ]);
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-10">
      <div className="w-full max-w-xl px-4">
        <Header />
        <DisplayTime />
        <Form addTodo={addTodo} />
        <DisplayList
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
}

export default App;
