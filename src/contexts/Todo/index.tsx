import React, { useContext, createContext, useState, useEffect } from "react";

import { v4 as uuidV4 } from "uuid";

import { ITodo, ITodoList, OnError, OnSuccess, Context } from "./interfaces";

import LocalStorage from "../../services/localStorage";

const INITIAL_CONTEXT: Context = {} as Context;

const TodoContext = createContext(INITIAL_CONTEXT);

const TodoProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Array<ITodoList>>([]);

  const [storage, setStorage] = useState<LocalStorage>(new LocalStorage());

  useEffect(() => {
    const newStorage = new LocalStorage();

    setTodos(newStorage.getData);

    setStorage(newStorage);
  }, []);

  function addTodo(
    todo: ITodo,
    onError?: OnError | null,
    onSuccess?: OnSuccess | null
  ): boolean {
    if (!todo.description.trim()) {
      onError?.({
        message: "Você deve adicionar uma descrição",
      });
      return false;
    }

    const _newList = [
      ...todos,
      {
        description: todo.description,
        id: String(uuidV4()),
      },
    ];

    setTodos(_newList);

    storage.save(_newList);

    setTimeout(() => {
      onSuccess?.();
    }, 500);

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

    if (!newTodo.description.trim()) {
      onError?.({
        message: "Você deve adicionar uma descrição",
      });
      return false;
    }

    const _newList = todos.map((td) => (td.id !== todo.id ? td : newTodo));

    setTodos(_newList);

    storage.save(_newList);

    setTimeout(() => {
      onSuccess?.();
    }, 500);

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

    const _newList = todos.filter((td) => td.id !== id);

    setTodos(_newList);

    storage.save(_newList);

    setTimeout(() => {
      onSuccess?.();
    }, 500);

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
