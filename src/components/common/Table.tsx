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
    id: string | number;
    values: string[];
  }>;
}

export const Table: React.FC<TableProps> = ({
  columns,
  columnsContent,
  ...rest
}) => {
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
        {columnsContent.map((content) => (
          <Tr key={"row" + content.id}>
            {content.values.map((value) => (
              <Td key={"td" + value}>{value}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  );
};
