import DateAndDay, { formattedDate } from "../DateAndDay/DateAndDay";
import TaskList, { TaskProps } from "../TaskList/TaskList";
import "./ToDo.css";
import Input from "../Input/Input";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function ToDo() {
  const [inputShow, setInputShow] = useState(false);
  const [valid, setValid] = useState(false);
  const [enteredTask, setEnteredTask] = useState("");
  const [touched, setTouched] = useState(false);
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

  const activeHandler = (id: string) => {
    const index = tasks.findIndex((task) => task.id === id);
    const updatedTasks = [...tasks];
    updatedTasks[index].complete = !updatedTasks[index].complete;
    setTasks(updatedTasks);
  };

  const clickHandler = () => {
    setInputShow((prev) => !prev);
  };

  const input = inputShow && (
    <Input
      checkValidity={checkValidity}
      enteredTask={enteredTask}
      valid={valid}
      touched={touched}
    />
  );

  const btn = !inputShow && (
    <button className="add-btn" onClick={clickHandler}>
      +
    </button>
  );

  function checkValidity(e: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(e.target.value);
  }

  const submitHandler = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      setTouched(true);
      if (enteredTask === "") {
        setValid(false);
      } else {
        setValid(true);
        const newtitle = enteredTask;
        const newComplete = false;
        const obj = {
          id: uuidv4(),
          title: newtitle,
          complete: newComplete,
        };
        setTasks([...tasks, obj]);
        localStorage.setItem("setdate", formattedDate.toString());
        setEnteredTask("");
      }
    },
    [enteredTask, tasks]
  );

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setInputShow(false);
      }
      if (event.key === "Enter") {
        submitHandler(event);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [submitHandler]);

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
