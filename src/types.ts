export type TodoTask = {
  id: string;
  title: string;
  completed: boolean;
  addedAt: Date;
  deadline: Date;
};
export type ToggleProps = (id: string) => void;
export type DeleteProps = (id: string) => void;
export type EditProps = (id: string, title: string, deadline: Date) => void;
export type FilterProps = (startDate: Date, endDate: Date) => void;
