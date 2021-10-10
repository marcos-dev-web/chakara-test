interface IOnError {
  message: string;
}

type AddTodo = (
  todo: ITodo,
  onError?: OnError | null,
  onSuccess?: OnSuccess | null
) => boolean;

type DeleteTodo = (
  id: string,
  onError?: OnError | null,
  nnSuccess?: OnSuccess | null
) => boolean;

type UpdateTodo = (
  todo: ITodoList,
  onError?: OnError | null,
  nnSuccess?: OnSuccess | null
) => boolean;

export interface ITodo {
  description: string;
}

export interface ITodoList extends ITodo {
  id: string;
}

export type OnError = (params: IOnError) => void;

export type OnSuccess = () => void;

export interface Context {
  todoList: Array<ITodoList>;
  addTodo: AddTodo;
  deleteTodo: DeleteTodo;
  updateTodo: UpdateTodo;
}
