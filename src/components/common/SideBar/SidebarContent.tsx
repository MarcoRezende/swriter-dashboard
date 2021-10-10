import { CloseButton } from "@chakra-ui/close-button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, BoxProps, Flex, Text } from "@chakra-ui/layout";

import { RouteProps } from "../../../router";
import { NavItem } from "./NavItem";

interface SidebarProps extends BoxProps {
  routes: RouteProps[];
  onClose: () => void;
}

export const SidebarContent: React.FC<SidebarProps> = ({
  routes,
  onClose,
  ...rest
}) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Swriter
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {routes.map((route) => (
        <NavItem key={route.name} icon={route.icon} to={route.to} mb={"2"}>
          {route.name}
        </NavItem>
      ))}
    </Box>
  );
};
