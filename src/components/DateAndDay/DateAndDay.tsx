import { Component } from "react";
import "./DateAndDay.css";

const today = new Date();
const month = today.toLocaleString("en-us", { month: "short" });
const day = today.toLocaleString("en-us", { weekday: "long" });
const year = today.getFullYear();
const date = today.getDate();
export const formattedDate = today.toLocaleDateString();

class DateAndDay extends Component {
  render() {
    return (
      <div className="date-and-day">
        <div className="date-container">
          <div className="left">
            <p className="date">{date}</p>
          </div>
          <div className="right">
            <p className="month">{month}</p>
            <p className="year">{year}</p>
          </div>
        </div>
        <div className="day-container">
          <p className="day">{day}</p>
        </div>
      </div>
    );
  }
}
export default DateAndDay;
