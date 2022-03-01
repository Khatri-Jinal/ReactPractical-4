import { ChangeEvent } from "react";
import "./Input.css";

interface InputProps {
  valid: boolean;
  touched: boolean;
  enteredTask: string;
  checkValidity: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ valid, touched, enteredTask, checkValidity }: InputProps) {
  const error = !valid && touched && (
    <div className="error">
      <p>Enter Something</p>
    </div>
  );

  return (
    <>
      <form>
        <div className="input-block">
          <input
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
