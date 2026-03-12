import type {
  TodoTask,
  ToggleProps,
  DeleteProps,
  EditProps,
} from "../../types";
import TodoItem from "./TodoItem";

export default function DisplayTodos({
  todos,
  toggleTodo,
  deleteTodo,
  editTodo,
}: {
  todos: TodoTask[];
  toggleTodo: ToggleProps;
  deleteTodo: DeleteProps;
  editTodo: EditProps;
}) {
  if (todos.length === 0) {
    return (
      <p className="text-center text-slate-500 mt-6">Nothing to do yet!</p>
    );
  }
  const total_todos = todos.length;
  const completed = todos.filter((todo) => todo.completed);
  const completed_todos = completed.length;

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-lg text-slate-600 font-medium">
          {completed_todos}/ {total_todos} completed
        </h2>
      </div>
      <ul className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}
