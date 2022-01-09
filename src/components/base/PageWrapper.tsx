import { Box } from '@chakra-ui/react';
import Head from 'next/head';

interface PageProps {
  tabTitle: string;
}

export const PageWrapper: React.FC<PageProps> = ({ tabTitle, children }) => (
  <>
    <Head>
      <title>{tabTitle}</title>
    </Head>
    <Box p={'2rem'} h="100%">
      {children}
    </Box>
  </>
);
