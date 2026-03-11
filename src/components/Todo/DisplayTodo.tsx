import type {
  TodoItem,
  ToggleProps,
  DeleteProps,
  EditProps,
} from "../../types";
import TodoItems from "./TodoItem";

export default function DisplayTodo({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}: {
  todos: TodoItem[];
  toggleTodo: ToggleProps;
  deleteTodo: DeleteProps;
  editTodo: EditProps;
}) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-slate-500 mt-6">Nothing to do yet!</p>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItems
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}
