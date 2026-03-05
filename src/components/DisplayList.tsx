import type { TodoItem } from "../types";

function Item({ todo }: { todo: TodoItem }) {
  return <li>{todo.title}</li>;
}

export default function DisplayList({ todos }: { todos: TodoItem[] }) {
  if (todos.length === 0) {
    return <p>Nothing to do yet !</p>;
  } else {
    return todos.map((todo) => <Item key={todo.id} todo={todo} />);
  }
}
