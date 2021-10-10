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
  columns: string[];
  columnsContent: Array<{
    id: string;
    values: string[];
  }>;
}

export const Table: React.FC<TableProps> = ({
  columns,
  columnsContent,
  ...rest
}) => {
  const hasContent: boolean = !!columnsContent.length;

  return (
    <ChakraTable {...rest} variant="striped">
      <Thead>
        <Tr>
          {columns.map((column) => (
            <Th key={"tr-" + column}>{column}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {hasContent ? (
          columnsContent.map((content) => (
            <Tr key={"row" + content.id}>
              {content.values.map((value) => (
                <Td key={"td" + value} py="1rem" px="2rem">
                  {value}
                </Td>
              ))}
            </Tr>
          ))
        ) : (
          <Tr>
            <Td
              py="1rem"
              px="2rem"
              colSpan={columns.length}
              w="100%"
              textAlign="center"
            >
              Sem conteúdo
            </Td>
          </Tr>
        )}
      </Tbody>
    </ChakraTable>
  );
};
