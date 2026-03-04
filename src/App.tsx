import { useEffect, useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import type { todoItem } from "./types";
import { getTodos, saveTodos } from "./utils/storage";

function getRand() {
  return new Date().getTime().toString() + Math.floor(Math.random() * 1000000);
}
function App() {
  const [todos, setTodos] = useState<todoItem[]>(() => getTodos());

  const addTodo = (title: string) => {
    setTodos([...todos, { id: getRand(), title }]);
  };

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  return (
    <>
      <Header />
      <Form addTodo={addTodo} />
    </>
  );
}

export default App;
