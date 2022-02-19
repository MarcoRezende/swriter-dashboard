import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '@chakra-ui/button';
import { Divider, Flex, Heading, Link } from '@chakra-ui/layout';
import { Spinner, Box } from '@chakra-ui/react';
import {
  Table as ChakraTable,
  TableProps as ChakraTableProps,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/table';

import { useEntity } from '../../hooks/entity';
import { CrudModel } from '../../models/crud.model';
import { ModalFile } from '../form/fields/ModalFile';
import { ConfirmationModal } from '../base/ConfirmationModal';
import AsyncComponenteWrapper from '../base/AsyncComponenteWrapper';
import Pagination from '../../components/pagination';
import { useState } from 'react';

interface TableProps extends ChakraTableProps {
  title: string;
  columns: string[];
  model: CrudModel<any>;
}

export const Table: React.FC<TableProps> = ({
  title,
  columns,
  model,
  ...rest
}) => {
  const { generateTableContent } = useEntity();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: tableColumns,
    isLoading,
    isFetching,
    error,
    refetch,
  } = generateTableContent(model, columns, currentPage);
  const hasContent: boolean = !!tableColumns?.tableBody.length;
  const router = useRouter();
  const path = router.pathname;
  const resource = path !== '/' ? path.replace(/\//g, '') : path;
  const registerTotalCounts = tableColumns?.total ?? 0;
  const registersPerPage = 50;
  const offsetStart =
    registerTotalCounts > 0 ? 1 + registersPerPage * (currentPage - 1) : 0;

  const MAX_TEXT_LENGTH = 120;

  const handleClick = (e: any, id: string) => {
    e.preventDefault();
    router.push(`${path}/edit/${id}`);
  };

  const uploadCsv = async (file: File) => {
    await model.importCsv(file);
    await refetch();
  };

  const deleteAll = async () => {
    await model.deleteAll();
    await refetch();
  };

  return (
    <AsyncComponenteWrapper isLoading={isLoading} error={error}>
      <Flex justifyContent="flex-end" alignItems="center" mb="1rem">
        <ConfirmationModal onEnsured={() => deleteAll()} title="Deletar tudo?">
          <Button
            borderColor="red.800"
            px="4rem"
            d="block"
            mr="1rem"
            variant="outline"
            _hover={{
              bg: 'red.800',
              color: 'white',
            }}
          >
            Deletar tudo
          </Button>
        </ConfirmationModal>
        <Button
          borderColor="blue.800"
          px="4rem"
          d="block"
          mr="1rem"
          variant="outline"
          _hover={{
            bg: 'blue.800',
            color: 'white',
          }}
        >
          <Link w="100%" as={NextLink} href={`/${resource}/create/`}>
            Criar
          </Link>
        </Button>
        <ModalFile
          validFormats=".csv"
          title="Importar CSV"
          onUpload={uploadCsv}
        >
          Importar CSV
        </ModalFile>
      </Flex>
      <Heading mb="0.5rem">
        {title}. {isFetching && <Spinner size="sm" ml="4" />}
      </Heading>
      <Divider mb="2rem" />
      <ChakraTable {...rest} variant="striped">
        <Thead>
          <Tr>
            <Th fontFamily="Poppins" fontSize="1rem" textTransform="capitalize">
              Número
            </Th>
            {tableColumns?.tableHeader.map((column) => (
              <Th
                fontFamily="Poppins"
                fontSize="1rem"
                textTransform="capitalize"
                key={'tr-' + column}
              >
                {column}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {hasContent ? (
            tableColumns?.tableBody.map((content, index) => (
              <Tr
                onClick={(e) => handleClick(e, content.entityId)}
                key={'row-' + content.entityId}
                transition="transform 0.3s, filter 0.3s"
                _hover={{
                  cursor: 'pointer',
                  transform: 'translateY(-5px)',
                  filter: 'brightness(1.2)',
                }}
              >
                <Td borderBottom="0" py="1.5rem">
                  {offsetStart + index}
                </Td>
                {content.values.map((value, contentIndex) => (
                  <Td
                    borderBottom="0"
                    py="1.5rem"
                    key={`td-${content.entityId}-${index + contentIndex}`}
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

      <Divider />

      <Box pb="8">
        <Pagination
          registerTotalCounts={registerTotalCounts}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          registersPerPage={registersPerPage}
        />
      </Box>
    </AsyncComponenteWrapper>
  );
};
