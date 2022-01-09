import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';

interface AlertProps {
  title?: string;
  description?: string;
}

export const ErrorAlert: React.FC<AlertProps> = ({
  title = 'Ops!',
  description = 'Algo errado não está certo',
}) => {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
      maxW="400px"
      borderRadius="20"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {title}
      </AlertTitle>
      <AlertDescription maxWidth="sm">{description}</AlertDescription>
    </Alert>
  );
};
