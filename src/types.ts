export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
};
export type ToggleProps = (id: string) => void;
export type DeleteProps = (id: string) => void;
