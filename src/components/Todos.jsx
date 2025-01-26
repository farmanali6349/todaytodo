import React from "react";
import { Todo } from "./index";
import { useTodos } from "../context/todos";
function Todos() {
  const { todos } = useTodos();

  if (todos.length < 1) {
    return <p className="no-task">Todo List Is Empty, Create One</p>;
  }
  return (
    <main className="todos container">
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              {todo.isFrog && (
                <h3 className="frog-title">
                  <i>Eat The Frog First</i>
                </h3>
              )}
              <Todo
                className={todo.isFrog ? "frog" : ""}
                id={todo.id}
                text={todo.text}
                isCompleted={todo.isCompleted}
              />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default Todos;
