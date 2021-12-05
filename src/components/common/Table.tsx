import NextLink from "next/link";
import { useRouter } from "next/router";

import { Button } from "@chakra-ui/button";
import { Divider, Heading, Link } from "@chakra-ui/layout";
import {
  Table as ChakraTable,
  TableProps as ChakraTableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/table";

interface TableProps extends ChakraTableProps {
  title: string;
  columns: string[];
  columnsContent: Array<{
    id: string;
    values: string[];
  }>;
}

export const Table: React.FC<TableProps> = ({
  title,
  columns,
  columnsContent,
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

  return (
    <>
      <Button
        borderColor="blue.800"
        px="4rem"
        mb="1rem"
        d="block"
        ml="auto"
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
