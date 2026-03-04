import type { todoItem } from "../types";

function Item({ todo }: { todo: todoItem }) {
  return <li>{todo.title}</li>;
}

export default function DisplayList({ todos }: { todos: todoItem[] }) {
  if (todos.length === 0) {
    return <p>Nothing to do yet !</p>;
  } else {
    return todos.map((todo) => <Item key={todo.id} todo={todo} />);
  }
}
