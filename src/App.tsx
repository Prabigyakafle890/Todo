import { useEffect, useState } from "react";
import { Header } from "./components/ui/Header";
import AddTodoForm from "./components/todo/AddTodoForm";
import DisplayTodos from "./components/todo/DisplayTodos";
import DisplayTime from "./components/todo/DisplayTime";
import FilterTodo from "./components/todo/FilterTodo";
import type { TodoTask } from "./types";
import { getTodos, saveTodos } from "./utils/storage";

function getRand() {
  return new Date().getTime().toString() + Math.floor(Math.random() * 1000000);
}
function App() {
  const [todos, setTodos] = useState<TodoTask[]>(() => getTodos());
  const [filterRange, setFilterRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);

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

  const filteredTodo = (startDate: Date, endDate: Date) => {
    setFilterRange({ start: startDate, end: endDate });
  };

  let todosToDisplay;
  if (filterRange) {
    todosToDisplay = todos.filter((todo) => {
      const start = new Date(filterRange.start);
      start.setHours(0, 0, 0, 0);
      const end = new Date(filterRange.end);
      end.setHours(23, 59, 59, 999);
      return todo.deadline >= start && todo.deadline <= end;
    });
  } else {
    todosToDisplay = todos;
  }

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center py-10">
      <div className="w-full max-w-xl px-4">
        <Header />
        <DisplayTime />
        <AddTodoForm addTodo={addTodo} />
        <FilterTodo filteredTodo={filteredTodo} />
        <DisplayTodos
          todos={todosToDisplay}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      </div>
    </div>
  );
}

export default App;
