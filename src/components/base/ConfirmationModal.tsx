import { cloneElement, ReactElement } from 'react';

import {
  Alert,
  AlertIcon,
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

interface ConfirmationModalProps {
  actionText?: string;
  title?: string;
  children: ReactElement;
  onEnsured(): void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title = 'Tem certeza?',
  actionText = 'Prosseguir',
  onEnsured,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleEnsured = () => {
    onEnsured();
    onClose();
  };

  return (
    <>
      {cloneElement(children, { onClick: onOpen })}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="error" mb="5">
              <AlertIcon />
              <Text fontWeight="bold" mr="1">
                Cuidado!
              </Text>{' '}
              Ação irreversível
            </Alert>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="outline"
              colorScheme="blue"
              mr={3}
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              variant="solid"
              color="white"
              bg="red.700"
              _hover={{
                bg: 'red.800',
              }}
              onClick={() => handleEnsured()}
            >
              {actionText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
