import React, { useState } from "react";
import { images } from "../assets/index";
import { useTodos } from "../context/todos";
function CreateTodo({ addTodo }) {
  const { todos } = useTodos();
  const [inputText, setInputText] = useState("");
  const [isFrog, setIsFrog] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const frogContent = `"Eat the Frog" is a productivity strategy based on the idea
                  that you should tackle your most challenging and important
                  task first, the one you’re most likely to procrastinate on.
                  It’s like eating a frog first thing in the morning – once you
                  do it, everything else feels easier!`;

  const isFrogAvailable = checkFrog(todos);

  function checkFrog(todos) {
    let isFrogAvailable = false;

    for (const todo of todos) {
      if (todo.isFrog) {
        isFrogAvailable = true;
        break;
      }
    }
    return isFrogAvailable;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (inputText) {
      const todo = {
        id: getId(),
        text: inputText,
        isFrog,
        isCompleted: false,
        createAt: new Date(),
      };
      addTodo(todo);
      setIsFrog(false);
      setInputText("");
    } else {
      console.log("Input field is empty.");
    }
  }
  function getId() {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.floor(Math.random() * 1e6); // Random number between 0 and 999999
    return `id-${timestamp}-${randomNum}`;
  }

  return (
    <form onSubmit={handleSubmit} className="create-todo container">
      <input
        type="text"
        placeholder="Enter your task"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="buttons">
        <div className="frog-input">
          <input
            type="checkbox"
            id="frog"
            checked={isFrog}
            onChange={() => setIsFrog((prev) => !prev)}
            disabled={isFrogAvailable}
          />
          <label htmlFor="frog">
            Frog <span className="frog-info">?</span>
            <div className="info-large">
              <img src={images.brianTracy} alt="Biran Tracy" />
              <h3>
                <i>"Eat the frog first"</i>
                <br />
                <span className="author">Brian Tracy</span>
              </h3>

              <p>
                <i>
                  {showContent ? frogContent : frogContent.slice(0, 95) + "..."}{" "}
                  <span
                    className="show-hide-content"
                    onClick={() => setShowContent((prev) => !prev)}
                  >
                    {showContent ? "hide" : "show"}
                  </span>
                  <br />
                  <b>
                    If selected, We will bubble up your todo task at the top of
                    the list.
                  </b>
                </i>
              </p>
            </div>
          </label>
        </div>
        <input type="submit" className="button primary" value="CREATE" />
      </div>
    </form>
  );
}

export default CreateTodo;
