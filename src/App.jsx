import { useState } from "react";
import "./App.css";
import { CreateTodo, Header, Todos } from "./components";
import TodosProvider from "./context/todos";
import useLocalStorage from "./components/useLocalStorage";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  function addTodo(todo) {
    setTodos((todos) => {
      if (todo.isFrog) {
        return [todo, ...todos];
      } else {
        return [...todos, todo];
      }
    });
  }
  function updateTodo(text, id) {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (id === todo.id) {
          return { ...todo, text };
        } else {
          return todo;
        }
      });
    });
  }

  function toggleIsComplete(id) {
    setTodos((todos) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      });
    });
  }

  function removeTodo(id) {
    setTodos((todos) => todos.filter((todo) => id !== todo.id));
  }

  return (
    <div className="today-todo">
      <p className="attribution">
        Created with ❤️ by
        <a href="https://www.linkedin.com/in/farmanali6349/" target="_blank">
          Farman Ali
        </a>
      </p>
      <TodosProvider
        value={{
          todos,
          addTodo,
          removeTodo,
          updateTodo,
          toggleIsComplete,
        }}
      >
        <Header />
        <CreateTodo addTodo={addTodo} />
        <Todos todos={todos} />
      </TodosProvider>
    </div>
  );
}

export default App;
