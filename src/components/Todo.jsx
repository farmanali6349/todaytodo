import React, { useState } from "react";
import { useTodos } from "../context/todos";
import { icons } from "../assets";

function Todo({ id, text, isCompleted, className }) {
  const [inputText, setInputText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const { removeTodo, toggleIsComplete, updateTodo } = useTodos();
  function _updateTodo(id) {
    updateTodo(inputText, id);
    setIsEditing(false);
  }

  return (
    <div className={`todo ${className}`}>
      <div className="checkbox-wrapper-19">
        <input
          type="checkbox"
          className={`cbtest-19`}
          id={id}
          checked={isCompleted}
          onChange={() => toggleIsComplete(id)}
        />
        <label for={id} className="check-box" />
      </div>

      {/* <input
        type="checkbox"
        value={isCompleted}
        onChange={() => toggleIsComplete(id)}
      /> */}

      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={!isEditing}
        className={isCompleted ? "completed" : ""}
      />

      <div className="buttons">
        <button onClick={() => removeTodo(id)} className="del">
          <svg
            width="25px"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="white"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
        {!isEditing ? (
          <button onClick={() => setIsEditing((prev) => !prev)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        ) : (
          <button onClick={() => _updateTodo(id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default Todo;
