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
      <div className="mt-6 rounded-2xl border border-dashed border-slate-300/90 bg-white/50 p-8 text-center text-slate-500">
        <p className="text-base font-medium">Nothing to do yet.</p>
        <p className="mt-1 text-sm">Add a task and build momentum.</p>
      </div>
    );
  }
  const totalTodos = todos.length;
  const completed = todos.filter((todo) => todo.completed);
  const completedTodos = completed.length;

  return (
    <div>
      <div className="mb-5 rounded-2xl border border-white/70 bg-white/65 p-3 text-center shadow-sm sm:mb-6">
        <h2 className="text-sm font-semibold tracking-wide text-slate-600">
          {completedTodos}/{totalTodos} completed
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
