import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import * as React from "react";

export const DeleteModal = ({ title, deleteEvent }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();

  return (
    <>
      <Button
        backgroundColor={"red.400"}
        _hover={{
          background: "red.500",
          color: "white",
        }}
        onClick={onOpen}>
        <DeleteIcon />
        &nbsp; Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to delet {title}?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deleteEvent} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
