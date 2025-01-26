import { createContext, useContext } from "react";

const todosContext = createContext({
  id: "todo1",
  text: "This is test todo",
  isFrog: false,
  isCompleted: false,
  dateCreated: new Date(),
});

export const useTodos = () => {
  return useContext(todosContext);
};

const TodosProvider = todosContext.Provider;

export default TodosProvider;
