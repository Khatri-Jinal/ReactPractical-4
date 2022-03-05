import ListCheck from "../ListCheck/ListCheck";
import "./Task.css";

interface TasksProps {
  id: string;
  title: string;
  complete: boolean;
  activeHandler: (id: string) => void;
}

function Task({ id, title, complete, activeHandler }: TasksProps) {
  return (
    <li
      className={complete ? "task complete" : "task"}
      onClick={() => activeHandler(id)}
    >
      <span className="title">{title}</span>
      <span className="check-block">
        <ListCheck />
      </span>
    </li>
  );
}
export default Task;
