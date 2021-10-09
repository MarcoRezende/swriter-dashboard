import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import MainSideBar from "../components/common/SideBar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MainSideBar>
        <Component {...pageProps} />
      </MainSideBar>
    </ChakraProvider>
  );
}
export default MyApp;
