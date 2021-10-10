import React, { useContext, createContext, useState } from "react";

import { v4 as uuidV4 } from "uuid";

import { ITodo, ITodoList, OnError, OnSuccess, Context } from "./interfaces";

const INITIAL_CONTEXT: Context = {
  todoList: [],
  addTodo: (todo: ITodo) => true,
  deleteTodo: (id: string) => true,
  updateTodo: (todo: ITodo) => true,
};

const TodoContext = createContext(INITIAL_CONTEXT);

const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Array<ITodoList>>([]);

  function addTodo(
    todo: ITodo,
    onError?: OnError | null,
    onSuccess?: OnSuccess | null
  ): boolean {
    if (!todo.description) {
      onError?.({
        message: "Você deve adicionar uma descrição",
      });
      return false;
    }

    setTodos((state) => [
      ...state,
      {
        description: todo.description,
        id: String(uuidV4()),
      },
    ]);

    setTimeout(() => {
      onSuccess?.();
    }, 1000);

    return true;
  }

  function updateTodo(
    newTodo: ITodoList,
    onError?: OnError | null,
    onSuccess?: OnSuccess | null
  ) {
    const todo = todos.find((td) => td.id === newTodo.id);

    if (!todo) {
      onError?.({
        message: "Este TODO não existe",
      });
      return false;
    }

    if (!newTodo.description) {
      onError?.({
        message: "Você deve adicionar uma descrição",
      });
      return false;
    }

    setTodos((state) => state.map((td) => (td.id !== todo.id ? td : newTodo)));

    setTimeout(() => {
      onSuccess?.();
    }, 1000);

    return true;
  }

  function deleteTodo(
    id: string,
    onError?: OnError | null,
    onSuccess?: OnSuccess | null
  ): boolean {
    const todo = todos.find((td) => td.id === id);

    if (!todo) {
      onError?.({
        message: "Este TODO não existe",
      });
      return false;
    }

    setTodos((state) => state.filter((td) => td.id !== id));

    setTimeout(() => {
      onSuccess?.();
    }, 1000);

    return true;
  }

  return (
    <TodoContext.Provider
      value={{ todoList: todos, addTodo, deleteTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export function useTodo() {
  return useContext(TodoContext);
}

export default TodoProvider;
