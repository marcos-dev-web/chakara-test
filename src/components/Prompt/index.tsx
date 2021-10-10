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
    <Modal isOpen={Boolean(todo)} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar TODO</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>TODO: edição</FormLabel>
            <Input
              placeholder="TODO: edição"
              onChange={(e) => setNewText(e.target.value)}
              value={newText}
              noOfLines={4}
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
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Prompt;
