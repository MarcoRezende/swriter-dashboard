import { Box, HStack, Stack, Text } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

interface PaginationProps {
  registerTotalCounts: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange(page: number): void;
}

const siblingsCount = 1;

/*
Generate an array of numbers from `from` to `to`.

Args:
  from: The first page to generate.
  to: The last page to generate.
Returns:
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
*/
function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

export default function Pagination({
  registerTotalCounts,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange,
}: PaginationProps) {
  const lastPage = Math.ceil(registerTotalCounts / registersPerPage);
  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(currentPage, currentPage + siblingsCount)
      : [];

  const offsetStart =
    registerTotalCounts > 0 ? 1 + registersPerPage * (currentPage - 1) : 0;

  const offsetEnd =
    currentPage * registersPerPage > registerTotalCounts
      ? registerTotalCounts
      : currentPage * registersPerPage;

  return (
    <Stack
      direction={['column', 'row']}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{offsetStart}</strong> - <strong>{offsetEnd}</strong> de{' '}
        <strong>{registerTotalCounts}</strong>
      </Box>
      <HStack spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages &&
          previousPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              number={page}
              key={page}
            />
          ))}

        <PaginationItem
          onPageChange={onPageChange}
          isCurrent
          number={currentPage}
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              number={page}
              key={page}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </HStack>
    </Stack>
  );
}
