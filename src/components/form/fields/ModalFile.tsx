import { useRef, useState } from 'react';
import { GiMagnifyingGlass } from 'react-icons/gi';
import { HiCloudUpload } from 'react-icons/hi';

import { useDisclosure } from '@chakra-ui/hooks';
import {
  Button,
  Flex,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

interface ModalFileProps {
  onUpload(file: File): Promise<void>;
  title?: string;
  validFormats?: string;
}

export const ModalFile: React.FC<ModalFileProps> = ({
  onUpload,
  children,
  title = 'Upload de arquivo',
  validFormats,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prepareFile = (files: FileList | null) => {
    if (!files?.length) {
      setFile(null);
      return;
    }

    if (!validFormats?.split('.').includes(files[0]?.type.split('/')[1])) {
      console.error('Invalid format');
      return;
    }

    setFile(files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      console.error('File required');
      return;
    }

    try {
      await onUpload(file);
      clearFile();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const clearFile = () => {
    setFile(null);
    (inputRef.current as HTMLInputElement).value = '';
  };

  return (
    <>
      <Button onClick={onOpen}>{children}</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClick={() => clearFile()}
        onEsc={() => clearFile()}
        closeOnEsc
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="file"
              d="none"
              id="file"
              ref={inputRef}
              accept={validFormats ?? ''}
              onChange={({ target: { files } }) => prepareFile(files)}
            />
            <FormLabel
              htmlFor="file"
              d="flex"
              justifyContent="center"
              borderColor="dark.800"
              borderWidth="5px"
              borderStyle="dashed"
              alignItems="center"
              h="10rem"
              borderRadius="10px"
            >
              <Flex
                flexDirection="column"
                alignItems="center"
                maxW="calc(100% - 2rem)"
              >
                {file ? (
                  <Icon as={HiCloudUpload} h={20} w={20} />
                ) : (
                  <Icon as={GiMagnifyingGlass} h={20} w={20} />
                )}
                <Text w="100%" isTruncated>
                  {file?.name ? file.name : 'Buscar arquivo'}
                </Text>
              </Flex>
            </FormLabel>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="outline"
              mr={3}
              onClick={() => {
                onClose();
                clearFile();
              }}
            >
              Fechar
            </Button>
            <Button
              colorScheme="blue"
              disabled={!file?.name}
              onClick={() => uploadFile()}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
