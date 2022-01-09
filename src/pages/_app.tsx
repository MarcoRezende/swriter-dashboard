import type { AppProps } from 'next/app';

import { MainSideBar } from '../components/common/SideBar';
import theme from '../config/theme';
import { routes } from '../router';

import { ChakraProvider } from '@chakra-ui/react';
import { AppProvider } from '../hooks';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <AppProvider>
        <ChakraProvider theme={theme}>
          <MainSideBar routes={routes}>
            <Component {...pageProps} />
          </MainSideBar>
        </ChakraProvider>
      </AppProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
export default MyApp;
