import { useEffect, useState } from "react";
import { Header } from "./components/ui/Header";
import AddTodoForm from "./components/todo/AddTodoForm";
import DisplayTodos from "./components/todo/DisplayTodos";
import DisplayTime from "./components/todo/DisplayTime";
import type { TodoTask } from "./types";
import { getTodos, saveTodos } from "./utils/storage";

function getRand() {
  return new Date().getTime().toString() + Math.floor(Math.random() * 1000000);
}
function App() {
  const [todos, setTodos] = useState<TodoTask[]>(() => getTodos());
  const addTodo = (title: string, deadline: Date) => {
    setTodos([
      ...todos,
      {
        id: getRand(),
        title,
        completed: false,
        addedAt: new Date(),
        deadline,
      },
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

  const editTodo = (id: string, title: string, deadline: Date) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title, deadline };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-10">
      <div className="w-full max-w-xl px-4">
        <Header />
        <DisplayTime />
        <AddTodoForm addTodo={addTodo} />
        <DisplayTodos
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
