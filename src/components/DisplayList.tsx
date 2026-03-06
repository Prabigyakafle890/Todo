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
    <li className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mt-1"
        />

        <div>
          <p
            className={
              todo.completed ? "line-through text-gray-400" : "text-slate-800"
            }
          >
            {todo.title}
          </p>

          <p className="text-sm text-slate-500">
            {todo.addedAt.toLocaleString()}
          </p>
        </div>
      </div>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
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
    return (
      <p className="text-center text-slate-500 mt-6">Nothing to do yet!</p>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <Item
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  );
}
