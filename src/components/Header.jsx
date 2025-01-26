import React, { useEffect, useState } from "react";
import { useTodos } from "../context/todos";

function Header() {
  const [isDark, setIsDark] = useState(() => {
    if (localStorage.getItem("theme") === "light") {
      return false;
    } else {
      return true;
    }
  });
  const [time, setTime] = useState(new Date());
  const [timeRemaining, setTimeRemaining] = useState("0");
  const [timePerTodo, setTimePerTodo] = useState("0");
  const { todos } = useTodos();
  const todosLength = todos?.length || 0;
  useEffect(() => {
    const devidePerTodo = todosLength;
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);

      const remainingTimeInMiliseconds = endOfDay - now;
      setTimeRemaining(millisecondsToTime(remainingTimeInMiliseconds, 1));
      setTimePerTodo(
        millisecondsToTime(remainingTimeInMiliseconds, devidePerTodo)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [todosLength]);

  function toggleTheme() {
    setIsDark((value) => !value);
  }

  function millisecondsToTime(milliseconds, devidePerTodo) {
    if (devidePerTodo === 0) {
      return "No Todo Item";
    } else {
      const millisecondsPerTodo = Math.floor(milliseconds / devidePerTodo);
      const hours = Math.floor(millisecondsPerTodo / (1000 * 60 * 60));
      const minutes = Math.floor(
        (millisecondsPerTodo % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((millisecondsPerTodo % (1000 * 60)) / 1000);

      return `${hours < 10 ? `0${hours}` : hours}h : ${
        minutes < 10 ? `0${minutes}` : minutes
      }m ${seconds < 10 ? `0${seconds}` : `${seconds}`}s`;
    }
  }

  const body = document.querySelector("body");

  useEffect(() => {
    if (isDark) {
      body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return (
    <header>
      <div className="top-bar">
        <div className="container">
          <div className="toggle-theme">
            Turn On{" "}
            <button onClick={() => toggleTheme()}>
              <b>{isDark ? "Light" : "Dark"}</b> &nbsp;Theme
            </button>
          </div>
          <div className="countdown">
            <h4>
              {timeRemaining} &nbsp;
              <b>Remaining</b>
            </h4>
            <div className="info-short">
              <h3>Countdown</h3>
              <li>
                Time remaining to <b>End Today</b>.
              </li>
              <li>
                This counter renews at <b>12:00AM</b> daily
              </li>

              <table>
                <thead>
                  <tr>
                    <th>Todos</th>
                    <th>Time Per Todo</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>{todos.length}</td>
                    <td>{timePerTodo}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="app-title">Today Todo</h2>
      </div>
    </header>
  );
}

export default Header;
