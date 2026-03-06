export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  addedAt: Date;
  deadline: Date;
};
export type ToggleProps = (id: string) => void;
export type DeleteProps = (id: string) => void;
