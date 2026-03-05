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
    setTodos([...todos, { id: getRand(), title, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((t) => t.id !== id));
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <>
      <Header />
      <DisplayTime />
      <Form addTodo={addTodo} />
      <DisplayList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </>
  );
}

export default App;
