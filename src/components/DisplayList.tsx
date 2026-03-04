import type { todoItem } from "../types";

function Item({ todo }: { todo: todoItem }) {
  return <li>{todo.title}</li>;
}

export default function DisplayList({ todos }: { todos: todoItem[] }) {
  return (
    <>
      {todos.length > 0 ? (
        todos.map((todo) => <Item key={todo.id} todo={todo} />)
      ) : (
        <p>Nothing to do yet !</p>
      )}
    </>
  );
}
