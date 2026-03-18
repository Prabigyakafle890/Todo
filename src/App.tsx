import { useEffect, useState } from "react";
import { Header } from "./components/ui/Header";
import AddTodoForm from "./components/Todo/AddTodoForm";
import DisplayTodos from "./components/Todo/DisplayTodos";
import DisplayTime from "./components/Todo/DisplayTime";
import FilterTodo from "./components/Todo/FilterTodo";
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
  const [searchTerm, setSearchTerm] = useState("");

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

  const clearDeadlineFilter = () => {
    setFilterRange(null);
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

  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  if (normalizedSearchTerm) {
    todosToDisplay = todosToDisplay.filter((todo) =>
      todo.title.toLowerCase().includes(normalizedSearchTerm),
    );
  }

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 sm:py-12">
      <div className="absolute -left-17.5 -top-20 h-52 w-52 rounded-full bg-orange-200/45 blur-3xl" />
      <div className="absolute -bottom-22.5 -right-15 h-64 w-64 rounded-full bg-teal-200/50 blur-3xl" />
      <div className="relative mx-auto w-full max-w-3xl rounded-3xl border border-white/70 bg-white/55 p-5 shadow-[0_20px_70px_rgba(15,23,42,0.15)] backdrop-blur-xl sm:p-8">
        <Header />
        <DisplayTime />
        <AddTodoForm
          addTodo={addTodo}
          filterControl={
            <FilterTodo
              filteredTodo={filteredTodo}
              clearDeadlineFilter={clearDeadlineFilter}
              onTitleSearchChange={setSearchTerm}
            />
          }
        />
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
