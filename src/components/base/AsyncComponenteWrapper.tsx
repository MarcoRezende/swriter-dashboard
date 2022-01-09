import { Flex, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ErrorAlert } from './ErrorAlert';

interface AsyncComponenteWrapperProps {
  isLoading?: boolean;
  error?: unknown;
}

const AsyncComponenteWrapper: React.FC<AsyncComponenteWrapperProps> = ({
  children,
  error,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <Flex justifyContent="center" alignItems="center" h="100%">
          <Spinner />
        </Flex>
      ) : error ? (
        <Flex justifyContent="center" alignItems="center" h="100%">
          <ErrorAlert />
        </Flex>
      ) : (
        children
      )}
    </>
  );
};

export default AsyncComponenteWrapper;
