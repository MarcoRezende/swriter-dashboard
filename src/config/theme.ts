import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const fonts = {
  heading: "Poppins",
  body: "Poppins",
};

const theme = extendTheme({
  config,
  fonts,
});
export default theme;
