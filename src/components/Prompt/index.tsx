import React, { useState, useEffect } from "react";
import { Button } from "@chakra-ui/button";
import { Modal } from "@chakra-ui/modal";
import {
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
} from "@chakra-ui/react";

interface IProps {
  todo: {
    description: string;
    id: string;
  } | null;
  onSave: (text: string, id: string) => void;
  onClose: () => void;
}

const Prompt: React.FC<IProps> = ({ onSave, todo, onClose }) => {
  const [newText, setNewText] = useState<string>("");

  useEffect(() => {
    if (todo) {
      setNewText(todo.description);
    }
  }, [todo]);

  return (
    <Modal isOpen={Boolean(todo)} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent width="95%" maxWidth="500px">
        <ModalHeader>Editar TODO</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel noOfLines={1}>{todo?.description}</FormLabel>
            <Input
              placeholder="Editar TODO"
              onChange={(e) => setNewText(e.target.value)}
              value={newText}
              noOfLines={4}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSave(newText, todo ? todo.id : "0");
                }
              }}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => onSave(newText, todo ? todo.id : "0")}
          >
            salvar
          </Button>
          <Button onClick={onClose} colorScheme="red">
            cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Prompt;
