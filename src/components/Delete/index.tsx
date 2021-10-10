import React from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/modal";
import { Button } from "@chakra-ui/button";

interface IOpen {
  id?: string | null;
  open: boolean;
}

interface IProps {
  onClose: () => void;
  onAccept: () => void;
  isOpen: IOpen;
}

const Delete: React.FC<IProps> = ({ onAccept, onClose, isOpen }) => {
  return (
    <AlertDialog
      isOpen={isOpen.open}
      onClose={onClose}
      leastDestructiveRef={undefined}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deletar Todo
          </AlertDialogHeader>

          <AlertDialogBody>
            Tem certeza que deseja apagar esse TODO?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={onClose}>Cancelar</Button>
            <Button colorScheme="red" onClick={onAccept} ml={3}>
              Deletar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default Delete;
