import React, { useEffect, useState, useRef } from "react";

import { MdDelete, MdMode } from "react-icons/md";

import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import { Progress } from "@chakra-ui/react";
import { Button, IconButton } from "@chakra-ui/button";

import Delete from "../components/Delete";
import Prompt from "../components/Prompt";

import showToast from "../utils/showToast";

import { useTodo } from "../contexts/Todo";

import LocalStorage from "../services/localStorage";

import {
  Container,
  Header,
  Title,
  Body,
  List,
  InputContianer,
  InputGroup,
  TodoList,
  TodoItem,
  TodoDescription,
  TodoText,
  TodoControl,
  LoaderContainer,
  Placeholder,
} from "./styles";
interface ITodo {
  description: string;
}

interface ITodoOnList extends ITodo {
  id: string;
}

interface IOpen {
  id?: string | null;
  open: boolean;
}

const App: React.FC = () => {
  const toast = useToast();

  const { todoList, addTodo, deleteTodo, updateTodo } = useTodo();

  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<IOpen>({
    open: false,
  });
  const [editing, setEditing] = useState<ITodoOnList | null>(null);
  const [titlePage, setTitlePage] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(titlePage || "");

  const storage: LocalStorage = useRef(new LocalStorage()).current;

  useEffect(() => {
    if (titlePage === null) {
      if (storage.getTitle.length > 0) {
        setTitlePage(storage.getTitle);
        setNewTitle(storage.getTitle);
        document.title = storage.getTitle;
      } else {
        setTitlePage("Chakara TODO");
        setNewTitle("Chakara TODO");
        document.title = "Chakara TODO";
      }
    }
  }, [titlePage, storage.getTitle]);

  function handleAddTodo(): boolean {
    setLoading(true);
    addTodo(
      {
        description: text,
      },
      (error) => {
        showToast(toast, {
          description: error.message,
          duration: 5000,
          status: "warning",
        });
        setLoading(false);
      },
      () => {
        showToast(toast, {
          description: "TODO adicionado com sucesso",
          duration: 1500,
          status: "success",
        });
        setLoading(false);
      }
    );

    setText("");

    return true;
  }

  function handleDeleteTodo(id: string) {
    setLoading(true);
    deleteTodo(
      id,
      (error) => {
        showToast(toast, {
          description: error.message,
          status: "warning",
        });
        setLoading(false);
      },
      () => {
        showToast(toast, {
          description: "TODO deletado",
        });
        setLoading(false);
      }
    );
  }

  function handleUpdateTodo(todo: ITodoOnList) {
    setLoading(true);
    updateTodo(
      todo,
      (error) => {
        showToast(toast, {
          description: error.message,
          status: "warning",
        });
        setLoading(false);
      },
      () => {
        showToast(toast, {
          description: "TODO atualizado com sucesso",
          status: "success",
        });
        setLoading(false);
      }
    );
  }

  function handleChangeTitle() {
    if (newTitle.length === 0) {
      showToast(toast, {
        description: "O título não pode estar vazio",
        duration: 2000,
        status: "warning",
      });
      return;
    }

    storage.updateTitle(newTitle);
    setTitlePage(newTitle);
    showToast(toast, {
      description: "Título alterado com sucesso",
      duration: 1500,
      status: "success",
    });
  }

  function handleClose() {
    setIsOpen({
      open: false,
      id: null,
    });
  }

  function handleAccept() {
    if (isOpen.id) {
      handleDeleteTodo(isOpen.id);
      setIsOpen({
        id: null,
        open: false,
      });
    } else {
      showToast(toast, {
        description: "Não foi possível deletar esse item da lista",
        duration: 5000,
        status: "error",
      });
    }
  }

  const renderTodo = (todo: ITodoOnList) => (
    <TodoItem key={todo.id}>
      <TodoText>
        <TodoDescription>{todo.description}</TodoDescription>
      </TodoText>
      <TodoControl>
        <IconButton
          colorScheme="red"
          aria-label="Delete todo"
          size="sm"
          icon={<MdDelete />}
          onClick={() => {
            setIsOpen({
              id: todo.id,
              open: true,
            });
          }}
        />
        <IconButton
          colorScheme="yellow"
          aria-label="Update Todo"
          size="sm"
          icon={<MdMode />}
          onClick={() => {
            setEditing({
              id: todo.id,
              description: todo.description,
            });
          }}
        />
      </TodoControl>
    </TodoItem>
  );

  return (
    <Container>
      <Header>
        {editingTitle ? (
          <Input
            isRequired
            autoFocus
            width="100%"
            maxWidth="200px"
            disabled={loading}
            placeholder="Título"
            color="#777777"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={() => {
              setNewTitle(titlePage || "");
              setEditingTitle(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChangeTitle();
                setEditingTitle(false);
              }
              if (e.key === "Escape") {
                setNewTitle(titlePage || "");
                setEditingTitle(false);
              }
            }}
          />
        ) : (
          <Title>
            {titlePage}
            <IconButton
              colorScheme="yellow"
              aria-label="Editar titulo"
              size="sm"
              marginLeft="1rem"
              icon={<MdMode />}
              onClick={() => {
                setEditingTitle(true);
              }}
            />
          </Title>
        )}
      </Header>
      <Body>
        <Delete onAccept={handleAccept} onClose={handleClose} isOpen={isOpen} />
        <Prompt
          onSave={(description, id) => {
            handleUpdateTodo({
              description,
              id,
            });
            setEditing(null);
          }}
          todo={editing}
          onClose={() => setEditing(null)}
        />
        <List>
          {loading && (
            <LoaderContainer>
              <Progress size="xs" isIndeterminate />
            </LoaderContainer>
          )}
          <TodoList empty={todoList.length === 0}>
            {todoList.length > 0 ? (
              todoList.map(renderTodo)
            ) : (
              <Placeholder>Sua lista está vazia</Placeholder>
            )}
          </TodoList>
          <InputContianer>
            <InputGroup>
              <Input
                isRequired
                autoFocus
                disabled={loading}
                placeholder="Todo"
                color="#777777"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTodo();
                  }
                }}
              />
              <Button
                h="2rem"
                borderColor="lightgray"
                onClick={handleAddTodo}
                disabled={loading}
                colorScheme="green"
              >
                Adicionar
              </Button>
            </InputGroup>
          </InputContianer>
        </List>
      </Body>
    </Container>
  );
};

export default App;
