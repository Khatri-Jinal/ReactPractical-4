import {
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import "./Input.css";
import { v4 as uuidv4 } from "uuid";
import { formattedDate } from "../DateAndDay/DateAndDay";
import { TaskProps } from "../TaskList/TaskList";

interface InputProps {
  setTasks: Dispatch<SetStateAction<TaskProps[]>>;
  toggleHandler: (arg: boolean) => void;
}

function Input({ setTasks, toggleHandler }: InputProps) {
  const [valid, setValid] = useState(false);
  const [enteredTask, setEnteredTask] = useState("");
  const [touched, setTouched] = useState(false);
  const error = !valid && touched && (
    <div className="error">
      <p>Enter Something</p>
    </div>
  );

  function checkValidity(e: ChangeEvent<HTMLInputElement>) {
    setEnteredTask(e.target.value);
  }

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
      setTasks((tasks) => [...tasks, obj]);
      localStorage.setItem("setdate", formattedDate.toString());
      setEnteredTask("");
    }
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        toggleHandler(false);
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, [enteredTask, setTasks, toggleHandler]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="input-block">
          <input
            autoFocus
            className="task-input"
            type="text"
            value={enteredTask}
            onChange={checkValidity}
          />
        </div>
        {error}
      </form>
    </>
  );
}
export default Input;
