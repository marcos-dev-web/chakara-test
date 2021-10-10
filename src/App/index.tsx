import React, { useState } from "react";

import { v4 as uuidV4 } from "uuid";

import { useToast } from "@chakra-ui/toast";
import { Button, IconButton } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";

import { MdDelete } from "react-icons/md";

import Delete from "../components/Delete";

import {
  Container,
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
} from "./styles";
import { Progress } from "@chakra-ui/react";

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

  const [todos, setTodos] = useState<Array<ITodoOnList>>([]);
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [isOpen, setIsOpen] = useState<IOpen>({
    open: false,
  });

  function addTodo(): boolean {
    if (!text) {
      toast({
        description: "Você deve adicionar uma descrição",
        duration: 5000,
        status: "warning",
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });

      setText("");

      return false;
    }

    setTodos((state) => [
      ...state,
      {
        description: text,
        id: String(uuidV4()),
      },
    ]);

    setText("");

    toast({
      description: "TODO adicionado com sucesso",
      duration: 3000,
      status: "success",
      isClosable: true,
      position: "top",
      variant: "solid",
    });

    return true;
  }

  function deleteTodo(id: string) {
    setLoading(true);
    setTimeout(() => {
      setTodos((state) => state.filter((todo) => todo.id !== id));

      toast({
        description: "TODO deletado",
        duration: 2000,
        status: "info",
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
      setLoading(false);
    }, 2000);
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
      </TodoControl>
    </TodoItem>
  );

  function handleClose() {
    setIsOpen({
      open: false,
      id: null,
    });
  }

  function handleAccept() {
    if (isOpen.id) {
      deleteTodo(isOpen.id);
      setIsOpen({
        id: null,
        open: false,
      });
    } else {
      toast({
        description: "Não foi possível deletar esse item da lista",
        duration: 5000,
        status: "error",
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
    }
  }

  return (
    <Container>
      <Title>Chakara Todo</Title>
      <Body>
        <Delete onAccept={handleAccept} onClose={handleClose} isOpen={isOpen} />
        <List>
          {loading && (
            <LoaderContainer>
              <Progress size="xs" isIndeterminate />
            </LoaderContainer>
          )}
          <TodoList>{todos.map(renderTodo)}</TodoList>
          <InputContianer>
            <InputGroup>
              <Input
                disabled={loading}
                placeholder="Todo"
                color="#777777"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTodo();
                  }
                }}
              />
              <Button
                h="2rem"
                borderColor="lightgray"
                onClick={addTodo}
                disabled={loading}
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
