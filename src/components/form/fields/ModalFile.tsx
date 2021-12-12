import { useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Button,
  Input,
  FormLabel,
  Flex,
  Text,
} from "@chakra-ui/react";

import { HiCloudUpload } from "react-icons/hi";

interface ModalFileProps {
  onUpload(file: File): Promise<void>;
  title?: string;
  validFormats?: string;
}

export const ModalFile: React.FC<ModalFileProps> = ({
  onUpload,
  children,
  title,
  validFormats,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prepareFile = (files: FileList | null) => {
    if (!files) return;

    if (!validFormats?.split(".").includes(files[0].type.split("/")[1])) {
      console.error("Invalid format");
      return;
    }

    setFile(files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      console.error("File required");
      return;
    }

    try {
      await onUpload(file);
      clearFile();
    } catch (err) {
      console.error(err);
    }
  };

  const clearFile = () => {
    setFile(null);
    (inputRef.current as HTMLInputElement).value = "";
  };

  return (
    <>
      <Button onClick={onOpen}>{children}</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClick={() => clearFile()}
        onEsc={() => clearFile()}
        closeOnEsc={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title ?? "Upload de arquivo"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="file"
              d="none"
              id="file"
              ref={inputRef}
              accept={validFormats ?? ""}
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
                <HiCloudUpload size="5rem" />
                <Text w="100%" isTruncated>
                  {file?.name ? file.name : "Buscar arquivo"}
                </Text>
              </Flex>
            </FormLabel>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                clearFile();
              }}
            >
              Fechar
            </Button>
            <Button
              variant="ghost"
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
