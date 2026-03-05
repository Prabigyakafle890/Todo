import type { TodoItem, ToggleProps, DeleteProps } from "../types";

function Item({
  todo,
  toggleTodo,
  deleteTodo,
}: {
  todo: TodoItem;
  toggleTodo: ToggleProps;
  deleteTodo: DeleteProps;
}) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {todo.title}
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  );
}

export default function DisplayList({
  todos,
  toggleTodo,
  deleteTodo,
}: {
  todos: TodoItem[];
  toggleTodo: ToggleProps;
  deleteTodo: DeleteProps;
}) {
  if (todos.length === 0) {
    return <p>Nothing to do yet !</p>;
  } else {
    return todos.map((todo) => (
      <Item
        key={todo.id}
        todo={todo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    ));
  }
}
