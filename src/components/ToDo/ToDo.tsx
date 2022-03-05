import "./ToDo.css";
import Input from "../Input/Input";
import { useEffect, useState, useRef } from "react";
import DateAndDay, { formattedDate } from "../DateAndDay/DateAndDay";
import TaskList, { TaskProps } from "../TaskList/TaskList";

function ToDo() {
  const [inputShow, setInputShow] = useState(false);
  const [tasks, setTasks] = useState<TaskProps[]>(() => {
    let list = localStorage.getItem("tasks");
    let newdate = String(formattedDate);
    const setdate = localStorage.getItem("setdate");
    if (newdate !== setdate) {
      localStorage.removeItem("tasks");
    }
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  });

  const clickHandler = () => {
    setInputShow((prev) => !prev);
  };

  const toggleHandler = (show: boolean) => {
    setInputShow(show);
  };

  const input = inputShow && (
    <Input setTasks={setTasks} toggleHandler={toggleHandler} />
  );

  const btn = !inputShow && (
    <button className="add-btn" onClick={clickHandler}>
      +
    </button>
  );

  const activeHandler = (id: string) => {
    const updatedTasks = tasks.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          complete: !todo.complete,
        };
      }
      return todo;
    });
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="to-do">
      <DateAndDay />
      <TaskList tasks={tasks} activeHandler={activeHandler} />
      {input}
      {btn}
    </div>
  );
}
export default ToDo;
