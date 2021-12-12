import NextLink from "next/link";
import { useRouter } from "next/router";

import { Button } from "@chakra-ui/button";
import { Divider, Flex, Heading, Link } from "@chakra-ui/layout";
import {
  Table as ChakraTable,
  TableProps as ChakraTableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";
import { ModalFile } from "../form/ModalFile";
import { uploadFile } from "../../services/common";

interface TableProps extends ChakraTableProps {
  title: string;
  columns: string[];
  columnsContent: Array<{
    id: string;
    values: string[];
  }>;
  uploadEndpoint?: string;
}

export const Table: React.FC<TableProps> = ({
  title,
  columns,
  columnsContent,
  uploadEndpoint,
  ...rest
}) => {
  const hasContent: boolean = !!columnsContent.length;
  const router = useRouter();
  const path = router.pathname;
  const resource = path !== "/" ? path.replace(/\//g, "") : path;

  const MAX_TEXT_LENGTH = 120;

  const handleClick = (e: any, id: string) => {
    e.preventDefault();
    router.push(`${path}/edit/${id}`);
  };

  const uploadCsv = async (file: File) => {
    if (!uploadEndpoint) {
      console.error("No endpoint provided for upload");
      return;
    }

    await uploadFile({ resource: uploadEndpoint, file });
  };

  return (
    <>
      <Flex justifyContent="flex-end" alignItems="center" mb="1rem">
        <Button
          borderColor="blue.800"
          px="4rem"
          d="block"
          mr="1rem"
          variant="outline"
          _hover={{
            bg: "blue.800",
            color: "white",
          }}
        >
          <Link w="100%" as={NextLink} href={`/${resource}/create/`}>
            Criar
          </Link>
        </Button>
        {/* @TODO create modal to upload files when clicked */}
        <ModalFile
          validFormats=".csv"
          title="Importar CSV"
          onUpload={uploadCsv}
        >
          Importar CSV
        </ModalFile>
      </Flex>
      <Heading mb="0.5rem">{title}.</Heading>
      <Divider mb="2rem" />
      <ChakraTable {...rest} variant="striped">
        <Thead>
          <Tr>
            <Th fontFamily="Poppins" fontSize="1rem" textTransform="capitalize">
              Número
            </Th>
            {columns.map((column) => (
              <Th
                fontFamily="Poppins"
                fontSize="1rem"
                textTransform="capitalize"
                key={"tr-" + column}
              >
                {column}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {hasContent ? (
            columnsContent.map((content, index) => (
              <Tr
                onClick={(e) => handleClick(e, content.id)}
                key={"row-" + content.id}
                transition="transform 0.3s, filter 0.3s"
                _hover={{
                  cursor: "pointer",
                  transform: "translateY(-5px)",
                  filter: "brightness(1.2)",
                }}
              >
                <Td borderBottom="0" py="1.5rem">
                  {index + 1}
                </Td>
                {content.values.map((value, contentIndex) => (
                  <Td
                    borderBottom="0"
                    py="1.5rem"
                    key={`td-${content.id}-${index + contentIndex}`}
                  >
                    {value.length > MAX_TEXT_LENGTH
                      ? `${value.substring(0, MAX_TEXT_LENGTH)}...`
                      : value}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td
                py="1.5rem"
                px="2rem"
                colSpan={columns.length + 1}
                w="100%"
                textAlign="center"
              >
                Sem conteúdo
              </Td>
            </Tr>
          )}
        </Tbody>
      </ChakraTable>
    </>
  );
};
