import { useState } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import type { todoItem } from "./types";
function App() {
  const [todos, setTodos] = useState<todoItem[]>([]);

  const addTodo = (title: string) => {
    setTodos([...todos, { id: crypto.randomUUID(), title }]);
  };

  return (
    <>
      <Header />
      <Form addTodo={addTodo} />
    </>
  );
}

export default App;
