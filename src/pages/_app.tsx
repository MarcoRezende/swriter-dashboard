import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { MainSideBar } from "../components/common/SideBar";
import theme from "../config/theme";
import AppProvider from "../hooks";
import { routes } from "../router";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppProvider>
        <MainSideBar routes={routes}>
          <Component {...pageProps} />
        </MainSideBar>
      </AppProvider>
    </ChakraProvider>
  );
}
export default MyApp;
