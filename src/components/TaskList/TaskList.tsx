import Task from "../Task/Task";
import "./TaskList.css";

export interface TaskProps {
  id: string;
  title: string;
  complete: boolean;
}

interface TaskListProps {
  tasks: TaskProps[];
  activeHandler: (id: string) => void;
}

function TaskList({ tasks, activeHandler }: TaskListProps) {
  return (
    <ul className="task-list">
      {tasks.map((task) => {
        return <Task key={task.id} {...task} activeHandler={activeHandler} />;
      })}
    </ul>
  );
}
export default TaskList;
